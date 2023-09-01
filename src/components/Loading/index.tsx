import React from 'react';

import useBlockScroll from '../../hooks/useBlockScroll';

import * as S from './Loading.style';

const Loading = () => {
  useBlockScroll();
  return (
    <S.LoadingWrapper>
      <S.LoadingContent>데이터를 불러오고 있습니다...</S.LoadingContent>
    </S.LoadingWrapper>
  );
};
export default Loading;
