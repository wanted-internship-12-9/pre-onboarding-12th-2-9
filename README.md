# [ Week 2 ] Github React repository Issue viewer

> **동료학습**을 통해서 팀에서 생각한 원티드 프리온보딩 프론트엔드 인턴십 선발 과제의 **Best Practice**를 만들고 제출해주세요

<img src = https://camo.githubusercontent.com/431cb39804ef7c333ffa8b0dfec7e24581654e84e3c8bcf91f64a43158c3156c/68747470733a2f2f7374617469632e77616e7465642e636f2e6b722f696d616765732f6576656e74732f323930392f62333539313861362e6a7067 />

## 기본 사항

- 배포 링크 : [원티드 프리온보딩 인턴십 12th 9-rae 팀](https://main.d3e37pnqbk9vce.amplifyapp.com/)
- 진행 기간 : 2023.08.29. ~ 2023.09.1.

## 실행 방법

```
$ git clone https://github.com/wanted-internship-12-9/pre-onboarding-12th-2-9.git
$ npm install
$ npm start
```

## 기술 스택

### 개발

<p align="left">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge"> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge"> 
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge"> 
  <img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge">
</p>

### 일관성 있는 코드

<p align="left">
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge"> 
  <img src="https://img.shields.io/badge/esLint-4B32C3?style=for-the-badge"> 
  <img src="https://img.shields.io/badge/husky-273A60?style=for-the-badge">
</p>

## 팀 협업

[Team Convention 정의](https://github.com/wanted-internship-12-9/pre-onboarding-12th-1-9/wiki/Team-Convention)

## 디렉토리 구조

```
📦src
 ┣ 📂api
 ┣ 📂components
 ┃ ┣ 📂Error
 ┃ ┣ 📂ErrorBoundary
 ┃ ┣ 📂Header
 ┃ ┣ 📂IssueHeader
 ┃ ┣ 📂Loading
 ┃ ┗ 📂RouteErrorBoundary
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂IssueDetailPage
 ┃ ┗ 📂IssueListPage
 ┣ 📂routes
 ┣ 📂types
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜index.tsx
```

## Best Practice 선정 과정

- 각자 Assignment별로 구현한 방법과 특이사항 기록하기
- 토의를 통해 Assignment별로 Best Practice를 선정하여 리팩토링



### API / issue 목록 페이지 구현

>issue 목록과 issue 상세 내용을 가져오는 api함수를 구현했습니다.  
>
>`useReducer`훅을 사용해서 목록, 상세내용의 상태를 관리합니다.  
>
>- useIssueList 커스텀 훅
>  - `organization`, `repository` 이름을 인자로 넘겨서 사용할 수 있습니다.
>  - issues : 이슈 목록
>  - isLoading : 이슈 목록을 가져올 때 까지 로딩처리 가능
>  - error : error가 있는 경우에 에러 메세지
>  - setNextPage : 무한 스크롤을 구현할 때 `callback` 함수를 넘겨줘야 하는데 이 함수를 넘겨주면 교차영역에 진입했을 경우 호출 되어서 다음 페이지의 데이터를 가져올 수 있습니다.
>
>```react
>const {issues, isLoading, error, setNextPage} = useIssueList('facebook', 'react')
>```
>
>- useIssueDetail 커스텀 훅
>  - `organization`, `repository`, `issueNumber` 이름을 인자로 넘겨서 사용할 수 있습니다.
>  - detailIssue : 이슈 상세내용 데이터(객체), 객체 내부에 body 프로퍼티가 있고 마크다운 라이브러리 쓰실 때 사용하시면 됩니다.
>  - isLoading : 이슈 상세내용을 가져올 때 까지 로딩처리 가능
>  - error : error가 있는 경우에 에러 메세지
>
>```react
>const {detailIssue, isLoading, error} = useIssueDetail('facebook', 'react', 13991)
>```
>
>- issue 목록, issue 상세 내용 타입 설정
>  - api 호출을 통해서, 얻는 데이터에 불필요한 스킴이 다수 존재하여 사용하는 데이터 스킴만 쓸 수 있도록 타입을 설정했습니다.
>
>```react
>export interface IssueListItem {
>  number: number;
>  title: string;
>  user: {
>    login: string;
>    avatar_url: string;
>  };
>  comments: number;
>  created_at: string;
>}
>
>export interface DetailIssueItem extends IssueListItem {
>  body: string;
>}
>```
>
><img width="559" alt="Screenshot 2023-08-31 at 21 05 41" src="https://github.com/wanted-internship-12-9/pre-onboarding-12th-2-9/assets/68489467/b9701fa3-ec42-4a91-9b2c-0f85c637b1a0"><img width="561" alt="Screenshot 2023-08-31 at 21 05 49" src="https://github.com/wanted-internship-12-9/pre-onboarding-12th-2-9/assets/68489467/5ee5ed33-56ec-4e12-8151-2ffedc7ff431">



### issue 상세 페이지 구현

>디테일 페이지를 구현했습니다.  
>
>`useIssueDetail` 훅을 사용해서 상세 페이지의 데이터를 로드합니다.  
>
>`Header`와 `IssueHeader` 컴포넌트를 구현했습니다.   
>
>`Header`에서의 요청에 사용될 `getRepository`를 구현했습니다.  
>
>Organization과 Repository에 사용되는 이름은 상수처리했습니다.  
>
>- `useIssueDetail`를 그냥 사용하려고 하면 통신이 되지 않는 오류가 발생해 다음과 같이 처리했습니다.
>
>  ```react
>  const IssueDetailPage = () => {
>    const navigate = useNavigate();
>    console.log(navigate);
>    const { id: issueNumber = '1' } = useParams();
>    const { issueDetail } = useIssueDetail(
>      ORGANIZATION_NAME,
>      REPOSITORY_NAME,
>      parseInt(issueNumber, 10),
>    );
>  
>    return (
>      <S.IssueContainer>
>        {Object.keys(issueDetail).length && ( //처리내용
>          <>
>  ```
>
>  처음 issueDetail을 받아왔을때, issueDetail이 빈 객체로 들어오기 때문에 true값이 들어옵니다. 객체가 아예 빈 객체인지 확인하기 위해 `Object.keys(issueDetail).length`로 처리했습니다.
>
><img src="https://user-images.githubusercontent.com/86523545/264834451-04c70779-8e03-4719-91e8-f05806ec2a9a.png" alt="issueDetail" style="zoom:75%;" />



### 에러바운더리(라우팅 및 비동기 에러제어)

>React의 Error Boundary를 사용하여 프로젝트 구간에서 발생하는 에러 처리를 진행했습니다.  
>
>잘못된 route에 따른 Error의 경우 따로 Route Error Boundary를 두고 errorElement로 전달하여 에러 처리하였습니다.  
>
>- ErrorPage를 따로 두고 navigate를 통한 에러 처리에서 Error Boundary와 errorElement를 사용하여 버블링되는 에러를 한 곳에서 처리하게끔 구현하였습니다.
>- 특히, api 통신에 따른 Error Boundary와 잘못된 routing에 대한 Error Boundary를 개별로 처리하는 부분을 많이 고민했습니다.
>  - axios 통신하여 에러 처리를 통해 isError를 받아오게 끔하다보니 에러 버블링이 일어나지 않아 api 통신 에러를 잡아낼 수가 없었습니다. 이를 해결하기 위해 api 통신 Error와 routing에 따른 Error를 구분하여 따로 Boundary를 두어 처리했습니다.
>
>​	<img src="https://user-images.githubusercontent.com/86241737/265012549-9bb4e743-2359-4ab7-b3eb-f68ddfa51d9b.png" alt="error boundary1" style="zoom:15%;" /><img src="https://user-images.githubusercontent.com/86241737/265012765-451bd420-3d0f-49f1-94c0-e8701848254f.png" alt="error boundary2" style="zoom:15%;" />



### 로딩

>`useIssueDetail` 훅에서 반환하는 `isLoading` state를 이용해 `<Loading/>` 컴포넌트를 호출하도록 했습니다.  
>
>`useIssueList` 훅에서 `isInfiniteLoading` 을 반환해, 추후 무한 스크롤 로딩 스피너 구현이 용이하도록 가공했습니다.  
>
>```react
>if (isLoading) return <Loading />; 
>```
>
>를 통해 `Loading` 컴포넌트를 호출하도록 했습니다.
>
>```react
>useEffect(() => {
>   dispatch({ type: ACTION_TYPE.INFINITE_LOADING });
>   const getIssues = async () => {
>     if (state.currentPage === 1) {
>       dispatch({ type: ACTION_TYPE.LOADING });
>     }
>   }
> })
>```
>
> 위와 같이, 만약 currentPage가 1페이지일 경우(첫 호출일 경우)엔 `isLoading`이 토글되고, 이후에 데이터를 새로 페칭(무한스크롤)인 경우엔 `isInfiniteLoading`이 토글됩니다.



### 무한 스크롤 구현

>메인 화면인 IssueListPage에 Infinite Scroll을 적용했습니다.   
>Infinite Scroll 기능은 별도의 custom hook으로 분리했습니다.  
>
>```react
>export const useInfiniteScroll = (callback: () => void, issues: IssueListItem[]) => {
>    const targetRef = useRef(null);
>    const observerOptions = {
>    root: null,
>      rootMargin: '80px',
>      threshold: 0.5,
>      };
>      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
>        if (entries[0].isIntersecting) {
>        callback();
>      }
>      };
>     
>      useEffect(() => {
>      const observer = new IntersectionObserver(handleIntersection, observerOptions);
>    if (targetRef.current) {
>        observer.observe(targetRef.current);
>        }
>        return () => observer.disconnect();
>       }, [issues]);
>    
>      return { targetRef };
>  };
>  ```
>  
>![Sep-01-2023 20-42-24](https://github.com/wanted-internship-12-9/pre-onboarding-12th-2-9/assets/115632555/85d59242-2c1f-47b9-8c85-215384cbd560)



### 기타 사항

#### MarkDown 소스코드 UI처리

> - `react-markdown-preview` 사용