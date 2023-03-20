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
        res.json({ code: 0, message: '登录成功', token: token });
        return;
      }
    } catch (err) {
      res.send("解密失败")
      // 如果解密失败，或用户名不一致，则忽略token，进行下一步验证
    }
  }

  // 验证用户名和密码
  db.model('user').sql(`SELECT COUNT(*) as count FROM user WHERE name='${username}' AND password=${password}`, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results[0].count > 0) {
      // 生成新的token返回给客户端
      const payload = { username };
      const newToken = Token.encode(payload);
      res.json({ code: 0, message: '登录成功', token: newToken });
    } else {
      res.json({ code: -1, message: '用户名或密码错误' });
    }
  });
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

module.exports = router;
