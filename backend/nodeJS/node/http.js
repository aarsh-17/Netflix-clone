const http=require('http');
const server=http.createServer((req,res)=>{
  if(req.url==='/'){
    res.end("THIS IS THE HOMEPAGE");
  }
  if(req.url==='/about'){
    res.end("THIS IS OUR HISTORY")
  }
  res.end(`
    <h1 style="color:red">ERROR</h1>
    `)
});

server.listen(5001);