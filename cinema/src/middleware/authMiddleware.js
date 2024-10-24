

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const authenticateJWT = async (req, res, next) => {
  try {
   
    const authHeader = req.header('Authorization');

    
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       
        return res.status(401).send({ error: 'Authorization token missing or invalid.' });
    }
    
   
    const token = authHeader.replace('Bearer ', '');
 
    // console.log('JWT Secret:', process.env.JWT_SECRET || 'RESTFULAPIs');



   
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'RESTFULAPIs');

   
   
    // console.log('Authorization Header:', req.header('Authorization'));
    
    
    const user = await userModel.findOne({ _id: decoded._id});

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  next();
};

module.exports = { authenticateJWT, isAdmin };
