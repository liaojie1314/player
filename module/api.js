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
  //获取搜索内容
  const { msg, user_id} = req.body;
  //在数据库表video中进行模糊查找
  const searchQuery = `SELECT a.id, a.name,a.cover,a.type,b.name as tag,a.description FROM video as a,video_tag as b WHERE a.name LIKE '%${msg}%' and a.id = b.video_id`;
  db.model('video').sql(searchQuery, (err, search_results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    search_data = search_results;
    if (!search_results || search_results.length === 0) {
      res.status(200);
      res.json({ code: 0, message: '未搜索到任何数据', data: [] });
      return;
    }
    if (user_id === 0){
      res.status(200);
      res.json({ code: 0, message: 'user_id = 0', data:search_results });
      return;
    }
    const searchQuery2 = `SELECT count(*) from search_history where content = '${msg}' and user_id='${user_id}'`;
    db.model('search_history').sql(searchQuery2,(err,search_results2)=>{
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if(search_results2[0]){
          res.status(200).json({ code: 0, message: '搜索成功',data:search_data });
          return;
      }else{
        const insertQuery = `insert into search_history (content,user_id) VALUES ('${msg}', '${user_id}')`;
        db.model('search_history').sql(insertQuery,(err,insert_results)=>{
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
          }
          res.status(200);
          res.json({ code: 0, message: '搜索成功',data:search_data });
        })
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
  const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag FROM video,video_tag WHERE type = '动漫' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' ORDER BY RAND() LIMIT 8`
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
  const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag FROM video,video_tag WHERE type = '电影' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' ORDER BY RAND() LIMIT 8`
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
  const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag FROM video,video_tag WHERE type = '电视剧' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' ORDER BY RAND() LIMIT 8`
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
  const sqlquery = `SELECT video.id, video.name, video.description, video.cover, video_tag.name as tag FROM video,video_tag WHERE type = '综艺' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' ORDER BY RAND() LIMIT 8`
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
  const videoQuery1 = `SELECT video.id, video.name, video.cover, video_tag.name as tag FROM video,video_tag WHERE type = '动漫' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' ORDER BY RAND() LIMIT 10`
  //随机选取10个综艺
  const videoQuery2 = `SELECT video.id, video.name, video.cover, video_tag.name as tag FROM video,video_tag WHERE type = '综艺' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' ORDER BY RAND() LIMIT 10`
  //随机选取10个电视剧
  const videoQuery3 = `SELECT video.id, video.name, video.cover, video_tag.name as tag FROM video,video_tag WHERE type = '电视剧' and video.id = video_tag.video_id and video_tag.name <> 'Unknown' ORDER BY RAND() LIMIT 10`
  //随机选取10个图片
  const pictureQuery = `SELECT * FROM pictures ORDER BY RAND() LIMIT 10`;
  //随机选取10张播出表数据
  const rotateQuery = `SELECT video.id, video.name, video.cover, video_tag.name as tag FROM video,video_tag,video_round WHERE video.id = video_tag.video_id and video_tag.name <> 'Unknown'  and video_round.video_id = video.id ORDER BY RAND() LIMIT 10`
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
  const sqlquery = `SELECT video.id,video.name,video.cover,video.episodes FROM video,video_tag,video_round WHERE video_round.video_id = video.id and video.id = video_tag.video_id`
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
  const sqlquery = `SELECT video.name, video.type, video.year,video.area, video.description,video.episodes,video_tag.name as tag FROM video, video_tag WHERE video.id = video_tag.video_id AND video.id = '${video_id}'`;
  db.model('user').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to execute SQL query' });
    } else {
      // const data = results.reduce((acc, result) => {
      //   let videoData = acc.find((data) => data.road === result.road);
      //   if (!videoData) {
      //     videoData = { road: result.road, episodes: [] };
      //     acc.push(videoData);
      //   }
      //   videoData.episodes.push({
      //     episode: result.episodes,
      //     url: result.url,
      //   });
      //   return acc;
      // }, []);
      // res.status(200).json({ code: 0, message: 'get_video_url', data });
      res.status(200).json({ code: 0, message: 'get_video_info', results:results[0] });
    }
  });
});

//获取搜索记录
router.post('/getHistory',(req,res)=>{
  const user_id = req.body.user_id;
  if (user_id === 0){
    res.status(200).json({code:0,message:"user_id = 0", value:[]});
    return;
  }
  const sqlquery = `select search_history.content from search_history where user_id = '${user_id}'`;
  db.model('user').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({code:-1, message: 'Failed to execute SQL query' });
    } else {
      res.status(200).json({code:0,message:"getHistory", value:results});
    };
  });
});

//发表评论
router.post('/makeComment',(req,res)=>{
  const {videoid,content,userid} = req.body;
  const sqlquery = `insert into comment (video_id,content,user_id,createTime,commitLikeCount) VALUES('${videoid}','${content}','${userid}',NOW(),FLOOR(RAND() * 100))`;
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
  const videoid = req.body.videoid;
  const pagenum = req.body.pagenum || 1; // 如果未提供 pagenum 参数，默认为第一页
  const pagesize = req.body.pagesize || 10; // 如果未提供 pagesize 参数，默认每页显示 10 条评论
  const state = req.body.state || "createtime";
  const offset = (pagenum - 1) * pagesize; // 计算需要跳过的评论数量

  // 查询符合条件的评论总数
  const sqlquery1 = `SELECT COUNT(*) AS total FROM comment WHERE comment.video_id = '${videoid}'`;
  db.model('comment').sql(sqlquery1, (err, results1) => {
    if (err) {
      console.error(err);
      res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
      return;
    }

    // 查询符合条件的评论详细信息，并按照 createTime 降序或者 commitLikeCount 降序排序
    let orderBy = '';
    if (state === 'hot') {
      orderBy = 'ORDER BY commitLikeCount ASC, createTime ASC';
    } else if (state === 'time') {
      orderBy = 'ORDER BY createTime ASC';
    }
    const sqlquery2 = `
      SELECT comment.videoCommentID AS id, user.name AS nickname, content, createTime, commitLikeCount 
      FROM user, comment 
      WHERE video_id = '${videoid}' AND user.id = comment.user_id 
      ${orderBy} 
      LIMIT ${offset}, ${pagesize}
    `;
    db.model('comment').sql(sqlquery2, (err, results2) => {
      if (err) {
        console.error(err);
        res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
        return;
      }

      const total = results1[0].total; // 总评论数
      const rows = results2; // 当前页评论数据

      res.status(200).json({ code: 0, message: '查询成功', total, rows });
    });
  });
});


//返回二级评论
router.post('/getComment2', (req, res) => {
  const videoCommentid = req.body.videoCommentid;
  const pagenum = req.body.pagenum || 1; // 如果未提供 pagenum 参数，默认为第一页
  const pagesize = req.body.pagesize || 10; // 如果未提供 pagesize 参数，默认每页显示 10 条评论
  const state = req.body.state || "createtime";
  const offset = (pagenum - 1) * pagesize; // 计算需要跳过的评论数量

  // 查询符合条件的评论总数
  const sqlquery1 = `SELECT COUNT(*) AS total FROM comment WHERE comment.rootCommentID = '${videoCommentid}'`;
  db.model('comment').sql(sqlquery1, (err, results1) => {
    if (err) {
      console.error(err);
      res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
      return;
    }

    // 查询符合条件的评论详细信息，并按照 createTime 降序或者 commitLikeCount 降序排序
    let orderBy = '';
    if (state === 'hot') {
      orderBy = 'ORDER BY commitLikeCount ASC, createTime ASC';
    } else if (state === 'time') {
      orderBy = 'ORDER BY createTime ASC';
    }
    const sqlquery2 = `
      SELECT comment.videoCommentID AS id, user.name AS nickname, content, createTime, commitLikeCount 
      FROM user, comment 
      WHERE rootCommentID = '${videoCommentid}' AND user.id = comment.user_id 
      ${orderBy} 
      LIMIT ${offset}, ${pagesize}
    `;
    db.model('comment').sql(sqlquery2, (err, results2) => {
      if (err) {
        console.error(err);
        res.status(500).json({ code: -1, message: 'Failed to execute SQL query' });
        return;
      }

      const total = results1[0].total; // 总评论数
      const rows = results2; // 当前页评论数据

      res.status(200).json({ code: 0, message: '查询成功', total, rows });
    });
  });
});

//获取url
router.post('/getUrl',(req,res)=>{
  const videoid = req.body.videoid
  const sqlquery = `SELECT video_episodes.episodes, MIN(video_episodes.url) AS url FROM video_episodes INNER JOIN video_road ON video_road.id = video_episodes.road_id INNER JOIN video ON video.id = video_road.video_id WHERE video.id = '${videoid}' GROUP BY video_episodes.episodes ORDER BY episodes;`
  db.model('video_episodes').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({cosw:-1, message: 'Failed to execute SQL query' });
    } else {
      res.status(200).json({code:0,message:"评论成功",data:results});
    };
  });
})

module.exports = router;
