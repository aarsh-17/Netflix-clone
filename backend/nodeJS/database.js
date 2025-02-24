const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
  name:{
    type: String,
    require:true,
    unique:true
  },
  password:{
    type: String,
    required:true
  }
},{collection:'Users'});

const User=mongoose.model('User',userSchema); 

const watchlistSchema=new mongoose.Schema({
  username:{
    type: String,
    unique:true
  },
  movies:{
    type: Array,
    default:[]
  }
},{collection:'Watchlist'});

const Watchlist=mongoose.model('Watchlist',watchlistSchema);

module.exports={User,Watchlist};