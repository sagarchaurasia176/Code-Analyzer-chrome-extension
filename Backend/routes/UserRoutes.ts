import express, { Request, Response, NextFunction } from "express";
import {
  LogoutController,
  UserController,
} from "../controller/UserController";
export const router = express.Router();

// authentiaction routes
router.post("/login", UserController); //login 
router.post("/logout", LogoutController); //logout



