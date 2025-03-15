"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitRouter = void 0;
const express_1 = __importDefault(require("express"));
const LimitController_1 = require("../controller/LimitController");
exports.LimitRouter = express_1.default.Router();
exports.LimitRouter.post('/limit', LimitController_1.LimitController);
