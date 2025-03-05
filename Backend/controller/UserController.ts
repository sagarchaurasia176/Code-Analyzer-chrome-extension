import { Request, Response } from "express";
import admin from "../utils/firebaseAdmin";
import { GoogleAuthSchema } from "../schema/User.schema";

export async function UserController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { idToken } = req.body;
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
    res.status(200).json({
      message: true,
      data: user,
    });
  } catch (er) {
    res
      .status(401)
      .json({ success: false, message: "Invalid token", error: er });
  }
}
