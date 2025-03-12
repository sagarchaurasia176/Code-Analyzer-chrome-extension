import express, { Request, Response, NextFunction } from "express";
import {
    AuthMiddleware,
  LogoutController,
  UserController,
} from "../controller/UserController";
const router = express.Router();

router.post("/login", UserController); //login 
router.post("/logout", LogoutController); //logout

router.get("/user/profile",AuthMiddleware , (req: Request, res: Response)=> {
    res.json({ message: "Access granted", userToken: req.cookies.analyzer });
});
  

export default router;
