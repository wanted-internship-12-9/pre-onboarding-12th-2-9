import { useCallback, useEffect, useReducer } from 'react';
import { IssueListItem } from '../types/issues';
import axios from 'axios';
import { getIssueList } from '../api/get-issues';

interface IssueState {
  issues: IssueListItem[] | [];
  isLoading: boolean;
  isInfiniteLoading: boolean;
  error: string | Error;
  currentPage: number;
}

const ACTION_TYPE = {
  SUCCESS: 'SUCCESS',
  LOADING: 'LOADING',
  INFINITE_LOADING: 'INFINITE_LOADING',
  ERROR: 'ERROR',
  NEXT: 'NEXT',
} as const;

interface Action {
  type: (typeof ACTION_TYPE)[keyof typeof ACTION_TYPE];
  payload?: {
    issues?: IssueListItem[];
    error?: string | Error;
  };
}

const issueListReducer = (state: IssueState, action: Action): IssueState => {
  switch (action.type) {
    case ACTION_TYPE.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isInfiniteLoading: false,
        issues: [...state.issues, ...(action.payload?.issues || [])],
      };
    case ACTION_TYPE.LOADING:
      return { ...state, isLoading: true };
    case ACTION_TYPE.INFINITE_LOADING:
      return { ...state, isInfiniteLoading: true };
    case ACTION_TYPE.ERROR:
      return { ...state, error: action.payload?.error || '' };
    case ACTION_TYPE.NEXT:
      return { ...state, currentPage: state.currentPage + 1 };
    default:
      return { ...state };
  }
};

const useIssueList = (org: string, repo: string) => {
  const [state, dispatch] = useReducer(issueListReducer, {
    issues: [],
    currentPage: 1,
    isLoading: false,
    isInfiniteLoading: false,
    error: '',
  });

  const setNextPage = useCallback(() => {
    dispatch({ type: ACTION_TYPE.NEXT });
  }, [dispatch]);

  let flag = true;

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.INFINITE_LOADING });
    const getIssues = async () => {
      if (state.currentPage === 1) dispatch({ type: ACTION_TYPE.LOADING });
      try {
        const issueList = await getIssueList(org, repo, state.currentPage);
        dispatch({
          type: ACTION_TYPE.SUCCESS,
          payload: { issues: issueList as IssueListItem[] },
        });
      } catch (error) {
        if (axios.isAxiosError(error) || error instanceof Error) {
          dispatch({ type: ACTION_TYPE.ERROR, payload: { error: error } });
        }
      }
    };

    if (flag) {
      flag = false;
      getIssues();
    }
  }, [state.currentPage]);

  return {
    ...state,
    setNextPage,
  };
};

export default useIssueList;
