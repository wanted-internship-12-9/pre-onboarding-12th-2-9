// TODO
// 1. 상태 가져오기
// 2. 리듀서 함수 구현
// 3. 액션 타입 설정하기

import { useEffect, useReducer } from 'react';
import { IssueDetailItem } from '../types/issues';
import { getIssueDetail } from '../api/get-issues';
import axios from 'axios';

interface IssueDetailState {
  IssueDetail: IssueDetailItem | Record<string, never>;
  isLoading: boolean;
  error: string | Error;
}

const ACTION_TYPE = {
  SUCCESS: 'SUCCESS',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
} as const;

interface Action {
  type: (typeof ACTION_TYPE)[keyof typeof ACTION_TYPE];
  payload?: {
    IssueDetail?: IssueDetailItem;
    error?: string | Error;
  };
}

const IssueDetailReducer = (state: IssueDetailState, action: Action): IssueDetailState => {
  switch (action.type) {
    case ACTION_TYPE.SUCCESS:
      return {
        ...state,
        isLoading: false,
        IssueDetail: action.payload?.IssueDetail as IssueDetailItem,
      };
    case ACTION_TYPE.LOADING:
      return { ...state, isLoading: true };
    case ACTION_TYPE.ERROR: {
      return { ...state, error: action.payload?.error as string | Error };
    }
  }
};

const useIssueDetail = (org: string, repo: string, issueNumber: number) => {
  const [state, dispatch] = useReducer(IssueDetailReducer, {
    IssueDetail: {},
    isLoading: false,
    error: '',
  });

  useEffect(() => {
    const getIssue = async () => {
      dispatch({ type: ACTION_TYPE.LOADING });
      try {
        const IssueDetail = await getIssueDetail(org, repo, issueNumber);
        dispatch({
          type: ACTION_TYPE.SUCCESS,
          payload: { IssueDetail: IssueDetail as IssueDetailItem },
        });
      } catch (error) {
        if (axios.isAxiosError(error) || error instanceof Error) {
          dispatch({ type: ACTION_TYPE.ERROR, payload: { error: error } });
        }
      }
    };

    getIssue();
  }, [issueNumber]);

  return { ...state };
};

export default useIssueDetail;
