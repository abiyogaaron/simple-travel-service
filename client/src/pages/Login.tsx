import React, { FC } from 'react';

import {
  LoginBtn,
  LoginInput,
  LoginLabel,
  LoginWrapper,
  LoginWrapperForm,
  LoginWrapperHeader,
  LoginWrapperSubHeader,
} from './style';
import { ReactComponent as FlightIcon } from '../images/flight_icon.svg';

const Login: FC = () => {
  return (
    <LoginWrapper>
      <FlightIcon/>
      <LoginWrapperHeader>
        Log in to your account
      </LoginWrapperHeader>
      <LoginWrapperSubHeader>
        Hey! We soar you working welcome back!
      </LoginWrapperSubHeader>
      <LoginWrapperForm>
        <LoginLabel>Username</LoginLabel>
        <LoginInput name="username" placeholder="type your username" type="text" />
        <LoginLabel>Password</LoginLabel>
        <LoginInput name="password" placeholder="type your password" type="password" />
        <LoginBtn type="button">
          login
        </LoginBtn>
      </LoginWrapperForm>
    </LoginWrapper>
  );
};

export default Login;
