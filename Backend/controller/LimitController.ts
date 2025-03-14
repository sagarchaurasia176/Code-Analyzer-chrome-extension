import { LimitSchemaOfBot } from "../schema/LimitSchema";
import { Request, Response } from "express";
// Limit Controller
export const LimitController = async (
  req: Request,
  res: Response
): Promise<void> => {
    
  //take user id
  try {
    const { userId } = req.body;
    const checkUserId = await LimitSchemaOfBot.findOne({ userId }).populate("userId");
    
    // Chekc user Id
    if(checkUserId) {
      checkUserId.clickCount += 1;
      await checkUserId.save();
      if (checkUserId.clickCount > checkUserId.LimitOfBot) {
        res.status(403).json({ message: "Limit reached. Subscribe!" });
        return;
      }
      res.status(200).json({
        message: true,
        data: checkUserId,
        clicks: checkUserId.clickCount,
      });
    }
  } catch (er) {
    res.status(404).json({ message: "User not found." });
    return;
  }
};