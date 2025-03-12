import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/UserRoutes";
import { Request, Response } from "express";
import { MongoDbConnection } from "./config/MongoDbConnection";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import admin from 'firebase-admin';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json()); //server rendering - middleware
app.use(cookieParser()); // Use cookie-parser middleware
app.use(bodyParser.json());


app.use(cors({
  origin: [
    "chrome-extension://fmjgimepnoffjjongiedkgbanfnhobkk",
    "https://code-analyzer-login-auth.vercel.app",
    "*"], 
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


// db import
app.use("/user", router);

//  routes
app.get("/", (req,res) => {
  res.send("Hello World!");
});
const start = async () => {
  await MongoDbConnection(process.env.MONGODB_URI!);
  console.log("db connected");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
start();
