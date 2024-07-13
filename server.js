import express from 'express';

const app = express();

const PORT = 8080;

app.get('/', (req, res)=>{
   res.status(200).send({
      message: "Hello from node",
   })
})

app.listen(PORT, ()=>{
   console.log(`Server is listening on port: ${PORT}`);
})