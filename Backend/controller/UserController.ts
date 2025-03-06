import { Request, Response } from "express";
import admin from "../utils/firebaseAdmin";
import { GoogleAuthSchema } from "../schema/User.schema";

export async function UserController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({ message: "Token is required" });
    }
    const decodeToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodeToken);
    const { uid, email } = decodeToken;
    // stored the data into the db
    // 🔹 Store user in MongoDB
    let user = await GoogleAuthSchema.findOne({ uid });
    if (!user) {
      user = new GoogleAuthSchema({ uid, email });
      await user.save();
    }
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Corrected: Adds 3 full days
      httpOnly: true, // Prevents JavaScript access for security
      // secure: true, // Ensures cookies are sent over HTTPS
    };
    
    res.cookie("analyzer", idToken, options).status(200).json({
        message: "User authenticated successfully and cookies stored",
        data: user,
  })
  } catch (er) {
    res
      .status(401)
      .json({ success: false, message: "Invalid token", error: er });
  }
}


export const LogoutController = (req: Request, res: Response) => {
  try {
    res.clearCookie("analyzer");
    res.json({ message: "Logged out successfully" });

  } catch (er) {
    res
      .status(403)
      .json({ success: false, message: "cookies not removed", error: er });
  }
}


//middleware for high security purpose
export const AuthMiddleware = (req: Request, res: Response, next: Function):void=> {
  try {
    const token = req.cookies.analyxer;
    if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    }
    next();
  }catch(er){
    res.json({
      message:"auth middleware not work well"
    })
  }
}