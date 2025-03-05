import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/UserRoutes';
import { MongoDbConnection } from './config/MongoDbConnection';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); //server rendering - middleware
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// db import 
app.use('/user/auth', router);
//  routes 

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const start = async()=>{
  await MongoDbConnection(process.env.MONGODB_URI!);
  console.log("db connected")
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} 
start();
