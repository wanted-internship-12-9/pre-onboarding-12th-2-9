import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as S from './IssueListPage.style';
import IssueHeader from '../../components/IssueHeader';
import useIssueList from '../../hooks/useIssueList';

const IssueListPage = () => {
  const { issues } = useIssueList('facebook', 'react');

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
    </S.IssueUl>
  );
};

export default IssueListPage;
