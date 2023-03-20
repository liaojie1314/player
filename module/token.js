const jwt = require('jsonwebtoken');
require('dotenv').config();

const Token = {
  encode(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  },
  decode(token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      return payload;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

module.exports = Token;
