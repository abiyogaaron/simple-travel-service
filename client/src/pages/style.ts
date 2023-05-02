import styled from 'styled-components';
import {
  COLOR,
} from '../constants/style';

interface ILoginWrapper {
  isLoading: boolean;
}

export const LoginWrapper = styled.div<ILoginWrapper>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  filter: ${(p) => (p.isLoading ? 'grayscale(100%)' : 'none')};
`;

export const LoginWrapperHeader = styled.h5`
  font-size: 28px;
  margin: 30px 0 0 0;
  text-align: center;
`;

export const LoginWrapperSubHeader = styled.p`
  font-size: 14px;
  text-align: center;
  color: ${COLOR.GRAY_MEDIUM};
  margin: 10px 0;
`;

export const LoginWrapperForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 20px 0 0 0;
`;

export const LoginLabel = styled.label`
  font-size: 14px;
  color: ${COLOR.GRAY_DARK};
`;

export const LoginInput = styled.input`
  margin: 10px 0;
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid ${COLOR.GRAY_LIGHT};
  border-radius: 7px;
  box-shadow: 0 0 5pt 0.5pt ${COLOR.GRAY_LIGHT};

  &:focus {
    outline-width: 0px;
  }
`;

export const LoginBtn = styled.button`
  background-color: ${COLOR.BLUE_MEDIUM};
  color: ${COLOR.WHITE};
  text-transform: uppercase;
  font-size: 16px;
  padding: 12px;
  border: 1px solid ${COLOR.BLUE_MEDIUM};
  margin: 10px 0;
  cursor: pointer;
  border-radius: 6px;
`;

export const LoginErrorText = styled.p`
  font-size: 12px;
  color: ${COLOR.RED_MEDIUM};
  font-weight: 500;
  text-transform: lowercase;
  margin: 6px 0;
  text-align: center;
`;
