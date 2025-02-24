const jwt = require('jsonwebtoken');

const validate=(req,res,next)=>{
  const {name,password}=req.body;
  console.log(name,password);
  if(!name || !password){
    return res.status(400).json({message:'Please provide name and password'})
  }
 else if(password.length<6){
  return res.status(400).json({message:'Password should be at least 6 characters'})
 }

  next()
}

const verifyToken=(req, res, next)=> {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(403).send('Access denied.');

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.status(401).send('Invalid token.');
    req.user = user; // decoded user information
    next();
  });
}

module.exports={validate,verifyToken};