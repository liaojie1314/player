const express = require('express');
const db = require("./database/orm");
const Token = require('./token');

const router = express.Router();
require("dotenv").config();

//登录
router.get('/login', (req, res) => {
  res.json({message: '登录界面'});
});
router.post('/login', (req, res) => {
  // 获取参数
  const { username, password, token } = req.body;

  // 如果有token，则尝试解密
  if (token) {
    try {
      const decoded = Token.decode(token);
      if (decoded.username === username) {
        // 如果解密成功，且用户名与请求一致，则返回登录成功
        db.model('user').sql(`SELECT id FROM user WHERE name='${username}'`, (err, user_id) => {
          if (err) {
            console.error(err);
            res.status(500).send('login Server Error');
            return;
          }
          res.json({ code: 0, message: '登录成功', user_id:user_id[0].id, token: token });
          return;
        })
      }
    } catch (err) {
      res.send("解密失败")
      // 如果解密失败，或用户名不一致，则忽略token，进行下一步验证
    }
  }
  if(password) {
  // 验证用户名和密码
  db.model('user').sql(`SELECT COUNT(*) as count FROM user WHERE name='${username}' AND password=${password}`, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results[0].count > 0) {
      db.model('user').sql(`SELECT id FROM user WHERE name='${username}'`, (err, user_id) => {
        if (err) {
          console.error(err);
          res.status(500).send('login Server Error');
          return;
        }
        // 生成新的token返回给客户端
        const payload = { username };
        const newToken = Token.encode(payload);
        res.json({ code: 0, message: '登录成功', user_id:user_id[0].id, token: newToken });
      })
    } else {
      res.json({ code: -1, message: '用户名或密码错误' });
    }
  });
  }
  else{
    res.json({ code: -1, message: '没输入密码' });
  }
});


//注册
router.get('/signin', (req, res) => {
  res.json({message: '注册界面'});
});
router.post('/signin', (req, res) => {
  //获取参数
  const { username, password, gender} = req.body;
  //加密密码
  const payload = { username };
  const token = Token.encode(payload);
  db.model('user').sql(`INSERT INTO user (name, password, gender) VALUES ('${username}', '${password}', '${gender}')`, (err, results) => {
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
    const insertQuery = `insert into search_history (content,user_id) VALUES ('${msg}', '${user_id}');`;
    db.model('search_history').sql(insertQuery,(err,insert_results)=>{
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200);
      res.json({ code: 0, message: '搜索成功',data:search_data });
    })
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
  const retateQuery = `SELECT video.id, video.name, video.cover, video_tag.name as tag FROM video,video_tag,video_round WHERE video.id = video_tag.video_id and video_tag.name <> 'Unknown'  and video_round.video_id = video.id ORDER BY RAND() LIMIT 10`
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
          db.model('pictures').sql(pictureQuery, (err, results5) => {
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
  const sqlquery = `select video.id,video.name,video.cover from video_round,video,video_tag where video.id = video_tag.video_id and video_round.video_id = video.id`
  db.model('user').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to execute SQL query' });
    } else {
      const smallArrays = [];
      for (let i = 0; i < results.length; i += 12) {
        smallArrays.push(results.slice(i, i + 12));
      }
      res.status(200);
      res.json({ code:0, message: '轮播表', Monday:smallArrays[0], Tuesday:smallArrays[1], Wednesday:smallArrays[2], Thursday:smallArrays[3], Friday:smallArrays[4], Saturday:smallArrays[5], Sunday:smallArrays[6] });
    }
  });
});

//返回video_url
router.post('/get_video_url', (req, res) => {
  const video_id = req.body.video_id;
  const sqlquery = `SELECT video_episodes.episodes, video_road.name as road, video_episodes.url FROM video, video_episodes, video_road WHERE video_episodes.road_id = video_road.id AND video_road.video_id = video.id AND video.id = '${video_id}' ORDER BY video_road.name, video_episodes.episodes`
  db.model('user').sql(sqlquery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to execute SQL query' });
    } else {
      const data = results.reduce((acc, result) => {
        let videoData = acc.find((data) => data.road === result.road);
        if (!videoData) {
          videoData = { road: result.road, episodes: [] };
          acc.push(videoData);
        }
        videoData.episodes.push({
          episode: result.episodes,
          url: result.url,
        });
        return acc;
      }, []);
      res.status(200).json({ code: 0, message: 'get_video_url', data });
    }
  });
});



module.exports = router;
