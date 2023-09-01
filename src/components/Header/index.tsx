import React, { useEffect, useState } from 'react';
import { GoIssueOpened } from 'react-icons/go';

import { getRepository } from '../../api/get-issues';
import { IRepository } from '../../types/repository';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants';

import * as S from './Header.style';

const Header = () => {
  const [repository, setRepository] = useState<IRepository>();
  const getRepositoryData = async () => {
    const repositoryData: IRepository = await getRepository(ORGANIZATION_NAME, REPOSITORY_NAME);
    setRepository(repositoryData);
  };
  useEffect(() => {
    getRepositoryData();
  }, []);
  return (
    <S.Nav>
      <S.StyledLink to="/">
        <S.Logo src={repository?.owner.avatar_url} alt="repository image" />
        <span>{repository?.owner.login}</span> / <strong>{repository?.name}</strong>
      </S.StyledLink>
      <S.Div>
        <GoIssueOpened />
        {repository?.open_issues_count.toLocaleString()} Open
      </S.Div>
    </S.Nav>
  );
};

export default Header;
