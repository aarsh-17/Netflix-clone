const express=require('express')
const path=require('path')
const app=express();
const cors = require('cors');
let {people}=require('./data');
const { log } = require('console');

app.use(cors());
app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/api/people',(req,res)=>{
  res.status(200).json({success:true,data:people})
})

app.get('/api/people/:id',(req,res)=>{
  const {id}=req.params
  const user=people.find(u=>u.id===Number(id))

  
  res.status(200).json({success:true,data:user})
})

app.post('/api/people',(req,res)=>{
  const {name}=req.body
  
  const temp_id=people.length
  people=[...people,{id:temp_id+1,name:name}]
  console.log(people);
  
  res.status(201).json({success:true,data:people})
})

app.put('/api/people/:id',(req,res)=>{
  const {id}=req.params
  const {name}=req.body
  console.log(id,name);
  
  const user=people.find(u=>u.id===Number(id))
  if(!user){
    return res.status(404).json({success: false,msg:`the person with id:${id}not found`})
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})

app.delete('/api/people/:id',(req,res)=>{
  const {id}=req.params
  
  const person=people.find(person=>person.id===id)
  if(!person){
    return res.status(404).json({success: false,msg:`the person with id:${id}not found`})
  }
  
})
app.listen(5000,()=>{
  console.log("Starting server in port 5000....")
})