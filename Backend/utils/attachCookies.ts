import { Response } from 'express'
import dotenv from 'dotenv';
dotenv.config();

export const attachCookies = (res:Response , token :string)=>{
    res.cookie("analyzer", token, {
        httpOnly: true, // Prevents client-side access (XSS protection)
        secure: process.env.CookiesToken  === "production", // Ensure only works on HTTPS
        sameSite: "lax", // For cross-origin with Chrome extension
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
    });
}