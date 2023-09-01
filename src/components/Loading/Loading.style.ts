import styled from 'styled-components';
export const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
`;

export const LoadingContent = styled.div`
  color: white;
`;
