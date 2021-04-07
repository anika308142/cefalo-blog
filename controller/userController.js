const db=require('../models');
const User=db.User;
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
    
console.log("in user contrroller");
   const user= await User.create({ 
        uid: req.body.uid,
          name: req.body. name,
          password: req.body.password }).catch(errHandler);
      res.send("successful");
  };

  //module.exports = userController;