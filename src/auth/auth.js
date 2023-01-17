// Verify Token
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
async function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const {SECRET_KEY} = process.env
    const bearerToken = bearer[1];
    const user = await jwt.verify(bearerToken, SECRET_KEY)
    req.token = bearerToken;
    req.user = user
    next();
  } else {
    // Forbidden
    res.status(403).json({message:"Access dineid"});
  }

}
module.exports = verifyToken;
