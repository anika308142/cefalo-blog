const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
var secret=process.env.TOKEN_SECRET;

// async function generateAccessToken(uid) {
//     return jwt.sign(uid, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
//   }

  module.exports = {
    generateAccessToken: async function(uid) {
        return jwt.sign(uid, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
  }
    
    
};