// src/firebaseAdmin.ts
import dotenv from "dotenv";
import admin from "firebase-admin";
dotenv.config();

const serviceAccountEnv = process.env.RDS_FIREBASE_SERVICE_ACCOUNT!;

if (!serviceAccountEnv) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not defined");
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountEnv);
  console.log("✅ Service account loaded successfully");
} catch (error) {
  throw new Error("❌ FIREBASE_SERVICE_ACCOUNT is not a valid JSON string. Check your .env file.");
}

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount!),
  });
}
export async function verifyFirebaseToken(idToken: string) {
  if (!idToken) {
    console.error("❌ No token provided!");
    throw new Error("Token is required for authentication.");
  }

  try {
    // Verify token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken); // it fetch from the firebase
    if (!decodedToken.email) {
      throw new Error("❌ No email associated with this token.");
    }
    // Extract user information
    const { uid, email, name } = decodedToken;    
    return { uid, email, name };
  } catch (error) {
    console.error("❌ Error verifying Firebase token:", error);
    throw new Error("Invalid or expired token.");
  }
}
