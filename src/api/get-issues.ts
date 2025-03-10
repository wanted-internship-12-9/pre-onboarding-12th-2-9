import AxiosFetch from './api';

export const getIssueList = async (org: string, repo: string, page: number) => {
  try {
    const { data } = await AxiosFetch.get(
      `/repos/${org}/${repo}/issues?state=open&sort=comments&page=${page}`,
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getIssueDetail = async (org: string, repo: string, issueNumber: number) => {
  try {
    const { data } = await AxiosFetch.get(`repos/${org}/${repo}/issues/${issueNumber}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getRepository = async (org: string, repo: string) => {
  try {
    const { data } = await AxiosFetch.get(`repos/${org}/${repo}`);
    return data;
  } catch (error) {
    return error;
  }
};
