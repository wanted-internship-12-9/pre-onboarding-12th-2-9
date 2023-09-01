import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 8px;
  padding: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  background-color: #fafbfc;
  color: #586069;
  font-size: 0.9rem;
`;

export const Text = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  strong {
    font-weight: bold;
  }
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  background-color: #fafbfc;
  color: #586069;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background-color: #f6f8fa;
  }
`;
