import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';

import { getIssueDetail } from '../../api/get-issues';
import { IssueDetailItem } from '../../types/issues';
import IssueHeader from '../../components/IssueHeader';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants';

import * as S from './IssueDetailPage.style';

const IssueDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const issueNumber = Number(currentPath.split('/')[2]);
  const [issueDetail, setIssueDetail] = useState<IssueDetailItem>();

  const getIssueDetailData = async () => {
    try {
      const IssueDetailData: IssueDetailItem = await getIssueDetail(
        ORGANIZATION_NAME,
        REPOSITORY_NAME,
        issueNumber,
      );
      setIssueDetail(IssueDetailData);
    } catch (error) {
      navigate('/404');
    }
  };
  useEffect(() => {
    getIssueDetailData();
  }, []);

  return (
    <S.IssueContainer>
      {issueDetail && (
        <>
          <S.IssueHeaderContainer>
            <IssueHeader issue={issueDetail} />
          </S.IssueHeaderContainer>
          <S.IssueBodyContainer>
            <S.Profile src={issueDetail.user.avatar_url} alt="user image" />
            <S.IssueBody>
              <span>{issueDetail.user.login}</span>
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
