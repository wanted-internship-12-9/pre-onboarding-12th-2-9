import { useCallback, useEffect, useReducer } from 'react';
import { IssueListItem } from '../types/issues';
import axios from 'axios';
import { getIssueList } from '../api/get-issues';

interface IssueState {
  issues: IssueListItem[] | [];
  isLoading: boolean;
  error: string | Error;
  currentPage: number;
}

const ACTION_TYPE = {
  SUCCESS: 'SUCCESS',
  LOADING: 'LOADING',
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

const IssueListReducer = (state: IssueState, action: Action): IssueState => {
  switch (action.type) {
    case ACTION_TYPE.SUCCESS:
      return {
        ...state,
        isLoading: false,
        issues: [...state.issues, ...(action.payload?.issues || [])],
      };
    case ACTION_TYPE.LOADING:
      return { ...state, isLoading: true };
    case ACTION_TYPE.ERROR:
      return { ...state, error: action.payload?.error || '' };
    case ACTION_TYPE.NEXT:
      return { ...state, currentPage: state.currentPage + 1 };
    default:
      return { ...state };
  }
};

const useIssues = (org: string, repo: string) => {
  const [state, dispatch] = useReducer(IssueListReducer, {
    issues: [],
    currentPage: 1,
    isLoading: false,
    error: '',
  });

  const setNextPage = useCallback(() => {
    dispatch({ type: ACTION_TYPE.NEXT });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.LOADING });
    const getIssues = async () => {
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
    getIssues();
  }, [state.currentPage]);

  return {
    ...state,
    setNextPage,
  };
};

export default useIssues;
