import React from 'react';

import { useParams } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';

import { IssueDetailItem } from '../../types/issues';
import IssueHeader from '../../components/IssueHeader';
import Loading from '../../components/Loading';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants';
import useIssueDetail from '../../hooks/useIssueDetail';

import * as S from './IssueDetailPage.style';

const IssueDetailPage = () => {
  const { id: issueNumber = '1' } = useParams();
  const { issueDetail, isLoading, error } = useIssueDetail(
    ORGANIZATION_NAME,
    REPOSITORY_NAME,
    parseInt(issueNumber, 10),
  );

  if (isLoading) return <Loading />;

  if (error) throw error;
  return (
    <S.IssueContainer>
      {Object.keys(issueDetail).length && (
        <>
          <S.IssueHeaderContainer>
            <IssueHeader issue={issueDetail as IssueDetailItem} />
          </S.IssueHeaderContainer>
          <S.IssueBodyContainer>
            <S.Profile src={issueDetail.user?.avatar_url} alt="user image" />
            <S.IssueBody>
              <span>{issueDetail?.user.login}</span>
              <div>
                <MarkdownPreview source={issueDetail.body} />
              </div>
            </S.IssueBody>
          </S.IssueBodyContainer>
        </>
      )}
    </S.IssueContainer>
  );
};

export default IssueDetailPage;
