import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background-color: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;
export const StyledLink = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  strong {
    font-weight: bold;
  }
`;
export const Logo = styled.img`
  width: 36px;
  border-radius: 100px;
  border: 1px solid #d0d7de;
`;
export const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
