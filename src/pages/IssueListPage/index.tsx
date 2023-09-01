import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as S from './IssueListPage.style';
import IssueHeader from '../../components/IssueHeader';
import useIssueList from '../../hooks/useIssueList';
import Spinner from '../../components/Loading/ScrollLoading';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import Loading from '../../components/Loading';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants';

const IssueListPage = () => {
  const { issues, isLoading, isInfiniteLoading, setNextPage } = useIssueList(
    ORGANIZATION_NAME,
    REPOSITORY_NAME,
  );
  const { targetRef } = useInfiniteScroll(setNextPage, issues);

  if (isLoading) return <Loading />;

  return (
    <S.IssueUl>
      {issues.map((issue, index) => {
        return (
          <Fragment key={issue.number}>
            <S.IssueLi>
              <Link to={`/issue/${issue.number}`}>
                <IssueHeader issue={issue} />
              </Link>
            </S.IssueLi>
            {(index + 1) % 4 === 0 && (
              <Link to="https://www.wanted.co.kr/">
                <S.Ad>
                  <img
                    src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
                    alt="광고 이미지"
                  />
                </S.Ad>
              </Link>
            )}
          </Fragment>
        );
      })}
      {isInfiniteLoading ? <Spinner /> : <div ref={targetRef} />}
    </S.IssueUl>
  );
};

export default IssueListPage;
