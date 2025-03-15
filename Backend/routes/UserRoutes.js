"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
// authentiaction routes
router.post("/login", UserController_1.UserController); //login 
router.post("/logout", UserController_1.LogoutController); //logout
exports.default = router;
