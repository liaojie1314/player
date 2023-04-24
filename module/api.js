const express = require('express');
const db = require("./database/orm");
const Token = require('./token');
const bcrypt = require('bcryptjs');
const router = express.Router();
require("dotenv").config();

//登录
router.get('/login', (req, res) => {
  res.json({message: '登录界面'});
});
router.post('/login', async (req, res) => {
  // 获取参数
  const { username, password, token } = req.body;
  // 如果有token，则尝试解密
  if (token) {
    try {
      const decoded = Token.decode(token);
      if (decoded.username === username) {
        // 如果解密成功，且用户名与请求一致，则返回登录成功,并找到user_id返回给前端
        db.model('user').sql(`SELECT id FROM user WHERE name='${username}'`, async (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send('login Server Error');
            return;
          }
          const user_id = results[0].id;
          res.json({ code: 0, message: '登录成功', user_id:user_id });
        });
        return;
      }
    } catch (err) {
      res.send("解密失败")
      // 如果解密失败，或用户名不一致，则忽略token，进行下一步验证
    }
  }
  // 验证用户名和密码
  db.model('user').sql(`SELECT id, password FROM user WHERE name='${username}'`, async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.json({ code: -1, message: '用户名或密码错误' });
      return;
    }
    const user_id = results[0].id;
    const hashedPassword = results[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      const payload = { username };
      const newToken = Token.encode(payload);
      res.json({ code: 0, message: '登录成功', user_id:user_id, token: newToken });
    } else {
      res.json({ code: -1, message: '用户名或密码错误' });
    }
  });
});

//注册
router.get('/signin', (req, res) => {
  res.json({message: '注册界面'});
});
router.post('/signin', async (req, res) => {
  //获取参数
  const { username, password} = req.body;
  //加密密码
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const payload = { username };
  const token = Token.encode(payload);
  db.model('user').sql(`INSERT INTO user (name, password) VALUES ('${username}', '${hashedPassword}')`, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ code: 0, message: '注册成功', token: token });
  });
});

//测试数据库连接
router.get('/test', (req, res) => {
  db.model('user').sql(`select count(*) as count from user`, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to execute SQL query' });
    } else {
      res.json({ result: results[0].count, message: 'Database connection successful' });
    }
  });
});

//搜索
router.post('/search', (req, res) => {
  // 获取搜索内容、用户ID、页码和每页大小
  const { msg, user_id, pagenum, pagesize } = req.body;

  // 计算查询的起始索引
  const startIndex = (pagenum - 1) * pagesize;

  // 在数据库表video中进行模糊查找，并限制返回结果的数量和起始索引
  const searchQuery = `
    SELECT a.id, a.name, a.cover, a.type, b.name as tag, a.description 
    FROM video as a, video_tag as b 
    WHERE a.name LIKE '%${msg}%' AND a.id = b.video_id 
    LIMIT ${startIndex}, ${pagesize}`;

  // 查询每一种类别的数量
  const typeQuery = `
    SELECT COUNT(*) as count, type 
    FROM video 
    WHERE name LIKE '%${msg}%' 
    GROUP BY type
    ORDER BY type`;

  db.model('video').sql(searchQuery, (err, search_results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // 查询每一种类别的数量
    db.model('video').sql(typeQuery, (err, type_result) => {
      if (err) {
        console.error(err);
        res.status(500).send('typeQuery Server Error');
        return;
      }

      if (!search_results || search_results.length === 0) {
        // 构造类型计数对象
        const responseData = {
          animeCount: 0,
          tvCount: 0,
          varietyCount: 0,
          movieCount:0,
          results: []
        };
        res.status(200).json({ code: 0, message: '未搜索到任何数据', data: responseData });
        return;
      }

      else if (user_id === 0 || user_id === "0") {
        // 构造类型计数对象
        const typeCounts = {
          animeCount: 0,
          tvCount: 0,
          varietyCount: 0,
          movieCount: 0
        };

        // 遍历查询结果，将类型计数累加
        for (const type of type_result) {
          switch (type.type) {
            case '动漫':
              typeCounts.animeCount = type.count;
              break;
            case '电视剧':
              typeCounts.tvCount = type.count;
              break;
            case '综艺':
              typeCounts.varietyCount = type.count;
              break;
            case '电影':
              typeCounts.movieCount = type.count;
              break;
            default:
              break;
          }
        }

        // 将类型计数对象添加到返回数据中
        const responseData = {
          animeCount: typeCounts.animeCount,
          tvCount: typeCounts.tvCount,
          varietyCount: typeCounts.varietyCount,
          movieCount:typeCounts.movieCount,
          results: search_results
        };
        res.status(200).json({ code: 0, message: 'user_id = 0', data: responseData });
        return;
      }
      else{
        const searchQuery2 = `SELECT count(*) as total FROM search_history WHERE value = '${msg}' AND user_id = '${user_id}'`;
        db.model('search_history').sql(searchQuery2, (err, search_results2) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
          }

          if (search_results2[0].total) {
                        // 构造类型计数对象
                        const typeCounts = {
                          animeCount: 0,
                          tvCount: 0,
                          varietyCount: 0,
                          movieCount: 0
                        };
            
                        // 遍历查询结果，将类型计数累加
                        for (const type of type_result) {
                          switch (type.type) {
                            case '动漫':
                              typeCounts.animeCount = type.count;
                              break;
                            case '电视剧':
                              typeCounts.tvCount = type.count;
                              break;
                            case '综艺':
                              typeCounts.varietyCount = type.count;
                              break;
                            case '电影':
                              typeCounts.movieCount = type.count;
                              break;
                            default:
                              break;
                          }
                        }
                
                        // 将类型计数对象添加到返回数据中
                        const responseData = {
                          animeCount: typeCounts.animeCount,
                          tvCount: typeCounts.tvCount,
                          varietyCount: typeCounts.varietyCount,
                          movieCount:typeCounts.movieCount,
                          results: search_results
                        };
            res.status(200).json({ code: 0, message: '搜索成功，但不存入', data: responseData });
            return;
          } else {
            const insertQuery = `
              INSERT INTO search_history (value, user_id)
              VALUES ('${msg}', '${user_id}')`;

            db.model('search_history').sql(insertQuery, (err, insert_result) => {
              if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
              }

              // 构造类型计数对象
              const typeCounts = {
                animeCount: 0,
                tvCount: 0,
                varietyCount: 0,
                movieCount: 0
              };

              // 遍历查询结果，将类型计数累加
              for (const type of type_result) {
                switch (type.type) {
                  case '动漫':
                    typeCounts.animeCount = type.count;
                    break;
                  case '电视剧':
                    typeCounts.tvCount = type.count;
                    break;
                  case '综艺':
                    typeCounts.varietyCount = type.count;
                    break;
                  case '电影':
                    typeCounts.movieCount = type.count;
                    break;
                  default:
                    break;
                }
              }
              // 将类型计数对象添加到返回数据中
              const responseData = {
                animeCount: typeCounts.animeCount,
                tvCount: typeCounts.tvCount,
                varietyCount: typeCounts.varietyCount,
                movieCount:typeCounts.movieCount,
                results: search_results
              };
      
              res.status(200).json({ code: 0, message: '搜索成功，并存入搜索历史', data: responseData });
            });
          }
        });
      }
    });
  });
});    



//图片
router.get('/pictures',(req,res)=>{
  const sqlquery = `SELECT * FROM pictures ORDER BY RAND() LIMIT 8`;
  db.model('pictures').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200);
    res.json({ code: 0, message: '返回8张图片', pictures:results});
  });
})

//anime
  router.get('/anime',(req,res)=>{
    //随机选取8个动漫
    const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag 
    FROM video,video_tag WHERE type = '动漫' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
    ORDER BY RAND() LIMIT 8`
    db.model('video').sql(sqlquery, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200);
      res.json({ code: 0, message: '随机选取8个动漫', anime:results});
    });
  })

//movie
router.get('/movie',(req,res)=>{
  //随机选取8个电影
  const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag 
  FROM video,video_tag WHERE type = '电影' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
  ORDER BY RAND() LIMIT 8`
  db.model('video').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200);
    res.json({ code: 0, message: '随机选取8个电影', movie:results});
  });
})

//tv
router.get('/tv',(req,res)=>{
  //随机选取8个电视剧
  const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag 
  FROM video,video_tag WHERE type = '电视剧' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
  ORDER BY RAND() LIMIT 8`
  db.model('video').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200);
    res.json({ code: 0, message: '随机选取8个电视剧', tv:results});
  });
})

//variety
router.get('/variety',(req,res)=>{
  //随机选取8个综艺
  const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag 
  FROM video,video_tag WHERE type = '综艺' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
  ORDER BY RAND() LIMIT 8`
  db.model('video').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200);
    res.json({ code: 0, message: '随机选取8个综艺', variety:results});
  });
})

//排行榜
router.get('/rank',(req,res)=>{
  //随机选取10个动漫
  const videoQuery1 = `SELECT video.id, video.name, video.cover, video_tag.name as tag 
                      FROM video,video_tag WHERE type = '动漫' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
                      ORDER BY RAND() LIMIT 10`
  //随机选取10个综艺
  const videoQuery2 = `SELECT video.id, video.name, video.cover, video_tag.name as tag 
                      FROM video,video_tag WHERE type = '综艺' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
                      ORDER BY RAND() LIMIT 10`
  //随机选取10个电视剧
  const videoQuery3 = `SELECT video.id, video.name, video.cover, video_tag.name as tag 
                      FROM video,video_tag WHERE type = '电视剧' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
                      ORDER BY RAND() LIMIT 10`
  //随机选取10个图片
  const pictureQuery = `SELECT * FROM pictures ORDER BY RAND() LIMIT 10`;
  //随机选取10张播出表数据
  const rotateQuery = `SELECT video.id, video.name, video.cover, video_tag.name as tag 
                      FROM video,video_tag,video_round 
                      WHERE video.id = video_tag.video_id and video_tag.name <> 'Unknown'  and video_round.video_id = video.id 
                      ORDER BY RAND() LIMIT 10`
  //第一次
  db.model('video').sql(videoQuery1, (err, results1) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    video1 = results1;
    //第二次
    db.model('video').sql(videoQuery2, (err, results2) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      //第三次
      db.model('video').sql(videoQuery3, (err, results3) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        //第四次
        db.model('pictures').sql(pictureQuery, (err, results4) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
          }
          //第五次
          db.model('video_round').sql(rotateQuery, (err, results5) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
            }
            res.status(200);
          res.json({ code: 0, message: '排行榜', anime:results1, variety:results2, TV:results3, pictures:results4,rotate:results5});
          });
        });
      });
    });
  });
})

//轮播表
router.get('/rotate', (req, res) => {
  const sqlquery = `SELECT video.id,video.name,video.cover,video.episodes 
                    FROM video,video_tag,video_round 
                    WHERE video_round.video_id = video.id and video.id = video_tag.video_id`
  db.model('user').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to execute SQL query' });
    } else {
      const smallArrays = [];
      for (let i = 0; i < results.length; i += 16) {
        smallArrays.push(results.slice(i, i + 16));
      }
      res.status(200);
      res.json({ code:0, message: '轮播表', Monday:smallArrays[0], Tuesday:smallArrays[1], Wednesday:smallArrays[2], Thursday:smallArrays[3], Friday:smallArrays[4], Saturday:smallArrays[5], Sunday:smallArrays[6] });
    }
  });
});

//返回指定video_id信息
router.post('/getVideoInfo', (req, res) => {
  const video_id = req.body.video_id;
  const sqlquery = `SELECT video.name, video.type, video.year,video.area,
                    video.description,video.episodes,video_tag.name as tag FROM video, video_tag 
                    WHERE video.id = video_tag.video_id AND video.id = '${video_id}'`;
  db.model('user').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to execute SQL query' });
    } else {
      res.status(200).json({ code: 0, message: 'get_video_info', results:results[0] });
    }
  });
});

//获取搜索记录
router.post('/getHistory',(req,res)=>{
  const user_id = req.body.user_id;
  if (user_id === 0 || user_id === "0"){
    res.status(200).json({code:0,message:"user_id = 0", value:[]});
    return;
  }
  const sqlquery = `select search_history.value from search_history where user_id = '${user_id}'`;
  db.model('user').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({code:-1, message: 'Failed to execute SQL query' });
    } else {
      res.status(200).json({code:0,message:"getHistory", data:results});
    };
  });
});

//发表评论
router.post('/makeComment',(req,res)=>{
  const {video_id,content,user_id,root_comment_id} = req.body;
  if(user_id === 0){
    res.status(200).json({code:0,message:"请先登录再评论"});
    return;
  }
  const sqlquery = `insert into comment (video_id,content,user_id,createTime,commitLikeCount,rootCommentID) 
                  VALUES('${video_id}','${content}','${user_id}',NOW(),0,'${root_comment_id}')`;
  db.model('comment').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({cosw:-1, message: 'Failed to execute SQL query' });
    } else {
      res.status(200).json({code:0,message:"评论成功"});
    };
  });
});

//返回一级评论
router.post('/getComment1', (req, res) => {
  const video_id = req.body.video_id;
  const user_id = req.body.user_id; // 新增的 user_id 参数，用于判断是否点赞过
  const pagenum = req.body.pagenum || 1; // 如果未提供 pagenum 参数，默认为第一页
  const pagesize = req.body.pagesize || 10; // 如果未提供 pagesize 参数，默认每页显示 10 条评论
  const offset = (pagenum - 1) * pagesize; // 计算需要跳过的评论数量
  // 获取评论总数
  const queryTotal = `SELECT COUNT(*) AS total FROM comment WHERE comment.video_id = '${video_id}' AND comment.rootCommentID = 0`;
  // 按照 createTime 降序排序查询符合条件的评论详细信息
  const queryByTime = `
    SELECT comment.videoCommentID AS id, user.name AS nickname, content, DATE_FORMAT(createTime, '%Y-%m-%d %H:%i:%s') AS createTime, commitLikeCount,
    IF(COUNT(cl.id) > 0, 1, 0) AS is_thumbup
    FROM user, comment 
    LEFT JOIN Comment_Like cl ON comment.videoCommentID = cl.comment_id AND cl.user_id = '${user_id}'
    WHERE video_id = '${video_id}' AND user.id = comment.user_id AND comment.rootCommentID = 0
    GROUP BY comment.videoCommentID
    ORDER BY createTime ASC 
    LIMIT ${offset}, ${pagesize}
  `;
  
  // 按照 commitLikeCount 降序排序查询符合条件的评论详细信息
  const queryByHot = `
    SELECT comment.videoCommentID AS id, user.name AS nickname, content, DATE_FORMAT(createTime, '%Y-%m-%d %H:%i:%s') AS createTime, commitLikeCount,
    IF(COUNT(cl.id) > 0, 1, 0) AS is_thumbup
    FROM user, comment 
    LEFT JOIN Comment_Like cl ON comment.videoCommentID = cl.comment_id AND cl.user_id = '${user_id}'
    WHERE video_id = '${video_id}' AND user.id = comment.user_id AND comment.rootCommentID = 0
    GROUP BY comment.videoCommentID
    ORDER BY commitLikeCount DESC, createTime ASC 
    LIMIT ${offset}, ${pagesize}
  `;

  db.model('comment').sql(queryByTime, (err, rowsByTime) => {
    if (err) {
      console.error(err);
      res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
      return;
    }
    db.model('comment').sql(queryByHot, (err, rowsByHot) => {
      if (err) {
        console.error(err);
        res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
        return;
      }
      db.model('comment').sql(queryTotal, (err, total) => {
        if (err) {
          console.error(err);
          res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
          return;
        }
        res.status(200).json({ code: 0, message:
          '成功', data: {
            total: total[0].total, // 评论总数
            commentsByTime: rowsByTime, // 按照时间排序的评论列表
            commentsByHot: rowsByHot // 按照热度排序的评论列表
          } });
        });
    });
  });
});

//返回二级评论
router.post('/getComment2', (req, res) => {
  const videoCommentid = req.body.videoCommentid;
  const user_id = req.body.user_id; // 新增的 user_id 参数，用于判断是否点赞过
  const pagenum = req.body.pagenum || 1; // 如果未提供 pagenum 参数，默认为第一页
  const pagesize = req.body.pagesize || 10; // 如果未提供 pagesize 参数，默认每页显示 10 条评论
  const offset = (pagenum - 1) * pagesize; // 计算需要跳过的评论数量
  // 获取评论总数
  const queryTotal = `SELECT COUNT(*) AS total FROM comment WHERE comment.rootCommentID = '${videoCommentid}'`;
  // 按照 createTime 降序排序查询符合条件的评论详细信息
  const queryByTime = `
    SELECT comment.videoCommentID AS id, user.name AS nickname, content, DATE_FORMAT(createTime, '%Y-%m-%d %H:%i:%s') AS createTime, commitLikeCount,
    IF(COUNT(cl.id) > 0, 1, 0) AS is_thumbup
    FROM user, comment 
    LEFT JOIN Comment_Like cl ON comment.videoCommentID = cl.comment_id AND cl.user_id = '${user_id}'
    WHERE comment.rootCommentID = '${videoCommentid}' AND user.id = comment.user_id
    GROUP BY comment.videoCommentID
    ORDER BY createTime ASC 
    LIMIT ${offset}, ${pagesize}
  `;
  
  // 按照 commitLikeCount 降序排序查询符合条件的评论详细信息
  const queryByHot = `
    SELECT comment.videoCommentID AS id, user.name AS nickname, content, DATE_FORMAT(createTime, '%Y-%m-%d %H:%i:%s') AS createTime, commitLikeCount,
    IF(COUNT(cl.id) > 0, 1, 0) AS is_thumbup
    FROM user, comment 
    LEFT JOIN Comment_Like cl ON comment.videoCommentID = cl.comment_id AND cl.user_id = '${user_id}'
    WHERE comment.rootCommentID = '${videoCommentid}' AND user.id = comment.user_id
    GROUP BY comment.videoCommentID
    ORDER BY commitLikeCount DESC, createTime ASC 
    LIMIT ${offset}, ${pagesize}
  `;

  db.model('comment').sql(queryByTime, (err, rowsByTime) => {
    if (err) {
      console.error(err);
      res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
      return;
    }
    db.model('comment').sql(queryByHot, (err, rowsByHot) => {
      if (err) {
        console.error(err);
        res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
        return;
      }
      db.model('comment').sql(queryTotal, (err, total) => {
        if (err) {
          console.error(err);
          res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
          return;
        }
        res.status(200).json({ code: 0, message:
          '成功', data: {
            total: total[0].total, // 评论总数
            comments: rowsByTime
          } });
        });
    });
  });
});


//获取url
router.post('/getUrl',(req,res)=>{
  const video_id = req.body.video_id
  const sqlquery = `SELECT video_episodes.episodes, MIN(video_episodes.url) AS url 
  FROM video_episodes 
  INNER JOIN video_road ON video_road.id = video_episodes.road_id 
  INNER JOIN video ON video.id = video_road.video_id 
  WHERE video.id = '${video_id}' 
  GROUP BY video_episodes.episodes 
  ORDER BY episodes;`
  db.model('video_episodes').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({cosw:-1, message: 'Failed to execute SQL query' });
    } else {
      res.status(200).json({code:0, message:"GETURL", data:results});
    };
  });
})

//返回数据类型
router.post('/datetype',(req,res)=>{
  const {type,pagenum,pagesize} = req.body;
  // 计算查询的起始索引
  const startIndex = (pagenum - 1) * pagesize;
  //动漫
  if(type === 0 || type === "0"){
    const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag 
    FROM video,video_tag WHERE type = '动漫' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
    LIMIT ${startIndex}, ${pagesize}`;
    const countsquery = `SELECT count(*) as total from video,video_tag where video.type = "动漫" and video.id = video_tag.video_id and video_tag.name <> 'Unknown'`;
    db.model('video').sql(sqlquery, (err, Anime_result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      db.model('video').sql(countsquery,(err,count_result)=>{
        const total = count_result[0].total; // 总数
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json({ code: 0, message: 'datetype:动漫', data: { total, results: Anime_result }});
      })
    });
  }
  //电影
  else if(type === 1 || type === "1"){
    const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag 
    FROM video,video_tag WHERE type = '电影' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
    LIMIT ${startIndex}, ${pagesize}`;
    const countsquery = `SELECT count(*) as total from video,video_tag where video.type = "电影" and video.id = video_tag.video_id and video_tag.name <> 'Unknown'`;
    db.model('video').sql(sqlquery, (err, Movie_result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      db.model('video').sql(countsquery,(err,count_result)=>{
        const total = count_result[0].total; // 总数
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json({ code: 0, message: 'datetype:电影', data: { total, results: Movie_result }});
      })
    });
  }
  //综艺
  else if(type === 2 || type === "2"){
    const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag 
    FROM video,video_tag WHERE type = '综艺' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
    LIMIT ${startIndex}, ${pagesize}`;
    const countsquery = `SELECT count(*) as total from video,video_tag where video.type = "综艺" and video.id = video_tag.video_id and video_tag.name <> 'Unknown'`;
    db.model('video').sql(sqlquery, (err, variety_result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      db.model('video').sql(countsquery,(err,count_result)=>{
        const total = count_result[0].total; // 总数
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json({ code: 0, message: 'datetype:综艺', data: { total, results: variety_result }});
      })
    });
  }
  //电视剧
  else if(type === 3 || type === "3"){
    const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag 
    FROM video,video_tag WHERE type = '电视剧' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' 
    LIMIT ${startIndex}, ${pagesize}`;
    const countsquery = `SELECT count(*) as total from video,video_tag where video.type = "电视剧" and video.id = video_tag.video_id and video_tag.name <> 'Unknown'`;
    db.model('video').sql(sqlquery, (err, TV_result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      db.model('video').sql(countsquery,(err,count_result)=>{
        const total = count_result[0].total; // 总数
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json({ code: 0, message: 'datetype:电视剧', data: { total, results: TV_result }});
      })
    });
  }
  else if(type === 4 || type === "4"){
    const sqlquery = `SELECT * FROM pictures LIMIT ${startIndex}, ${pagesize}`;
    const countsquery = `SELECT count(*) as total from pictures`;
    db.model('pictures').sql(sqlquery, (err, picture_result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      db.model('pictures').sql(countsquery,(err,count_result)=>{
        const total = count_result[0].total; // 总数
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json({ code: 0, message: 'datetype:图片', data: { total, results: picture_result }});
      })
    });
  }
  else
  {
    res.status(200).json({ code: 0, message: 'datetype:null', data: {}});
  }
})

//评论点赞
router.post('/commentLike',(req,res)=>{
  const {user_id,comment_id} = req.body;
  if(user_id === 0){
    res.status(200).send({code:0, message:"user_id = 0,请先登录"});
    return;
  }
  sqlquery1 = `SELECT count(*) as total from comment_like where user_id = '${user_id}' AND comment_id = '${comment_id}'`;
  sqlquery2 = `insert into comment_like(user_id,comment_id) VALUES('${user_id}','${comment_id}')`;
  sqlquery3 = `UPDATE comment SET commitLikeCount = commitLikeCount + 1 WHERE videoCommentID = '${comment_id}'`;
  sqlquery4 = `DELETE FROM comment_like WHERE user_id = '${user_id}' and comment_id = '${comment_id}'`;
  sqlquery5 = `UPDATE comment SET commitLikeCount = commitLikeCount - 1 WHERE videoCommentID = '${comment_id}'`;
  db.model('comment_like').sql(sqlquery1, (err, count_commentLike) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if(count_commentLike[0].total){
      db.model('comment_like').sql(sqlquery4, (err, count_commentLike)=>{
        if (err) {
          console.error(err);
          res.status(500).send('sqlquery4 Server Error');
          return;
        }
        db.model('comment_like').sql(sqlquery5, (err, count_commentLike)=>{
          if (err) {
            console.error(err);
            res.status(500).send('sqlquery5 Server Error');
            return;
          }
          res.status(200).send({code:0, message:"取消点赞"});
          return;
        })
      })
    }
    else{
      //向commentlike表插入信息
    db.model('comment_like').sql(sqlquery2, (err,insert)=>{
      if (err) {
        console.error(err);
        res.status(500).send('comment_like Server Error');
        return;
      }
      //更新comment表
      db.model('comment').sql(sqlquery3, (err,insert)=>{
        if (err) {
          console.error(err);
          res.status(500).send('comment Server Error');
          return;
        }
        res.status(200).send({code:0, message:"点赞成功"});
        return;
      })
    })
    }
  })
})
module.exports = router;
