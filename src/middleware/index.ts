// eslint-disable-next-line @typescript-eslint/no-redeclare
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/environment';

import { ECookieNames } from '../types';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log('-------HEADERS------\n', req.headers);
  if (!req.cookies) {
    return res.status(401).json({
      message: 'You are Unauthorized to do this operation', 
    });
  }

  const token = req.cookies[ECookieNames.USER_TOKEN];
  const userId = req.headers['x-user-id'];
  if (!token || !userId) {
    return res.status(401).json({
      message: 'You are Unauthorized to do this operation', 
    });
  }

  const decodedToken = jwt.verify(token, env.jwtSecret) as jwt.JwtPayload;
  if (!decodedToken.id) {
    return res.status(401).json({
      message: 'You are Unauthorized to do this operation', 
    });
  }

  if (decodedToken.id.toString() !== userId) {
    return res.status(403).json({
      message: 'You are Forbidden to do this operation', 
    });
  }
  next();
};
