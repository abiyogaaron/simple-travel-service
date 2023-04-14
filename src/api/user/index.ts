import express from 'express';
import * as user from './controller';

let userRouter = express.Router();

userRouter.post('/', user.createUser);
userRouter.post('/signin', user.signin);

export default userRouter;
