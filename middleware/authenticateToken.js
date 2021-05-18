const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  token = req.cookies['Authorization'];
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    console.log(req.user.uid);
    next()
  })
}
module.exports = authenticateToken;
