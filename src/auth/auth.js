// Verify Token
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
exports.verifyToken = async(req, res, next)=> {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined') {
    // Forbidden
    return res.status(403).json({ message: 'Access dineid' });
  }
  // if (!user.token) {
  //   return res.status(403).json({ message: 'Access dineid' });
  // } 
  else {
    const bearer = bearerHeader.split(' ');
    const { SECRET_KEY } = process.env;
    const bearerToken = bearer[1];
    const user = await jwt.verify(bearerToken, SECRET_KEY);
    req.token = bearerToken;
    req.user = user;
    next();
  }
}
exports.Admin = async(req, res, next) => {
    if (!req.authuser.isAdmin) {
        return res.status(403).json({ message: "access denied" })
    }
    next()
}
