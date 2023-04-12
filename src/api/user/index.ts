import express from 'express';
import * as user from './controller';

let userRouter = express.Router();

userRouter.get('/', user.getUser);

export default userRouter;
