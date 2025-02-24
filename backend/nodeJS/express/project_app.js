const express=require('express')
const path=require('path')
const app=express();

app.use(express.static('./public'))
app.get('/',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./broweser/index.html'))
})
app.listen(5000,()=>{
  console.log("Starting server in port 5000....")
})