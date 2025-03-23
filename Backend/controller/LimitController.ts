import { Request, Response } from "express";
import { GoogleAuthSchema } from "../schema/UserSchema";
import { LimitSchemaOfBot } from "../schema/LimitSchema";

export const LimitController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid } = req.body || req.cookies;
    if (!uid) {
      res
        .status(400)
        .json({
          success: false,
          message: "User UID is missing. Please log in.",
        });
    }
    // Find or create the user
    let user = await GoogleAuthSchema.findOneAndUpdate(
      { uid },
      { $set: { uid } },
      { new: true, upsert: true }
    );

    // Find or initialize the user's limit
    let userLimit = await LimitSchemaOfBot.findOneAndUpdate(
      { userId: user._id },
      {
        $inc: { clickCount: 1 }, // Increment clickCount by 1
        $setOnInsert: { LimitOfBot: 15 }, // Initial limit is 2
      },
      { new: true, upsert: true }
    );

    if (userLimit.clickCount > userLimit.LimitOfBot) {
      res
        .status(403)
        .json({
          message:
            "You have reached your free limit. Subscribe to access more!",
        });
      return;
    }

    res.status(200).json({
      message: "Bot processed successfully.",
      user,
      userLimit,
    });
  } catch (error) {
    console.error("❌ Error in LimitController:", error);
    res.status(500).json({ message: "Internal server error.", error });
    return;
  }
};
