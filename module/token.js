const jwt = require('jsonwebtoken');
require('dotenv').config();

const Token = {
  encode(payload) {
    //sign(param1,param2)  加密对象，解密密匙
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  },
  decode(token) {
    try {
      //verify(param1,param2)  解密对象，解密密匙
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      return payload;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

module.exports = Token;
