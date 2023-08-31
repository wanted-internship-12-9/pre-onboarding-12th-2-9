import styled from 'styled-components';

export const IssueUl = styled.ul`
  list-style: none;
  max-width: 1200px;
  padding: 0;
  margin: 24px auto;
  border: 1px solid #d0d7deaa;
  border-radius: 6px;
  a {
    text-decoration: none;
    color: black;
  }
  li {
    cursor: pointer;
  }
  li:hover {
    background-color: #d0d7de22;
  }
`;
export const Ad = styled.li`
  border-bottom: 1px solid #d0d7deaa;
  padding: 24px;
  display: flex;
  justify-content: center;
`;
export const IssueLi = styled.li`
  border-bottom: 1px solid #d0d7deaa;
  padding: 24px;
`;

export const Spinner = styled.img`
  display: block;
  margin: 16px auto;
  opacity: 30%;
`;
