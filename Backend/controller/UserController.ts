import { Request, Response, NextFunction } from "express";
import { GoogleAuthSchema } from "../schema/UserSchema";
import { verifyFirebaseToken } from "../utils/firebaseAdmin";
import { attachCookies } from "../utils/attachCookies";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function UserController(req: Request, res: Response): Promise<void> {
  try {
    const tokenMatch = req.headers.authorization?.match(/^Bearer\s(.+)$/);
    const idToken = tokenMatch ? tokenMatch[1] : null;

    if (!idToken) {
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }

    // Verify token and get user data
    const decodedToken = await verifyFirebaseToken(idToken);

    const { uid, email, name } = decodedToken;

    // Create a JWT token
    const jwtToken = jwt.sign(
      { uid, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    let user = await GoogleAuthSchema.findOne({ email });
    if (!user) {
      user = await GoogleAuthSchema.create({ uid, email, name });
    }
    // Set the JWT token in cookies
    attachCookies(res, jwtToken);
    // Return user data
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
      },
      jwt:jwtToken
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
    res.clearCookie("analyzer", {
      httpOnly: false,
      secure: false,
      sameSite: "none",
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
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
    const token = req.cookies?.analyzer;
    if (!token) {
      res.status(401).json({ success: false, message: "Authentication required for middleare controller" });
      return;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // Attach user data to request

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ success: false, message: "Invalid authentication from middleware" });
  }
};