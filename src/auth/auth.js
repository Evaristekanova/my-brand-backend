// Verify Token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.status(403).json({message:"Access dineid"});
  }

}
module.exports = verifyToken;
