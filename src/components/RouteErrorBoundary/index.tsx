import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import Error from '../Error';

const RouteErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <Error message={'페이지를 찾을 수 없습니다.'} />;
    }
    if (error.status === 410) {
      return <Error message={'페이지를 찾을 수 없습니다.'} />;
    }
    if (error.status === 500) {
      return <Error message={'뭔가 문제가 생겼어요!'} />;
    }
  }
  return <Error message={'뭔가 문제가 생겼어요!'} />;
};

export default RouteErrorBoundary;
