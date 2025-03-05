import { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Function to establish a connection to MongoDB
export async function MongoDbConnection(uri:string) {
  // db test  
  try {
    await connect(uri, {
      dbName: "ChromeDb",
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}
