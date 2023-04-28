import express from 'express';
import * as user from './controller';
import {
  isAuthenticated,
} from '../../middleware';

let userRouter = express.Router();

userRouter.get('/:id', isAuthenticated, user.getUser);
userRouter.post('/', user.createUser);
userRouter.put('/', isAuthenticated, user.updateUser);
userRouter.post('/signin', user.signin);
userRouter.post('/signout', isAuthenticated, user.signout);

export default userRouter;
