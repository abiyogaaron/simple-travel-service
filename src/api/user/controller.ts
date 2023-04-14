import {
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Request,
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Response,
} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { ValidationError } from 'sequelize';

import env from '../../config/environment';
import {
  IRespBody,
} from '../../types';

import User, { 
  IUserCreationAttributes, 
  IUserReturnedAttributes,
} from '../../db/models/users';

import validator from '../../helper/validator';
import { 
  createUserSchema,
  signinSchema,
} from './rule';

export type TReqBodyCreateUser = Omit<IUserCreationAttributes, 'id' | 'createdAt' | 'salt' | 'updatedAt'>;
export type TReqBodySignin = Pick<IUserCreationAttributes, 'email' | 'password'>;

export const createUser = async (
  req: Request<unknown, unknown, TReqBodyCreateUser>, 
  res: Response<IRespBody<IUserReturnedAttributes>>,
) => {
  try {
    const { isValid, errMsg } = await validator(createUserSchema, req.body);
    if (!isValid) {
      return res.status(400).json({ message: errMsg });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const createdUser = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      salt: salt,
    });
    return res.status(201).json({ message: 'user created', data: createdUser.get() });
  } catch (e) {
    console.log('Create User API Error: ', e);

    const err = e as ValidationError;
    const errMsg = err.errors[0].message ? err.errors[0].message : 'There is a problem, please try again later!';
    return res.status(500).json({ message: errMsg });
  }
};

export const signin = async (
  req: Request<unknown, unknown, TReqBodySignin>,
  res: Response<IRespBody<{ userId: string, token: string }>>,
) => {
  try {
    const { isValid, errMsg } = await validator(signinSchema, req.body);
    if (!isValid) {
      return res.status(400).json({ message: errMsg });
    }

    const foundedUser = await User.findOne({ where: { email: req.body.email } });
    if (!foundedUser) {
      return res.status(404).json({ message: `user with email: ${req.body.email} is not registered !` });
    }

    if (!bcrypt.compareSync(req.body.password, foundedUser.password)) {
      return res.status(401).json({ message: 'email or password is incorrect !' });
    }

    /**
     * Produce secure cookie (http cookie)
     */
    const token = jwt.sign(foundedUser.get(), env.jwtSecret, { expiresIn: 60 * 60 });
    const serialized = serialize('T_USER', token, {
      httpOnly: true,
      secure: env.env === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60,
      path: '/',
    });

    return res.status(200)
      .setHeader('Set-Cookie', serialized)
      .json({
        message: 'signin successfully',
        data: {
          token: token,
          userId: foundedUser.id.toString(),
        },
      });
  } catch (e) {
    console.log('Signin API Error: ', e);
    
    const err = e as ValidationError;
    const errMsg = err.errors[0].message ? err.errors[0].message : 'There is a problem, please try again later!';
    return res.status(500).json({ message: errMsg });
  }
};
