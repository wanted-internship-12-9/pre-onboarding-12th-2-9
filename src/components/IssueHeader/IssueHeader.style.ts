import styled from 'styled-components';

export const IssueHeaderDiv = styled.div`
  h2 {
    font-size: 1rem;
    font-weight: 400;
    color: #888888;
    margin: 0 0 8px 0;
  }
  h1 {
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0 0 8px 0;
  }
  div {
    display: flex;
    gap: 8px;

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9rem;
      color: #888888;
    }
  }
`;
