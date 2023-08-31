import styled from 'styled-components';

export const IssueContainer = styled.div`
  max-width: 1200px;
  padding: 24px;
  margin: 0 auto;
`;

export const IssueHeaderContainer = styled.div`
  border-bottom: 1px solid #d0d7deaa;
  padding-bottom: 16px;
`;
export const IssueBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 24px;
`;
export const IssueBody = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 6px;
  position: relative;

  span {
    display: block;
    border-radius: 6px 6px 0 0;
    background-color: #f6f8fa;
    border-bottom: 1px solid #d0d7de;
    padding: 8px 16px;
    font-weight: bold;
  }
  div {
    padding: 8px 16px;
  }
  ::before {
    content: '';
    position: absolute;
    top: 8px;
    left: -8px;
    border-right: 8px solid #d0d7de88;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`;

export const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100px;
  border: 1px solid #d0d7de;
`;
