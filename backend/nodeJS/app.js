const express=require('express')
const path=require('path')
const app=express();
const http=require('fs')
const cors = require('cors');
const mongoose=require('mongoose')
const {validate,verifyToken}=require('./middle/middleware')
const jwt=require('jsonwebtoken')

app.use(express.static('./methods-public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
const {User,Watchlist}=require('./database')

app.use(express.json())

const query = 'mongodb+srv://aarshdhamsania:9106435150@cluster0.uiwz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err))

const SECRET_KEY = (Math.random() + 1).toString(36).substring(7)
let id=1
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, './public/Netflix_sign_in.html'));
});

app.get('/login',(req,res)=>{
  res.sendFile(path.join(__dirname, './public/Netflix_login.html'));
})


app.post('/login',validate,async (req,res)=>{
  const {name,password}=req.body;
  try{
    const user=await User.findOne({name})
    if(!user){
     return res.status(404).json({message:'User not found'})
    }

    if(password!=user.password){
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: id }, SECRET_KEY,{expiresIn:'5min'});
    console.log({token});
    
    res.status(200).json({token} );

  }
  catch(e){
    console.log(e);
    return res.status(500).json({message:'server error'})
  }
})

app.post('/save',validate, async (req, res) => {
  try {
    const {name,password}=req.body;
    console.log(name,password);
    
    const newUser = new User({
     name: name,
      password: password,
    });
    await newUser.save();  // No callback needed, just use await for promises
    res.redirect('../login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to insert data');
  }
});

app.post('/watchlist',verifyToken,async (req,res)=>{
  try{
  const {username,movies}=req.body;
  const newWatchlist = new Watchlist({
    username: username,
    movies: movies,
  });
  await newWatchlist.save();  // No callback needed, just use await for promises
  }catch (error) {
    console.error(error);
    res.status(500).send('Failed to insert data');
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);

