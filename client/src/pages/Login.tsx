import React, { FC, useCallback, useState } from 'react';
import { 
  useDispatch,
  useSelector,
  shallowEqual,
} from 'react-redux';

import {
  signin,
} from '../redux/slice/users';

import {
  LoginBtn,
  LoginInput,
  LoginLabel,
  LoginWrapper,
  LoginWrapperForm,
  LoginWrapperHeader,
  LoginWrapperSubHeader,
  LoginErrorText,
} from './style';
import { ReactComponent as FlightIcon } from '../images/flight_icon.svg';
import { AppDispatch, RootState } from '../redux/types';

const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector((state: RootState) => state.users.isLoading);
  const error = useSelector((state: RootState) => state.app.error, shallowEqual);

  const [user, setUser] = useState<{ email: string, password: string}>({
    email: '',
    password: '',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as keyof typeof user;

    const newUser = { ...user }
    newUser[name] = value;

    setUser(newUser);
  }, [user]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    await dispatch(signin(user));
  }

  return (
    <LoginWrapper isLoading={isLoading}>
      <FlightIcon/>
      <LoginWrapperHeader>
        Log in to your account
      </LoginWrapperHeader>
      <LoginWrapperSubHeader>
        Hey! We soar you working welcome back!
      </LoginWrapperSubHeader>
      <LoginWrapperForm>
        <LoginLabel>Username</LoginLabel>
        <LoginInput 
          name="email"
          value={user.email}
          placeholder="type your email"
          type="text"
          onChange={handleChange}
          disabled={isLoading}
        />
        <LoginLabel>Password</LoginLabel>
        <LoginInput 
          name="password"
          value={user.password}
          placeholder="type your password"
          type="password"
          onChange={handleChange}
          disabled={isLoading}
        />
        {!!error.message && (
          <LoginErrorText>
            {error.message}
          </LoginErrorText>
        )}
        <LoginBtn 
          type="button" 
          onClick={handleClick}
          disabled={isLoading}
        >
          login
        </LoginBtn>
      </LoginWrapperForm>
    </LoginWrapper>
  );
};

export default Login;
