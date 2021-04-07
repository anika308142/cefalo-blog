const db=require('../models');
const Post=db.Post;
const User=db.User;
const errHandler=(err)=>{
  
    console.error("Error",err);
  }

  exports.createPost = async (req, res) => {
    
  console.log("in post contrroller");
     const post= await Post.create({ 
         pid:req.body.pid,
          uid: req.body.uid,
        title: req.body.title,
           story: req.body.story}).catch(errHandler);
        res.send("successful");
    };
    exports.readPost = async (req, res) => {
      User.hasMany(Post, {foreignKey: 'uid'});
      Post.belongsTo(User, {foreignKey: 'uid'});
      
      const posts=await Post.findAll({
        include: [{
          model: User,
          attributes: ['name'],
          required: true
         }]
      });
        console.log("in post read  contrroller");
     // const posts= await Post.findAll();
        res.send(posts);
         //console.log(posts);
          };


          exports.readPostbyPid = async (req, res) => {
    
            console.log("in post read contrroller");
            
           const posts= await Post.findAll({
                where: {
                  pid: req.params.pid,
                }
              });
            res.send(posts);
    
              };

              exports.updatePost = async (req, res) => {
    
                console.log("in post read  contrroller");
                
               const posts= await Post.update({
                title: req.body.title,
                story: req.body.story 
                
                }, {
                where: {
                    pid: req.body.pid,
                    uid: req.body.uid,
                }
              });
                res.send(posts);
        
                  };

                  exports.deletePost = async (req, res) => {
    
                    console.log("in post read  contrroller");
                    
                   const posts= await Post.destroy({
                    where: {
                        pid: req.params.pid,
                        
                    }
                  });
                    res.send("deleted");
            
                      };