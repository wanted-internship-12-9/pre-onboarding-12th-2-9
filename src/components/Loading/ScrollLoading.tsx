import React from 'react';
import styled from 'styled-components';

function Spinner() {
  return (
    <SpinnerContainer>
      <img
        src="https://github.com/kimdonggu42/kimdonggu42/assets/115632555/a59ec57f-7f76-4452-a38e-4db0bff8b58e"
        alt="spinner"
      />
    </SpinnerContainer>
  );
}

export default Spinner;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
