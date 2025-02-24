const authorize=(req,res,next)=>{
  const {user}=req.query;
  
  if(user==='aarsh'){
    req.user={name:'aarsh',id:3}
    console.log(req.user);
    next()
  }
  else{
    res.status(401).send('Not authorised')
  }
}

module.exports=authorize