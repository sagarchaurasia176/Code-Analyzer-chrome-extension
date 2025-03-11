import { Request, Response, NextFunction } from "express";
import { GoogleAuthSchema } from "../schema/UserSchema";
import { error } from "node:console";
import { verifyFirebaseToken } from "../utils/firebaseAdmin";

export async function UserController(req: Request, res: Response): Promise<void> {
  try {
    const tokenMatch = req.headers.authorization?.match(/^Bearer\s(.+)$/);
    const idToken = tokenMatch ? tokenMatch[1] : null;

    if (!idToken) {
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }

    // Verify token and get user data
    const { uid, email, name } = await verifyFirebaseToken(idToken);

    let user = await GoogleAuthSchema.findOne({ uid });

    if (!user) {
      user = await GoogleAuthSchema.create({ uid, email, name });
    } 

    // // Set the auth cookie
    // res.cookie("analyzer", idToken, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   maxAge: 24 * 60 * 60 * 1000, // 24 hours
    // });

    // Return user data
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
}



export const LogoutController = (req: Request, res: Response): void => {
  try {
    res.clearCookie("analyzer");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.analyzer;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // You might want to verify the token here with Firebase admin
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // req.user = decodedToken;

    next();
  } catch {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid authentication",
    });
  }
};
