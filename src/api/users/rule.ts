import { 
  object,
  string,
} from 'yup';
import {
  TReqBodyCreateUser,
  TReqBodySignin,
} from './controller';

export const creationUserSchema = object<TReqBodyCreateUser>({
  email: string().strict(true).email('email is not valid').required('email is required'),
  password: string().strict(true).required('password is required'),
  first_name: string().strict(true).required('first name is required'),
  last_name:  string().strict(true).required('last name is required'),
});

export const updateUserSchema = object<TReqBodyCreateUser>({
  email: string().strict(true).email('email is not valid').notRequired(),
  password: string().strict(true).notRequired(),
  first_name: string().strict(true).notRequired(),
  last_name: string().strict(true).notRequired(),
});

export const signinSchema = object<TReqBodySignin>({
  email: string().strict(true).email('email is not valid').required('email is required'),
  password: string().strict(true).required('password is required'),
});
