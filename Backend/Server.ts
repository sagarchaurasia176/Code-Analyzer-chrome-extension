import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/UserRoutes";
import { Request, Response } from "express";
import { MongoDbConnection } from "./config/MongoDbConnection";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import { LimitRouter } from "./routes/LimitRoutes";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

// mount 
app.use(express.json()); //server rendering - middleware
app.use(cookieParser()); // Use cookie-parser middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// allow origin 
const allowOrigin = [
    "chrome-extension://fmjgimepnoffjjongiedkgbanfnhobkk",
    "https://code-analyzer-login-auth.vercel.app","*"
]

// Cors 
app.use(cors({
  origin: allowOrigin,
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


//User-Routes 
app.use("/user", router);
//Limit-Routes
app.use('/bot' ,LimitRouter);


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
