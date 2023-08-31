// TODO
// 1. 상태 가져오기
// 2. 리듀서 함수 구현
// 3. 액션 타입 설정하기

import { useEffect, useReducer } from 'react';
import { DetailIssueItem } from '../types/issues';
import { getDetailIssue } from '../api/get-issues';
import axios from 'axios';

interface DetailIssueState {
  detailIssue: DetailIssueItem | Record<string, never>;
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
    detailIssue?: DetailIssueItem;
    error?: string | Error;
  };
}

const detailIssueReducer = (state: DetailIssueState, action: Action): DetailIssueState => {
  switch (action.type) {
    case ACTION_TYPE.SUCCESS:
      return {
        ...state,
        isLoading: false,
        detailIssue: action.payload?.detailIssue as DetailIssueItem,
      };
    case ACTION_TYPE.LOADING:
      return { ...state, isLoading: true };
    case ACTION_TYPE.ERROR: {
      return { ...state, error: action.payload?.error as string | Error };
    }
  }
};

const useDetailIssue = (org: string, repo: string, issueNumber: number) => {
  const [state, dispatch] = useReducer(detailIssueReducer, {
    detailIssue: {},
    isLoading: false,
    error: '',
  });

  useEffect(() => {
    const getIssue = async () => {
      dispatch({ type: ACTION_TYPE.LOADING });
      try {
        const detailIssue = await getDetailIssue(org, repo, issueNumber);
        dispatch({
          type: ACTION_TYPE.SUCCESS,
          payload: { detailIssue: detailIssue as DetailIssueItem },
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

export default useDetailIssue;
