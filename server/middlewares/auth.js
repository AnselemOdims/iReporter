
import jwt from 'jsonwebtoken';

const auth = {
    authenticate(user) { 
      return jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: this.isAdmin
      }, process.env.SECRET, {
        expiresIn: '48h',
      });
    },
  
    verifyToken(token) {
      let decoded = {};
      try {
        decoded.payload = jwt.verify(token, process.env.SECRET);
      } catch (error) {
        decoded = {
          error: error.message,
        };
      }
      return decoded;
    },
  
    verifyUserToken(req, res, next) {
      const token = req.headers['x-auth-token'];
      
      if (!token) {
        return res.status(400).json({ status: 400, error: 'No token provided.' });
      }
      const decoded = auth.verifyToken(token);
      if (decoded.error) {
        return res.status(400).json({ status: false, message: 'Failed to authenticate token.' });}

        req.decoded = decoded.payload;
        
        next();
      }
      }

 export default auth;    