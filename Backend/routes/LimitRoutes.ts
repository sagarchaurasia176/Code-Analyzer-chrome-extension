import express from 'express';
import { LimitController } from '../controller/LimitController';

export const LimitRouter =  express.Router();

LimitRouter.post('/limit' , LimitController);


