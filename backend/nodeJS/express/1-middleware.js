const express=require('express')
const path=require('path')
const app=express();
const logger=require('././middle/middleware');
const authorize = require('././middle/authorize');
app.use(express.static('./public'))
app.use('/api',[logger,authorize])

app.get('/',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./broweser/index.html'))
})

app.get('/about',(req,res)=>{
  res.send("<h1>About</h1>")
})

app.get('/api/products',(req,res)=>{
  res.send("<h1>Products</h1>")
})

app.get('/about/team',(req,res)=>{
  res.send("<h1>TEAM</h1>")
})

app.get('/api/customer',(req,res)=>{
  res.send("<h1>customer</h1>")
})
app.listen(5000,()=>{
  console.log("Starting server in port 5000....")
})