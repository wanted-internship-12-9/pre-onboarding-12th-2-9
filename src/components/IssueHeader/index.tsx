import React from 'react';

import { GoPerson, GoCalendar, GoComment } from 'react-icons/go';
import { IssueListItem } from '../../types/issues';
import { formatDate } from '../../utils/formatDate';

import * as S from './IssueHeader.style';
interface IIssueHeaderProps {
  issue: IssueListItem;
}

const IssueHeader = ({ issue }: IIssueHeaderProps) => {
  return (
    <>
      {issue && (
        <S.IssueHeaderDiv>
          <h2># {issue.number}</h2>
          <h1>{issue.title}</h1>
          <div>
            <span>
              <GoPerson />
              {issue.user.login}
            </span>
            <span>
              <GoCalendar />
              {formatDate(issue.created_at)}
            </span>
            <span>
              <GoComment />
              {issue.comments}
            </span>
          </div>
        </S.IssueHeaderDiv>
      )}
    </>
  );
};

export default IssueHeader;
