import { 
  object,
  string,
} from 'yup';
import {
  TReqBodyCreateUser,
  TReqBodySignin,
} from './controller';

export const createUserSchema = object<TReqBodyCreateUser>({
  email: string().email('email is not valid').required('email is required'),
  password: string().required('password is required'),
  firstName: string().required('first name is required'),
  lastName:  string().required('last name is required'),
});

export const signinSchema = object<TReqBodySignin>({
  email: string().email('email is not valid').required('email is required'),
  password: string().required('password is required'),
});
