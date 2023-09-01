export interface IssueListItem {
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  comments: number;
  created_at: string;
}

export interface IssueDetailItem extends IssueListItem {
  body: string;
}
