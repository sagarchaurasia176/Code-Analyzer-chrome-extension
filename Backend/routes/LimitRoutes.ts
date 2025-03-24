import express from 'express';
import { LimitController } from '../controller/LimitController';

export const LimitRouter =  express.Router();
// limit controller
LimitRouter.post('/limit' , LimitController);


