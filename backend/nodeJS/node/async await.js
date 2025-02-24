const {readFile,writeFile}=require('fs').promises

const start=async()=>{
  try{
  const first=await readFile('./content/first.txt')
  const second=await readFile('./content/second.txt')
  console.log(first+'\n'+second);
  await writeFile('./content/write.txt','\nHello this is written',{flag:'a'})
  }
  catch(err){
    console.log(err)
  }
  
}
start();

//method1

// const getText=(path)=>{
//   return new Promise((resolve,reject)=>{
//     readFile(path,'utf8',(err,data)=>{
//       if(err){
//         reject(err)
//       }
//       else resolve(data)
//     })
//   })
// }

//method2

// const util=require('util')
// const readFilePromise=util.promisify(readFile)
// const writeFilePromise=util.promisify(writeFile)