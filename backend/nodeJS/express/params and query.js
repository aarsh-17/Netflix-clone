const express=require('express')
const path=require('path')
const app=express();
const {tours}=require('./data.js')

app.use(express.static('./public'))

app.get('/',(req,res)=>{
  //res.sendFile(path.resolve(__dirname,'./broweser/index.html'))
  res.send("<h1><a href='/api/tours'>HOME PAGE</a></h1>")
  //res.json(tours)
})

app.get('/api/tours/all',(req,res)=>{
  const newTours=tours.map((tour)=>{
    const {id,name,image,price}=tour;
    return {id,name,image,price};
  })

  res.send(newTours)
})

app.get('/api/tours/:tourID',(req,res)=>{
  const {tourID}=req.params
  const singleTour=tours.find((tour)=>tour.id===tourID)
  res.send(singleTour)
})

app.get('/api/tours',(req,res)=>{
  const {priceLimit,limit}=req.query
  let sortedTours=[...tours];
  console.log(req.query);
  
  if(priceLimit){
    sortedTours=sortedTours.filter((tour)=>{
      return Number(tour.price)<Number(priceLimit)
    })
    console.log(sortedTours);
    
  }

  if(limit){
    sortedTours=sortedTours.slice(0,Number(limit))
  }

  res.send(sortedTours)
})

app.get('*',(req,res)=>{
  res.status(404).send('resource not found')
})
app.listen(5000,()=>{
  console.log("Starting server in port 5000....")
})