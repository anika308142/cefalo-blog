const db=require('../models');
var generateToken=require('../utils/generateToken');
const User=db.User;
let options = {};
// const cookieParser = require('cookie-parser');

// app.use(cookieParser());

// /var secret =require('crypto').randomBytes(64).toString('hex');
// console.log(secret);

const errHandler=(err)=>{
  
  console.error("Error",err);
}
exports.createUser = async (req, res) => {

  const errHandler=(err)=>{

    console.error("Error",err);
  }

    if (!req.body.uid) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const token = await generateToken.generateAccessToken({ uid: req.body.uid });
    //const token = await res.json();
    res.cookie('auth-token', token, [options]); 
// set token in cookie
//document.cookie = `token=${token}`;
   // res.json(token);
console.log("in user contrroller");
   const user= await User.create({ 
        uid: req.body.uid,
          name: req.body. name,
          password: req.body.password }).catch(errHandler);
      res.send("successful");
  };

  //module.exports = userController;