import axios from 'axios';
import GITHUB_BASE_URL from '../constants/base-url';

const AxiosFetch = axios.create({
  baseURL: GITHUB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

export default AxiosFetch;
