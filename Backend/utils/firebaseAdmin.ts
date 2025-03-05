// src/firebaseAdmin.ts
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountEnv) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not defined");
}
const serviceAccount = JSON.parse(serviceAccountEnv);
console.log(serviceAccount);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;


// user auth 