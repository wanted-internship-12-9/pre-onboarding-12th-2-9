import React from 'react';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';

import * as S from './Error.style';
import Header from '../Header';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <>
      <Header />
      <S.Wrapper>
        <ErrorIcon size={80} />
        <S.Text>{message}</S.Text>
        <S.StyledAnchor href="/">홈으로 이동하기</S.StyledAnchor>
      </S.Wrapper>
    </>
  );
};

export default Error;
