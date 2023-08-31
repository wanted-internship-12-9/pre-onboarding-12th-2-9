import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ErrorContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 48px;
  margin: 24px auto;
  border: 1px solid #d0d7deaa;
  border-radius: 6px;
  img {
    width: 48px;
  }
`;
export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 16px 60px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    background-color: #d0d7de66;
  }
`;
