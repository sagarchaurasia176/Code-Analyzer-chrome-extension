import express, { Request, Response, NextFunction } from "express";
import {
    AuthMiddleware,
  LogoutController,
  UserController,
} from "../controller/UserController";
const router = express.Router();

router.post("/login", UserController);
router.post("/logout", LogoutController);
// Protected Route
router.get("/user/profile",AuthMiddleware , (req: Request, res: Response)=> {
    res.json({ message: "Access granted", userToken: req.cookies.analyzer });
  });
  

export default router;
