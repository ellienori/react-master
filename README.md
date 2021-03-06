# Styled Components
## Setting the project
1. create-react-app으로 프로젝트 생성하기
```bash
$ npx create-react-app react-master
```
2. 그리고 VScode에서 해당 프로젝트 열고 App.js와 index.js 빼고 모두 지우기
3. 그 이후로 서버 실행할 때마다 $ npm start 하면 된다.

## Styled Component
### 설치
```bash
$ npm i styled-components
```
그리고 vscode extension: vscode-styled-components

### 설정
```js
import styled from "styled-components";
```

### 사용
#### Before
```js
<div style={{display: "flex"}}>
  <div style={{backgroundColor: "teal", width: 100, height: 100 }}></div>
  <div style={{backgroundColor: "tomato", width: 100, height: 100 }}></div>
</div>
```

#### After
```js
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <BoxOne />
      <BoxTwo />
    </Father>
  );
}
```
__back tik__ 안에는 __CSS 문법__ 쓰듯이 쓰면 된다.

### Props로 속성 넘기기
```js
const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
      <Box bgColor="tomato" />
    </Father>
  );
}
```

### 확장하기
* Box로 부터 모든 요소를 확장함
```js
const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;
```
## As and Attrs
### As
* 이미 만들어 놓은 컴포넌트를 다른 html로 쓸 때 사용
```js
<Btn>Login</Btn>
<Btn as="a" href="">Login</Btn>
```
* button으로 만든 Btn을 button으로 사용하지 않고 그 스타일만 가져와서 a로 바꿀 수 있다
### Attrs
* Attributes의 줄임말임
* 컴포넌트에 속성을 주고 싶을 때 똑같이 styled를 사용해서 줄 수 있음
#### Before
```js
<Input required minLength=10 />
<Input required minLength=10 />
<Input required minLength=10 />
```
#### After
```js
const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;
```
## Animations and Pseudo selectors
### keyframes
* 애니메이션 쓰려면 styled에서 keyframes라는 함수를 import 해야해
```js
import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
    background-color: yellow;
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Box = styled.div`
  background-color: tomato;
  height: 200px;
  width: 200px;
  animation: ${rotation} 2s linear infinite;
`;
```
### Component 내에 있는 애 스타일 설정하기
* 아래처럼 Box안에 span을 만들었을 떄 span에 대한 스타일 설정을 Box에서 할 수 있어
```js
<Box>
  <span>😁</span>
</Box>
```
* 참고로 span 안의 &:는 span 바깥에서 span:hover 한 거랑 같음
```js
const Box = styled.div`
  background-color: tomato;
  height: 200px;
  width: 200px;
  animation: ${rotation} 2s linear infinite;

  display: flex;
  justify-content: center;
  align-items: center;
  
  span {
    font-size: 40px;
    &:hover {
      font-size: 100px;
    }
  }
`;
```
* 따로 선언한 다음에 안에서 호출할 수도 있어
```js
const Emoji = styled.span`
  font-size: 40px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 3s linear infinite;

  ${Emoji}:hover {
    font-size: 100px;
  }
`;

<Box>
  <Emoji>😁</Emoji>
</Box>
<Emoji>👽</Emoji>
```
그러면 스마일에는 hover 동작하지만 외계인에는 동작하지 않음

## Theme
* theme 설정하려면 우선 index.js에서 app을 __themeprovider__ 로 묶어야 함
```js
import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```
지금 App이 ThemeProvide로 묶여있고 darkTheme이 선택되어 있기 때문에 App.js에서 props로 가져다 쓸 수 있음

```js
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hi</Title>
    </Wrapper>
  );
}
```

# TYPESCRIPT
## What is it?
* JS와 syntax가 같다. + 추가되는 내용
* __strongly-typed__: 프로그래밍 언어가 동작하기 전에 데이터 타입을 확인한다는 의미
```ts
const plus = (a:number, b:number) => a+b;
```

## Project Setting
### 추천 방법
> npm create-react-app my-app --template typescript
새로 프로젝트를 생성하는 것이 좋다.

### 하지만 난 프로젝트 유지해볼래
1. package 설치
```bash
$ npm install -D typescript @types/node @types/react @types/react-dom @types/jest @types/styled-components
```
2. .js -> .tsx extension 변경
3. 처음에는 빨간줄이 많다가 1분 정도 지나면 사라질 겁니다
4. nico github에 있는 소스를 참고해서 tsconfig.json + react-app-env.d.ts 파일을 추가합니다.
5. 서버 재시작

## Prop에 type 설정하기
### interface
* object를 설명해주는 애
* prop types와 다른 점은 proptypes은 코드 실행 후에 잡아주지만 interface는 실행 전에 가르쳐준다.
```tsx
interface ContainerProps {
  bgColor: string
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  bgColor: string
};

function Circle({bgColor}: CircleProps) {
  return (
    <Container bgColor={bgColor}/>
  );
}
```

### 예시
* playerObj의 이름을 받아서 인사하는 함수를 만들자
```tsx
const sayHello = (playerObj) => `Hello, ${playerObj.name}`;
```
* playerObj에 type이 주어지지 않았다고 밑줄이 그어짐
* playerObj를 위한 interface를 만들고 적용하자
```tsx
interface PlayerShape {
  name: string;
  age: number;
}
const sayHello = (playerObj:PlayerShape) => `Hello, ${playerObj.name}`;
```

## interface에 option 주기
### interface에 물음표로 타입 설정
```tsx
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}
```

### 인자가 없으면 default로 배경 색깔과 같아라
```tsx
function Circle({bgColor, borderColor}: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}/>
  );
}
```

### default를 주는 또 다른 방법
* props param 자체에서 줄 수도 있다
```tsx
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({bgColor, borderColor, text = "🐝"}: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}
```

## Typescript and react state
### state 값의 type을 2개로 지정하고 싶을 때
```tsx
const [value, setValue] = useState<number|string>(1);
```

### Form
#### input의 change event의 type
```tsx
const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  const {
    currentTarget: { value }
  } = event;
  setValue(value);
};
```

### form의 submit event의 type
```tsx
const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log(`Hello, ${value}.`);
};
```

## Typescript and styled components theme
### styled.d.ts 생성
* <https://styled-components.com/docs/api#typescript>
* 위의 링크 참고해서 형식 가져온 후 우리한테 맞게 변형
```ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
```

### theme.ts 생성
```ts
import { DefaultTheme } from "styled-components";

export const lightTheme:DefaultTheme = {
  bgColor: "whitesmoke",
  textColor: "black",
  btnColor: "tomato",
}

export const darkTheme:DefaultTheme = {
  bgColor: "black",
  textColor: "whitesmoke",
  btnColor: "teal",
}
```

### index에 themeprovider 적용
```tsx
<ThemeProvider theme={lightTheme}>
  <App />
</ThemeProvider>
```

### app에서 사용
```tsx
const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${props => props.theme.textColor};
`;

function App() {
  return (
    <Container>
      <H1>Protected</H1>
    </Container>
  );
}
```

# CRYPTO TRACKER
## Set up
### 패키지 설치
```bash
$ npm i react-query react-router-dom@5.3.0
$ npm i --save-dev @types/react-router-dom
```
### routes/Coin.tsx and Coins.tsx
* routes 안에 있는 tsx들이 스크린 역할을 한다.
### Router.tsx
```tsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
```
### App.tsx
* Router를 등록한다.
```tsx
import Router from './Router';

function App() {
  return (
    <Router />
  );
}
```

## useParams
* 가져오는 Params 데이터의 타입도 interface로 지정해주어야 한다.
```tsx
interface Params {
  coinId: string;
}
function Coin() {
  const { coinId } = useParams<Params>();
  console.log(coinId);
  return <h1>Coin: {coinId}</h1>;
}
```

## Style
### createGlobalStyle
#### 개념
* 얘는 하나의 컴포넌트를 만들 수 있게 해주는데 렌더링 될 떄 그 컴포넌트는 global scope에 스타일을 올려준다.
* 고립되지 않고 globally

#### 사용
```tsx
const GlobalStyle = createGlobalStyle`
  body {
    color: red;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}
```
* 모든 head에 해당 스타일을 주입한다.

* __Fragment__: 일종의 유령 컴포넌트
```tsx
<></>
```

### reset css 설정
* <https://github.com/zacanger/styled-reset/blob/master/src/index.ts>
* GlobalStyle 방법으로 위의 reset을 적용한다.

### Font
* <https://fonts.google.com>
* Source Sans Pro 폰트
```css
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

body {
  font-family: 'Source Sans Pro', sans-serif;
}
```

### Flat UI Color
* <https://flatuicolors.com/palette/gb>
* 원하는 색을 theme.ts에 입력
* App.tsx의 GolbalStyle에서 사용 가능
```css
body {
  line-height: 1;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
}
```

## Coins.tsx 페이지 다루기
### 코인 데이터 가져오기
#### interface 설정
```tsx
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
```
* interface를 설정한 후에 해당 interface로 데이터 가져오겠다고 설정해야 함
```tsx
const [coins, setCoins] = useState<CoinInterface[]>([]);
```
#### fetch
```tsx
const [coins, setCoins] = useState<CoinInterface[]>([]);
useEffect(() => {
  (async() => {
    const data = await fetch("https://api.coinpaprika.com/v1/coins");
    const json = await data.json();
    setCoins(json.slice(0,100));
  })();
}, []);
```
* useEffect로 데이터 가져올건데 async await 사용한다고 매번 함수 사용하기 귀찮으니 아래 방법을 사용함
1. ```()();```라고 적는다.
2. 앞의 괄호에 async 함수를 넣는다.
```tsx
(async() => {
  
})();
```
3. async 함수 안에 내용을 넣는다.
```tsx
useEffect(() => {
  (async() => {
    fetch("https://api.coinpaprika.com/v1/coins");
  })();
}, []);
```
* json으로 가져오는 array가 너무 길어서 중간에 자르기로 함
```tsx
setCoins(json.slice(0,100));
```

### Link 사용
```tsx
<Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
```
* 코인 이름을 누르면 페이지 이동하게 만듦
* 유저에게 더 편하도록 styled에서 __padding__ 을 a에서 늘리면 (20px 지정) 굳이 이름을 클릭하지 않아도 그 주변에서 클릭 가능
```tsx

```
### behind the scene 1
* 우리에게 이미 데이터(name)가 있는데 link로 id만 넘겨서 또 데이터를 fetch 받아오면 사용자는 loading 페이지만 보고 있어야 하니까 뒤로 데이터를 넘겨주자
```tsx
<Link to={{
  pathname: `/${coin.id}`,
  state: {
    name: coin.name,
  }
}}>
```
## Coin.tsx 페이지 다루기
### behind the scene 2
* Coin.tsx에서는 __useLocation()__ 으로 받는다.
```tsx
interface RouteState {
  name: string;
}
function Coin() {
  const [loading, setLoading] = useState(true);
  const {coinId} = useParams<Params>();
  const {state} = useLocation<RouteState>();
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading.."}</Title>
      </Header>
  // 생략
```
* ```{state?.name || "Loading.."}``` 그 값이 있으면 띄우고 없으면 로딩이라 출력한다.
### detail 데이터 가져오기
* <https://api.coinpaprika.com/v1/coins/btc-bitcoin>
* <https://api.coinpaprika.com/v1/tickers/btc-bitcoin>
```tsx
useEffect(() => {
  (async() => {
    const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    setInfo(infoData);
    setPrice(priceData);
  })();
}, [coinId]);
```

### javascript object의 type 한번에 가져오기
* interface
  + 참고: <https://app.quicktype.io/?l=ts>
```tsx
interface InfoInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoInterface>();
  const [price, setPrice] = useState<PriceInterface>();
  // 중략
  return (
    // 중략
        <Loader>
          <span>{info?.description}</span>
        </Loader>
```

### 데이터 출력하기
* 으쌰으쌰함

### price와 chart
#### Coin.tsx에서 하나씩 보여주고 싶어
```tsx
<Switch>
  <Route path={`/${coinId}/price`}>
    <Price />
  </Route>
  <Route path={`/${coinId}/chart`}>
    <Chart />
  </Route>
</Switch>
```
* 하나씩 보여주고 싶어서 __Swtich__ 사용
* Chart와 Price는 routes 아래에 하나씩 생성

#### 탭 만들기: __useRouteMatch__
* 특정한 URL이 있는지 여부를 알려줌
```tsx
const priceMatch = useRouteMatch("/:coinId/price");
const chartMatch = useRouteMatch("/:coinId/chart");
```
* 안에 입력한 링크에 우리가 들어와 있다면 object를 받는다.

* Tab styled component에 __isActive prop__ 을 추가한다.
  + isActive에 따라 color 값을 다르게 지정
```tsx
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  // 중략
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
```

* Tab
```tsx
<Tabs>
  <Tab isActive={chartMatch !== null}>
    <Link to={`/${coinId}/chart`}>Chart</Link>
  </Tab>
  <Tab isActive={priceMatch !== null}>
    <Link to={`/${coinId}/price`}>Price</Link>
  </Tab>
</Tabs>
```

## React Query
### Setup
#### 설치
> npm i react-query
* react query는 우리가 우리 스스로 실행하고 있었던 로직들을 축약해준다.
#### QueryClient
* index.tsx에 설정한다.
```tsx
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```
* 기존에 있던 ThemeProvide를 QueryClientProvider로 감싸준다.

### routes/api.tsx
* API 관련 함수는 여기에 생성하도록 한다.

### Coin.tsx
> const {isLoading, data} = useQuery(identifier, 함수);
* identifier는 우리가 임의로 unique하게 지정
* 두번째 argument는 함수를 넣는다.
  + 우리가 __fetchCoins__ 라는 함수를 만들었는데 async-await을 쓰지 않고 json promise를 출력하도록 만듦
* 그리고 useQuery는 boolean으로 출력되는 isLoading과 함수의 리턴값을 가지고 온다.
```tsx
const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
```

### ReactQueryDevtools
* App.tsx에 import 하고 사용
```tsx
import { ReactQueryDevtools } from "react-query/devtools";
// 중략
function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}
```
* react query는 데이터를 캐시에 가지고 있다.
* 한번 가져온 데이터는 또 loading 안함

### Coin.tsx 메인
* api.tsx에 관련 function 생성
```tsx
const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));
const loading = infoLoading || tickersLoading;
```
* ```isLoading: infoLoading```라고 쓰면 isLoading라는 값을 infoLoading라고 사용할 수 있다.
* useQuery의 첫번째 인자는 array로 넘어가기 때문에 info와 tickers를 구분하기 위해 array에 coin id도 함께 넘겼다.
* useQuery의 두번째 인자에는 함수를 넣어야하는데 이번에는 __coinId__ 라는 parameter를 넘겨주고 함수 형태를 유지하기 위해 arrow function 형태로 넣었다.

## Chart
### Chart로 coinId 보내기
* props 사용 (Coin.tsx)
```tsx
<Route path={`/:coindId/chart`}>
  <Chart coinId={coinId} />
</Route>
```
* prop 받아오고 interface 설정 (Chart.tsx)
```tsx
interface ChartProps {
  coinId: string;
}

function Chart({coinId}:ChartProps) {
  return <h1>Chart</h1>;
}
```
### api.tsx
```tsx
export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // sec 필요
  const startDate = endDate - (60*60*24*7*2);
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
    .then(res => res.json());
}
```
* endDate: 현재를 세컨드로
* startDate: 현재에서 2주일 전

* 받아온 데이터 Coin.tsx에서 쓰기 위해 interface 설정
```tsx
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({coinId}:ChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return <h1>Chart</h1>;
}
```

### Visualization
#### Setup
> npm install --save react-apexcharts apexcharts
* APEXCHARTS 사용
  + JS chart library
  + <https://apexcharts.com>

* import on Chart.tsx
```tsx
import ApexChart from "react-apexcharts";
```

#### Line chart 그리기
```tsx
<ApexChart
  type="line"
  series={[
    {
      name: "Opening Price",
      data: data?.map((price => price.open)) ?? [],
    },
    {
      name: "Closing Price",
      data: data?.map((price => price.close)) ?? [],
    },
  ]}
  options={{
    chart: {
      height: 300,
      width: 500,
      toolbar: { show: false },
    },
    grid: { show: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { 
        show: false,
        datetimeFormatter: {month: "mmm 'yy"},
      },
      type: "datetime",
      categories: data?.map((price) => price.time_close),
    },
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["teal", "yellow"],
        stops: [0, 100],
      }
    },
    colors: ["orange", "green"],
    tooltip: {
      y: {
        formatter: (value) => `$ ${value.toFixed(2)}`,
      }
    }
  }}/>
```

#### refetch
* 데이터를 계속 업데이트하기 위해서
* Coin.tsx
```tsx
const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(
  ["tickers", coinId],
  () => fetchCoinTickers(coinId),
  { 
    refetchInterval: 5000,
  }
);
```
* useQuery에 세번째 인자로 refetchInterval 함수를 넘겨줄 수 있다. 그러면 5초마다 데이터를 가져온다.

## React helmet
> npm i --save-dev @types/react-helmet
* 브라우저 타이틀을 변경할 수 있다.
```tsx
<Helmet>
  <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
</Helmet>
```

# STATE MANAGEMENT
## Understanding State Management
### LightMode로 바꾸기
* index.tsx의 Themprovider를 App으로 옮김
* theme.tsx에서 darkTheme과 lightTheme 생성 후 App.tsx에서 import
```tsx
function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(cur => !cur);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <button onClick={toggleDark}>Toggle Mode</button>
        <GlobalStyle />
        // 생략
```
### toggleDark를 App.tsx -> Coins.tsx로 보내기
* App.tsx에서 Router를 통해 toggleDark를 보낸다.
```tsx
<Router toggleDark={toggleDark}/>
```
* Router.tsx에서 Interface 등록하고 Coins로 보낸다.
```tsx
nterface IRouterProps {
  toggleDark: () => void;
}

function Router({toggleDark}: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
            <Coin />
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDark}/>
        </Route>
        // 생략
```
* Coins.tsx에서 Interface 생성하고 인자로 받은 다음 사용
```tsx
interface ICoinsProps {
  toggleDark: () => void;
}

function Coins({toggleDark}: ICoinsProps) {
  const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <Title>Coins</Title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDark}>Toggle Mode</button>
      </Header>
      // 생략
```
### Chart도 isDark에 따라 Light/Dark로 변경
* 위와 같은 방법으로 isDark를 -> Coin -> Chart로 보내준다.

## RECOIL
### Understanding Recoil
* ReactJS에서 사용할 수 있는 State management library
* 기존에 recoil이 없으면 이렇게 작업 (심지어 interface 들도)
> App(isDark) -> Router(isDark) -> Coin Screen(isDark) -> Chart(isDark)
* recoil 사용하면 아래처럼 사용 가능
> App <-- (isdark) --> Chart
  + __atom__ 에 value를 저장하고 (여기서는 isDark) 그 atom을 필요한 컴포넌트에 다이렉트로 연결한다.

### Setup
> npm i recoil
* 설치 후 theme 관련으로 생성한 useState 등 제거
* index.tsx에서 ```<RecoilRoot></RecoilRoot>```로 감싼다.

### isDark 연결
#### atoms.ts 생성
```ts
import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
```
* key는 무조건 unique 해야 함

#### App과 atoms 연결
* App.tsx / Chart.tsx
```tsx
const isDark = useRecoilValue(isDarkAtom);
```
* 필요한 곳에 연결하면 된다.

### isDark 값 바꾸기
* Coins.tsx
```tsx
const setIsDark = useSetRecoilState(isDarkAtom);
```
* __useSetRecoilState__ 는 인자로 넘겨준 atom 값을 변경할 수 있는 setter를 리턴한다.
```tsx
<button onClick={() => setIsDark(prev => !prev)}>Toggle Mode</button>
```

## Practice: To Do List (개념 배우기)
### Setup
* App, index, theme만 남기고 모두 삭제
* ToDoList.tsx 생성
  + 되게 복잡하고 귀찮은 코딩을 함 (안쓸거임)
  + form 하나로 이렇게나 긴 코드를 만들어야 함
```tsx
import { useState } from 'react';

function ToDoList() {
  const [toDo, setTodo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setTodo(value);
  };
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    setToDoError("");
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}

export default ToDoList;
```

### React Hook Form
> npm install react-hook-form
* 사용하기 쉬운 유효성 검사를 통해 성능이 뛰어나고 유연하며 확장 가능한 form
```tsx
import { useForm } from "react-hook-form";

const { register, watch, handleSubmit, formState } = useForm();
```

#### register
```tsx
<input {...register("toDo")} placeholder="Write a to do" />
```
* register: __React ref__ 를 return하는 함수
  + ```required```
  + ```maxLength```
  +```pattern```: regx 패턴으로 validation의 기준을 설정
  + 등
* register 함수에 넣는 인자는 __input 함수의 이름__ 이다.
* ```{...register()}```라고 쓰면 register가 반환하는 객체를 input의 props으로 쓸 수 있다.

```tsx
<input {...register("toDo", {required: true, minLength: 10})} placeholder="Write a to do" />
```
* html 요소를 JS로도 관리할 수 있다

#### watch
```tsx
console.log(watch());
```
* watch()를 출력하면 콘솔에 아래처럼 모든 변화를 지켜본다
```bash
{}
ToDoList.tsx:6 {toDo: 'd'}
ToDoList.tsx:6 {toDo: 'da'}
ToDoList.tsx:6 {toDo: 'dan'}
ToDoList.tsx:6 {toDo: 'danc'}
ToDoList.tsx:6 {toDo: 'danci'}
ToDoList.tsx:6 {toDo: 'dancin'}
ToDoList.tsx:6 {toDo: 'dancing'}
```

#### handleSubmit
```tsx
<form onSubmit={handleSubmit(onValid,)}>
```
* form에 handleSubmit을 등록할 수 있다.
  + 첫번째 인자는 값이 유효할 때 실행할 callback 함수 (required)
  + 두번쨰 인자는 값이 유효하지 않을 떄 실행할 callback 함수

#### formState
##### 그냥 formState만 import 했을 때
```tsx
console.log(formState.errors);
```
* formState.errors는 현재 에러에 대한 정보를 보여준다.
* minLength를 지정해놓고 짧게 입력했을 때
```bash
{
  toDo: {type: 'minLength', message: '', ref: input}
}
```
* required인데 아무 것도 입력하지 않았을 때
```bash
{
  toDo: {type: 'required', message: '', ref: input}
}
```
* 에러를 좀 더 자세히 출력 하기 위해 아래처럼 메시지를 설정할 수도 있다.
```tsx
<input {...register("toDo", {
  required: "To Do is required",
  minLength: {
    value: 5,
    message: "You to do is too short."
}})} placeholder="Write a to do" />
```
* __정규식__ 을 사용할 수도 있다.
```tsx
<input {...register("toDo", {
  required: "To Do is required",
  pattern: {
    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
    message: "Only naver.com emails allowed",
  },
  minLength: {
    value: 5,
    message: "You to do is too short."
}})} placeholder="Write a to do" />
```

##### formState: { errors }를 import 했을 때
```tsx
<span>
  {errors?.toDo?.message}
</span>
```

##### defaultValues
* 디폴트 값 입력하기
```tsx
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

function ToDoList() {
  const { register, handleSubmit, formState: { errors }, } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  // 생략
```

##### setError
```tsx
const onValid = (data: IForm) => {
  if(data.password !== data.password1) {
    setError("password1", { message: "Password are not the same. "});
  }
  // setError("extraError", { message: "Server offline" });
};
console.log(errors);
```
* error 출력 가능
* 그 외에 진짜 온갖 거 다 함
  + <https://react-hook-form.com/api/useform/register>

### toDoState (atom)
```tsx
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
```
* atom 만들 때에는 꼭 __unique key__ 가 필요하다

### atom 값 불러오기
* 첫번째 방법
```tsx
const value = useRecoilValue(toDoState);
const modifyFunction = useSetRecoilState(toDoState);
```

* 두번째 방법
```tsx
const [toDos, setToDos] = useRecoilState(toDoState);
```

### interface에서 카테고리 생성 하기
* 선택지 제한 가능
```tsx
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}
```

### setToDos
```tsx
const handleValid = ({ toDo }: IForm) => {
  setToDos((oldToDos) => [
    { text: toDo, id: Date.now(), category: "TO_DO" },
    ...oldToDos,
  ]);
  setValue("toDo", "");
};
```

## Practice: To Do List (다시)
### 리팩토링
#### atoms.tsx에 toDoState 정의
```tsx
import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
```
* 관련 interface도 함께 만들어주고 둘다 export
#### CreateToDo.tsx에 todo 입력하는 form 관련 코드 정리
```tsx
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
  );
}

export default CreateToDo;
```
* toDo 값을 직접 가져올 필요는 없고 Modifyer만 필요하기 때문에 setToDos만 __seSetRecoilState__ 로 생성한다.
#### ToDo.tsx에는 todolist를 출력하는 li 관련 정리
```tsx
import { IToDo } from '../atoms';

function ToDo({text}: IToDo) {
  return (
    <li>{text}</li>
  );
};

export default ToDo;
```
* IToDo interface로 text의 형태를 알려준다

#### ToDoList.tsx는 main
```tsx
import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
```
* ToDo 컴포넌트 불러 올 때 ```<ToDo text={toDo.text} category={toDo.category} id={toDo.id} />``` 이렇게 다 적으면 너무 기니까 ```<ToDo {...toDo} />```라고 적는다.
  + toDos 배열의 toDo 원소 하나하나가 ToDo.tsx의 ToDo 컴포넌트에 필요한 props와 같은 모양이기 때문이다. (IToDo interface)

### ToDo.tsx 기능 추가
#### 1차 설계
```tsx
function ToDo({text, category}: IToDo) {
  const onClick = (newCategory : IToDo["category"]) => {

  }
  return (
    <li>
      <span>{text}</span>
      {category !== "DONE" && <button onClick={() => onClick("DONE")}>Done</button>}
    </li>
```
* 각 todo 마다 버튼을 생성해서 버튼을 누르면 category의 값이 바뀐다.
* 버튼에 onClick에 화살표 함수를 호출해서 그 안에 생성한 onClick 함수를 넣은 이유는 category 인자를 넘겨주기 위해서
* 우리가 생성한 onClick 함수에 newCategory 파라미터에 타입이 IToDo의 category랑 같다는 것을 알려줌

### 2차 설계
* 버튼의 onClick에 onClick 함수를 넣어주고 인자를 받아오지 않는 대신 버튼에 name을 줘서 구분한다.
```tsx
{category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>To Do</button>}
```

* ToDo의 버튼을 클릭할 때 어떤 ToDo 인지 정보를 알고 싶다 => targetIndex
```tsx
const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
  const name = event.currentTarget.name;
  setToDos(oldToDos => {
    const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
    const oldToDo = oldToDos[targetIndex];
    const newToDo = {text, id, category: name as any};
    console.log(oldToDo, newToDo);
    return [
      ...oldToDos.slice(0, targetIndex),
      newToDo,
      ...oldToDos.slice(targetIndex + 1),
    ];
  });
}
```
  + newToDo를 생성할 때 text와 id는 그대로지만 category는 button name을 가져온다.
  + return 할 때 앞 뒤 값 중간에 새 값을 넣는다.

### Selectors
* a piece of derived state
  + derived state: the output of passing state to a pure function
* atom의 output을 변형시키는 도구
* state를 가져다가 조금 변형해주는 함수

#### Selector function
* atoms.tsx 보면 하나의 state로 3가지의 카테고리를 다루고 있다.
* 근데 그렇다고 아톰을 3개나 만들고 싶지는 않아서 selector를 사용할 거다.

##### 예시1 toDoList length 반환 하기
* atoms.ts
```tsx
export const toDoSelector = selector({
  key: "ToDoSelector",
  get: ({get}) => {
    return "hello";
  },
});
```
* selector에는 __key__ 와 __get 함수__ 가 필요하다.
  + get 함수는 selector가 무슨 값을 반환할지 결정
  + get 함수의 인자로 들어오는 {get}은 atom을 get 해오는 것
* 그런데 왜 get을 ```{get}```으로 받아올까?
  + options.get을 가져오기 때문에 options 생략한 거임

* ToDoList.tsx
```tsx
const selectorOutput = useRecoilValue(toDoSelector);
console.log("🐝", selectorOutput);
```
* __useRecoilValue__ 를 사용해서 값을 가져올 수 있다.
* atom 값이 바뀌면 selectorOutput도 바뀐다.

##### 예시2 category 출력
* atoms.ts
```tsx
export const toDoSelector = selector({
  key: "ToDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState);
    return [toDos.filter((todo) => todo.category === "TO_DO"),
    toDos.filter((todo) => todo.category === "DOING"),
    toDos.filter((todo) => todo.category === "DONE")];
  },
});
```
  + 배열 안에 각각의 배열을 넣어준다.
* ToDoList.tsx
```tsx
const [toDos, doings, dones] = useRecoilValue(toDoSelector);
return (
  <div>
    <h1>To Dos</h1>
    <hr />
    <CreateToDo />
    <h2>To Do</h2>
    <ul>
      {toDos.map((task) => (
        <ToDo key={task.id} {...task} />
      ))}
    </ul>
    <hr />
    <h2>Doing</h2>
    <ul>
      {doings.map((task) => (
        <ToDo key={task.id} {...task} />
      ))}
    </ul>
    <hr />
    <h2>Done</h2>
    <ul>
      {dones.map((task) => (
        <ToDo key={task.id} {...task} />
      ))}
    </ul>
  </div>
);
```
* 배열 값을 각각 출력하여 해당하는 카테고리에 해당 값만 출력한다.

#### One by one
* 저렇게 한번에 세 개 다 보여주는 것보다 하나씩 보여주자.
* atom.ts
```ts
export const categoryState = atom<"TO_DO" | "DOING" | "DONE">({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "ToDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
```
* ToDoList.tsx
```tsx
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    setCategory(value);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value="{category}" onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
```

* to do 입력할 때 무조건 TO_DO로 들어가는 데 그걸 수정하고 싶다.
* CreateToDo.tsx
```tsx
const category = useRecoilValue(categoryState);
const { register, handleSubmit, setValue } = useForm<IForm>();
const handleValid = ({ toDo }: IForm) => {
  setToDos((oldToDos) => [
    { text: toDo, id: Date.now(), category },
    ...oldToDos,
  ]);
```
  + category 추가

### Enums
* atoms.ts에 생성해서 전체에서 ```Categories.TO_DO``` 처럼 쓴다.
```tsx
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
```
  + 값을 지정해주지 않으면 0, 1, 2, ... 로 자동 할당 된다.

# TRELLO CLONE
## Understanding Selectors
### Get selectors
* atoms.ts
```tsx
import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector({
  key: "hours",
  get: ({get}) => {
    const minutes = get(minuteState);
    return minutes / 60;
  }
})
```
* App.tsx
```tsx
import { useRecoilValue, useRecoilState } from 'recoil';
import { hourSelector, minuteState } from './atoms';

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event:React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  }
  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder='Minutes' />
      <input value={hours} type="number" placeholder='Hours' />
    </div>
  );
}

export default App;
```
* ```setMinutes(+event.currentTarget.value);```에서 +를 붙인 이유는 value(string)를 number로 변환하기 위해서
* __selector의 get__ 은 state의 값을 가지고 올 수 있다.

### Set selectors
* atoms.ts
```tsx
export const hourSelector = selector<number>({
  key: "hours",
  get: ({get}) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({set}, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  }
})
```
* __set 함수__ 는 state를 set 하게 함, atom 수정하는 걸 도와줌
* ```const [hours, setHours] = useRecoilState(hourSelector);```의 setHours는 selector의 set 함수를 불러온다.

## Drang and Drop
### Set up
#### 설치
```bash
npm i react-beautiful-dnd
npm i --save-dev @types/react-beautiful-dnd
```
#### 참고
<https://www.npmjs.com/package/react-beautiful-dnd>
<https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/about/installation.md>

### DragDropContext
* App.tsx
```tsx
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {

  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>hello</div>
    </DragDropContext>
  );
}

export default App;
```
* 우리 앱 전체에 적용: 필요한 부분에만 하면 되는데 우리는 전체에 할 거야
* 필수로 가져야하는 것
  + ```onDragEnd```: Drag가 끝났을 때 실행되는 함수
  + ```<span>hellow</span>```: children이 꼭 필요함

### Understanding Draggable and Droppable
* Draggable: 드래그 할 수 있는 요소
* Droppable: 드래그 한 요소를 내려 놓을 수 있는 곳
#### Droppable
```tsx
<div>
  <Droppable droppableId="one">
    {() => <ul></ul>}
  </Droppable>
</div>
```
* 무조건 ```droppableId```가 있어야 하고 children은 함수 형태여야 한다.

#### Understanding Draggable
```tsx
<Droppable droppableId="one">
  {() => (
    <ul>
      <Draggable draggableId="first" index={0}>
        {() => <li>One</li>}
      </Draggable>
      <Draggable draggableId="second" index={1}>
        {() => <li>Two</li>}
      </Draggable>
    </ul>
  )}
</Droppable>
```
* 무조건 ```draggableId```와 ```index```를 가져야 하고 children은 함수 형태여야 한다.

### Props
#### Droppable
```tsx
<Droppable droppableId="one">
  {(provided) => (
    <ul ref={provided.innerRef} {...provided.droppableProps}>
```
* ```provided```를 프롭으로 가져와서 ```...provided.droppableProps```를 적용함
  + inspect로 봤을 때 새로운 props이 생겨있음
    ```html
    <ul data-rbd-droppable-id="one" data-rbd-droppable-context-id="1"><li>One</li><li>Two</li></ul>
    ```

### Draggable
```tsx
<ul ref={provided.innerRef} {...provided.droppableProps}>
  <Draggable draggableId="first" index={0}>
    {(magic) => (
      <li ref={magic.innerRef} 
        {...magic.draggableProps} 
        {...magic.dragHandleProps}>
        One
      </li>
    )}
  </Draggable>
  <Draggable draggableId="second" index={1}>
    {(magic) => (
      <li ref={magic.innerRef} 
        {...magic.draggableProps} 
        {...magic.dragHandleProps}>
        Two
      </li>
    )}
  </Draggable>
</ul>
```
* 얘도 Droppable이랑 비슷하게 prop을 받아온다. 여기서는 ```magic```
  + ```dragHandleProps```와 ```dragHandleProps```가 있다.
* ```...magic.draggableProps```는 props 받아오는 걸 의미
  + inspect로 살펴볼 수 있음
* ```...magic.dragHandleProps```는 이 li가 핸들링하는데에 트리거 된다는 걸 의미
```tsx
<li ref={magic.innerRef} 
  {...magic.draggableProps}>
  <span {...magic.dragHandleProps}>🐝</span>
  One
</li>
```
* One 글자에서는 요소를 핸들링할 수 없고 벌로만 핸들링 할 수 있다.

### Style
* theme.ts 수정 -> styled.d.ts 수정
* index.tsx에서도 없어진 props 수정해야함
  + textColor를 black으로 변경

### Board and Card
* App.tsx
```tsx
const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const toDos = ["a", "b", "c", "d", "e", "f"];
```
* 그리고 return에 생성했던 ```ul```을 ```Board```로 ```li```을 ```Card```로 변경한다.
* Wrapper -> Boards -> Board -> Card 순으로 감싼다.

```tsx
<Droppable droppableId="one">
  {(provided) => (
    <Board ref={provided.innerRef} {...provided.droppableProps}>
      {toDos.map((toDo, index) => (
        <Draggable draggableId={toDo} index={index}>
          {(magic) => (
            <Card
              ref={magic.innerRef}
              {...magic.dragHandleProps}
              {...magic.draggableProps}
            >
              {toDo}
            </Card>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </Board>
  )}
</Droppable>
```
* ```<Board></Board>```의 끝에 ```{provided.placeholder}```를 추가하면 ```Card```를 Drag로 밖으로 빼도 ```Board```의 사이즈가 그대로 유지된다.

## atom
* atoms.ts
```ts
import { atom } from "recoil";

export const toDoState = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"],
});
```
  + ```const toDos = ["a", "b", "c", "d", "e", "f"];```를 atoms.ts로 옮겨 ```toDoState```를 생성한다.

* App.tsx에서 위에서 생성한 atom을 부르기 위해 ```const [toDos, setToDos] = useRecoilState(toDoState);```를 추가한다.

## onDragEnd
```tsx
const onDragEnd = ({draggableId, destination, source}: DropResult) => {
  if (!destination) {
    // 같은 자리에 내려 놓을 수도 있으니까
    return;
  }
  setToDos((oldToDos) => {
    const copyToDos = [...oldToDos];
    // 1) Delete item on source.index
    copyToDos.splice(source.index, 1);
    // 2) Put back the item on the destination.index
    copyToDos.splice(destination?.index, 0, draggableId);
    return copyToDos;
  });
};
```
* source index를 지우고 걔를 destination에 넣는다.
```tsx
<Draggable key={toDo} draggableId={toDo} ....
```
  + ```Draggable```에서 ```key```와 ```draggableId```의 값은 같아야 한다.
## Components/DraggableCard.tsx
* DraggableCard 생성 후 props도 넘겨주고 interface도 생성하고 등등

## 개선 => React Memo
* DraggableCard 하나를 옮길 때마다 스쳐가는 모든 DraggableCard가 렌더링 된다. -> 깜빡깜빡 거림
* __React Moemo__ 한테 prop이 바뀌지 않는다면 컴포넌트를 렌더링하지 말라고 말해주자
* DraggableCard.tsx
```tsx
export default React.memo(DraggableCard);
```

## Multi Boards
* 보드 여러 개로 세팅 하자
### atoms.ts
```ts
import { atom } from "recoil";

interface IToDoStage {
  [key: string]: string[];
}

export const toDoState = atom<IToDoStage>({
  key: "toDo",
  default: {
    "To Do": ["Cycling", "Dancing", "Reading"],
    "In Progress": ["Studying", ],
    "Done": ["Sleeping", "Running", ],
  },
});
```
* Components/Board.tsx 도 세팅 함

### App.tsx
* __onDragEnd()__ 를 새로 설정해야 함
  + atom 값이 원래 array였다가 obj로 바뀌었기 때문에 바꿔야 함
  + board가 같을 경우, 다를 경우 구분해서 수정해야 함
```tsx
const onDragEnd = ({draggableId, destination, source}: DropResult) => {
  if (!destination) {
    // 같은 자리에 내려 놓을 수도 있으니까
    return;
  }
  if (destination?.droppableId === source.droppableId) {
    // same board movement.
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[source.droppableId]];
      boardCopy.splice(source.index, 1);
      boardCopy.splice(destination?.index, 0, draggableId);
      return {
        ...allBoards,
        [source.droppableId]: boardCopy,
      };
    });
  } else {
    // cross board movement
    setToDos((allBoards) => {
      const sourceBoardCopy = [...allBoards[source.droppableId]];
      const destinationBoardCopy = [...allBoards[destination.droppableId]];
      sourceBoardCopy.splice(source.index, 1);
      destinationBoardCopy.splice(destination?.index, 0, draggableId);
      return {
        ...allBoards,
        [source.droppableId]: sourceBoardCopy,
        [destination.droppableId]: destinationBoardCopy
      };
    });
  }
};
```

## Droppable Snapshot
* 카드를 옮길 때 보드 색을 바꾸고 범위도 늘리기
  + 범위 늘릴 때 ```flex-grow: 1;``` 추가
```tsx
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
```
* 원래는 색 바꿀 때 ```a ? b : c```로 여러 색을 넣었는데 나는 transparent가 좋아서 ```background-color: "transparent";```로 줄임

## reference
* 우리의 react 코드를 이용해 html 요소를 지정하고 가져올 수 있는 방법
  + 예전에 vanila js 사용할 때 ```a.click()```이나 ```video.play()``` 사용했잖아.
  + reference는 react JS componenet를 통해서 HTML 요소를 가지고 올 수 있게 해준다.
```tsx
export function Board ({toDos, boardId}: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {};
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input ref={inputRef} placeholder="grab me" />
      <button onClick={onClick}>click me</button>
      <Droppable droppableId={boardId}>
      {(provided, info) => (
      // 생략
```
* ```<input ref={inputRef}```에 ref를 추가함으로써 우리는 input에 대한 접근을 할 수가 있다.
  + ```document.getElementById``` 같은 거야

## toDo 입력 받기
### Set up Form
* react-hook-form에서 useForms 사용
* Board.tsx
```tsx
import { useForm } from "react-hook-form";

const Form = styled.form`
  width: 100%;
`;

interface IForm {
  toDo: string;
}

export function Board ({toDos, boardId}: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({toDo}:IForm) => {
    setValue("toDo", "");
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input 
          {...register("toDo", { required: true })}
          type="text" placeholder={`Add task on ${boardId}`} />
      </Form>
```
  1. Form styled 생성
  2. IForm 생성
  3. useForm import 후 ```register```, ```setValue```, ```handleSubmit``` 호출
  4. ```<Form></Form>``` 생성 후 ```...register``` 등록, onSubmit 함수 등록

### Set up Atoms
* toDo가 어떻게 생길지 새로 디자인 하자
* Before
```tsx
interface IToDoStage {
  [key: string]: string[];
}
```
* After
```tsx
interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    "In Progress": [],
    "Done": [],
  },
});
```
* IToDoState는 기존에 그냥 string array 였으나 이제 IToDo 오브젝트를 가지는 array가 됨
* 따라서 기존에 string array 였던 toDoState도 빈 배열로 바꿈
* 그리고 나서 String을 렌더링하고 있던 앱 여기저기를 고쳐야 함

### Board.tsx
```tsx
export function Board ({toDos, boardId}: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({toDo}:IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo
    };
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [
          newToDo,
          ...allBoards[boardId]
        ]
      }
    })
    setValue("toDo", "");
  }
```
* ```useSetRecoilState(toDoState)```는 atom에 있는 ```toDoState```의 Setter를 가져오는 것

# ANIMATIONS
## What is Framer Motion
### 설치
* reactJS library
```bash
npm install framer-motion
```

### 사용
* App.tsx
```tsx
import { motion } from "framer-motion";

function App() {
  return (
    <Wrapper>
      <Box />
      <div></div>
      <motion.div></motion.div>
    </Wrapper>
  );
}
```
* motion을 사용하기 위해서는 ```<motion.div></motion.div>```처럼 앞에 ```motion.```을 달아줘야 한다.
* 그냥 ```<div></div>```로 하면 framer 사용 불가

## Styled component를 motion 해보자
* App.tsx
```tsx
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  return (
    <Wrapper>
      <Box
        animate={{ borderRadius: "100px" }}
        transition={{ duration: 3 }} />
    </Wrapper>
  );
}
```
* 3초 동안 원이 되는 animation
* ```Box```를 생성할 때 ```styled(motion.div)```로 생성 한 다음 ```animate```나 ```transition```과 같은 prop을 보내준다.

## example 도장 꺠기
### First: Animation
```tsx
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  return (
    <Wrapper>
      <Box
        initial= {{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
        transition={{ delay: 0.5 }} />
    </Wrapper>
  );
}
```

### Second: Variants
* 코드를 깔끔하게 해주고 애니메이션을 연결해준다
```tsx
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgb(255, 255, 255, 0.2);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 75px;
  width: 75px;
  place-self: center;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
}
```
* ```variants``` prop을 사용
* ```Box```랑 ```Circle```에 ```variants```만 지정해주고 ```start```와 ```end```는 이름이 똑같으니까 따로 지정 안해줌

### Third: Gestures
* 마우스 상태에 따른 몇몇 이벤트를 리스닝 하는 법
```tsx
function App() {
  return (
    <Wrapper>
      <Box 
        whileHover={{scale: 1.5, rotateZ: 90 }} 
        whileTap={{ scale: 1, borderRadius: "100px"}} >
      </Box>
    </Wrapper>
  );
}
```
* ```whileHover```와 ```whileTab```이라는 prop 배움
* 그런데 Variatns를 쓸거야
```tsx
const boxVariants = {
  hover: {
    scale: 1.5, rotateZ: 90
  },
  click: {
    scale: 1, borderRadius: "100px"
  }
};

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} whileHover="hover" whileTap="click" >
      </Box>
    </Wrapper>
  );
}
```

### Forth: Drags
* 우선 속박 없는 드래그
```tsx
<Box drag whileDrag={{backgroundColor:"rgb(255, 236, 130)"}} />
```
  + ```drag```를 사용하면 바로 드래그 할 수 있다.
* 예제처럼 속박하기
  + ```ref```: 내 코드로 특정 element를 잡을 수 있는 방법
```tsx
const BiggerBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box 
          drag dragConstraints={biggerBoxRef}
          dragSnapToOrigin
          dragElastic={0.5}
          whileDrag={{backgroundColor:"rgb(255, 236, 130, 0.4)"}} />
      </BiggerBox>
    </Wrapper>
  );
}
```

### Fifth: Scroll
#### Motion Value
* 애니메이션의 수치를 트래킹 할 때 필요
  + 좌표 등
  + ```const x = useMotionValue(0);``` 생성
* 그런데 이 값이 변경된다고 rendering 하지 않기 때문에 ```console.log```로 못찍어
  + 그래서 ```useEffect```를 사용
```tsx
function App() {
  const x = useMotionValue(0);
  useEffect(() => {
    x.onChange(() => console.log(x.get()))
  }, [x]);
  return (
    <Wrapper>
      <button onClick={() => x.set(200)} >click me</button>
      <Box drag="x" dragSnapToOrigin
        style={{x}} />
    </Wrapper>
  );
}
```

#### useTransform
* usetransform 사용해서 input, output을 주고 value를 조절할 수 있다.
```tsx
function App() {
  const x = useMotionValue(0);
  const potato = useTransform(x, [-400, 0, 300], [1.8, 1, 0.1]);
  useEffect(() => {
    potato.onChange(() => console.log(potato.get()))
  }, [x]);
  return (
    <Wrapper>
      <Box drag="x" dragSnapToOrigin
        style={{x, scale:potato}} />
    </Wrapper>
  );
}
```

* 굴리기도 가능
```tsx
function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-300, 300], [-360, 360]);
  useEffect(() => {
    rotateZ.onChange(() => console.log(rotateZ.get()))
  }, [x]);
  return (
    <Wrapper>
      <Box drag="x" dragSnapToOrigin
        style={{x, rotateZ}} />
    </Wrapper>
  );
}
```

* 배경 색깔 바꾸기
```tsx
const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-300, 300], [-360, 360]);
  const gradient = useTransform(x, [-300, 300], 
    [
      "linear-gradient(135deg,#BAD7DF,#FFE2E2)",
      "linear-gradient(135deg,#BAABDA,#FFD384)"
    ]);
  return (
    <Wrapper style={{background: gradient}}>
      <Box drag="x" dragSnapToOrigin
        style={{x, rotateZ}} />
    </Wrapper>
  );
}
```

#### useViewportScroll
* 값 찍어보기
```tsx
useEffect(() => {
  scrollY.onChange(() => {
    console.log(scrollY.get(), scrollYProgress.get());
  });
}, [scrollY, scrollYProgress]);
```
* example
```tsx
import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect } from 'react';

const Wrapper = styled(motion.div)`
  height: 300vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-300, 300], [-360, 360]);
  const gradient = useTransform(x, [-300, 300], 
    [
      "linear-gradient(135deg,#BAD7DF,#FFE2E2)",
      "linear-gradient(135deg,#BAABDA,#FFD384)"
    ]);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  return (
    <Wrapper style={{background: gradient}}>
      <Box drag="x" dragSnapToOrigin
        style={{x, rotateZ, scale}} />
    </Wrapper>
  );
}

export default App;
```

### Sixth: Path
#### SVG font
* Airbnb
<https://fontawesome.com/v5.15/icons/airbnb?style=brands>

#### path
```tsx
const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const svg = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    fill: "rgba(255, 255, 255, 1)",
    pathLength: 1,
  },
};

function App() {
  return (
    <Wrapper>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          transition={{
            default: { duration: 5 },
            fill: { duration: 1, delay: 3 },
          }}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>
    </Wrapper>
  );
}
```

## AnimatePresence
### Understanding AnimatePresence
* React JS App에서 사라지는 Component를 Animate 함
* ```<AnimatePresence></AnimatePresence>``` 안 쪽에 나타나거나 사라지는 게 있다면 그것을 animate 하게 도와준다.
* 참고로 AnimatePresence는 바깥 쪽으로 빠져야지 ```{}``` 안으로 들어가면 안된다. 항상 __visible__ 해야 한다.
```tsx
const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    x: 200,
  }
};

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing(prev => !prev);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>Click</button>
      <AnimatePresence>{showing ? (
        <Box variants={boxVariants} 
          initial="initial" 
          animate="visible" 
          exit="leaving" />
      ) : null}</AnimatePresence>
    </Wrapper>
  );
}
```

### Slider
#### Custom
* variants에 데이터를 보낼 수 있게 해주는 property
* ```<Box custom={}>``` 이런 식으로 사용할 수 있다.
  + ```<AnimatePresence custom={}>```에도 넣어야 함
* custom을 적용하기 위해서는 variants를 함수 형태로 바꿔야 함

#### variants 함수 형태
* Before
```tsx
entry: {
  x: 100,
  opacity: 0,
  scale: 0
}
```
* After
```tsx
entry: (back: boolean) => ({
  x: back ? -100 : 100,
  opacity: 0,
  scale: 0
})
```

## Layout Animation
### Understanding Layout
* __layout__ 이라는 prop을 element에게 주면 그 element의 layout이 바뀔 때 자동으로 animate 된다.
* ```<Circle layout />``` 이렇게 해당하는 element(compoenent)에 ```layout```이라고 넣어준다.
* 클릭할 때마다 파란 공의 css가 animate 됨
```tsx
const Box = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);
  return (
    <Wrapper onClick={toggleClicked}>
      <Box style={{
        justifyContent: clicked ? "center" : "flex-start",
        alignItems: clicked ? "center" : "flex-start"
      }}>
        <Circle layout />
      </Box>
    </Wrapper>
  );
}
```

### layoutId
* 같은 layoutId를 주면 서로 다른 Component라도 같이 묶어서 animate 해준다.
```tsx
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 70px;
  width: 70px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);
  return (
    <Wrapper onClick={toggleClicked}>
      <Box>
        {!clicked ? <Circle layoutId="circle" style={{borderRadius: 50}} /> : null}
      </Box>
      <Box>
        {clicked ? <Circle layoutId="circle" style={{borderRadius: 0, scale: 1.5}} /> : null}
      </Box>
    </Wrapper>
  );
}

export default App;
```

### layoutId 확장
* 클릭하는 버튼의 id를 넘겨서 Grid 안에 있는 Box와 Overlay 안에 있는 Box가 꼭 같은 것처럼 보이게 함
```tsx
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 80vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.5);
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box onClick={() => setId(n)} key={n} layoutId={n} />
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
```

# NOMFLIX CLONE
## Project Setup
* Routes
  + Home.tsx
  + Search.tsx
  + Tv.tsx
* Components
  + Header.tsx
* App.tsx
  + Route 선언할 때 ```/```를 제일 아래 쪽에 넣어줘야 한다.
```tsx
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from './Routes/Home';
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
```

## Header.tsx
### Template
* Nav 안에 Col이 2개가 있고
  + 첫번째 Col에는 Logo와 메뉴(Items)가 있다.
    + Items 안에 두 개의 Item(Home/Tv Shows)이 있음
  + 두번째 Col는 Search가 있다.
* Header.tsx
```tsx
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;

function Header() {
  return (
    <Nav>
      <Col>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items>
          <Item>Home</Item>
          <Item>Tv Shows</Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"></path>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
```

### Logo Animation
* Netflix 로고에 path animation을 주고 싶다.
* framer-motion 사용
* Logo 선언할 때 ```styled.svg``` -> ```styled(motion.svg)```
* Logo 사용할 때 ```<path d="어쩌구">``` -> ```<motion.path d="어쩌구">```
* logoVariants 생성 후 ```normal```과 ```active``` 선언해서 ```whileHover``` 사용

```tsx
import { motion } from "framer-motion";

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity
    }
  },
}

// 중략

<Logo
  variants={logoVariants}
  whileHover="active"
  initial="normal"
  xmlns="http://www.w3.org/2000/svg"
  width="1024"
  height="276.742"
  viewBox="0 0 1024 276.742"
>
```

### Item Animation
* 마우스 커서 위치를 알 수 있도록 메뉴 위에서 동그라미가 움직이면 좋겠다.
  + Item에 ```position: relative;``` 추가
  + Circle component 생성 후 Item 안에 넣기
* Item을 Link로 만들기
  + import Link
  + 기억 더듬기. 왜 ```<a></a>``` 안쓰고 ```<Link></Link>```를 쓰는 거지? 우리는 페이지를 이동하려는 게 아니니까! 도메인은 그래도 있으니까!
  + Item 안에 Link 넣기
* ```useRouteMatch``` 사용해서 homeMatch와 tvMatch로 Circle 출력하기
  + layoutId로 Animation 연결
```tsx
import { Link, useRouteMatch } from "react-router-dom";

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

// 중략

<Item>
  <Link to="/">
    Home {homeMatch?.isExact && <Circle layoutId="circle" />}
  </Link>
</Item>
<Item>
  <Link to="/tv">
    Tv Shows {tvMatch && <Circle layoutId="circle" />}
  </Link>
</Item>
```

### Search Animation
* 돋보기 누르면 검색창이 나오게
* useState 사용 ```openSearch()```
* useAnimation 사용 ```Animation.start```
```tsx
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

// 중략
const [searchOpen, setSearchOpen] = useState(false);
const inputAnimation = useAnimation();
const toggleSearch = () => {
  if(searchOpen) {
    // trigger the close animation
    inputAnimation.start({
      scaleX: 0,
    });
  } else {
    // trigger the open animation
    inputAnimation.start({
      scaleX: 1,
    });
  }
  setSearchOpen(prev => !prev)
};

// 중략
<Search>
  <motion.svg
    onClick={toggleSearch}
    animate={{x: searchOpen ? -180 : 0}}
    transition={{type: "linear"}}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"></path>
  </motion.svg>
  <Input
    animate={inputAnimation}
    initial={{ scaleX: 0 }}
    transition={{ type: "linear" }}
    placeholder="Search for movie or tv show." />
</Search>
```

### Navigation Animation
* scroll을 내리면 색을 바꾸고 싶어 -> __useViewportScroll__ 사용
* Nav를 ```styled.nav``` -> ```styled(motion.nav)```로 변경 후 variant와 animation 적용
```tsx
import { motion, useAnimation, useViewportScroll } from "framer-motion";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  }
}

// 중략

const {scrollY} = useViewportScroll();
const navAnimation = useAnimation();
useEffect(() => {
  scrollY.onChange(() => {
    if (scrollY.get()>80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });
}, [scrollY]);

// 중략

 <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
```

## Home.tsx
### Data 준비
#### Data 가져오기
* <https://www.themoviedb.org/>에 가입 후 api key 생성

#### index.tsx
* QueryClient, QueryClientProvider Set up
```tsx
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### Data 테스트
* api.ts 
```ts
const API_KEY="내_api_key";
const BASE_PATH="https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(`${BASE_PATH}/movies/get-now-playing?api_key=${API_KEY}`)
    .then(res => res.json());
}
```

#### 넘어오는 데이터 확인
* Home.tsx
```tsx
import { useQuery } from "react-query";
import { getMovies } from '../api';

function Home() {
  const {data, isLoading} = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return (
    <div style={{backgroundColor: "whitesmoke", height: "200vh"}}></div>
  );
}

export default Home;
```

### 메인에 큰 포스터 (Banner) 가져오기
#### interface 추가
* api.ts에서 ```IMovie```와 ```IGetMoviesResult``` Interface 생성 후 Home.tsx에서 nowPlaying 가져오는 ```useQuery<>()```에 추가한다.
```tsx
const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
```

#### Banner 출력
* inext.tsx에서 GlobalStyle의 body 안에 color랑 background-color 색 바꿈
* Banner 반환하면서 다른 슬라이더도 반환하고 싶기 때문에 Fragment를 반환한다. ```<></>```
  + 많은 요소를 공통된 부모 없이 연이어서 리턴할 수 있는 방법
* utilities.ts 생성 후 ```makeImagePath``` function 생성
* __fallback__
  + 어떤 이유에서인지 데이터가 오지 않으면 null을 보내라
  + ```{(어쩌구 || "")}```
* Home.tsx
```tsx
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from '../api';
import styled from "styled-components";
import { makeImagePath } from '../utilities';

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{bgPhoto:string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 16px;
  width: 50%;
`;

function Home() {
  const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  return (
    <Wrapper>{isLoading ? (
      <Loader>Loading</Loader>
    ) : (<>
      <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
        <Title>{data?.results[0].title}</Title>
        <Overview>{data?.results[0].overview}</Overview>
      </Banner>
    </>)}</Wrapper>
  );
}

export default Home;
```

### Slider
* Slider, Row 생성
  + 하나의 Slider에 Row 3줄을 넣자
  + Row 하나에 영화 6개를 넣자
  + 그렇다고 그 모든 내용을 다 렌더링 할 거는 아니고 key만 바꿔주자
* AnimatePresence로 Row를 감싸자
  + Slider -> AnimatePresence -> Row -> Box
* Index system
  + useState로 선언 후 Row에 key로 넘겨준다
  + index가 변경되면서 새로운 Row가 출력되는 걸로 보여질 수 있다.
* rowVariants 생성 후 Row에 적용
* Row가 나오는 중에 또 클릭하면 겹쳐지는 이상한 문제 해결
  + leaving, setLevaing
  + ```<AnimatePresence onExitComplete={toggleLeaving}>```
* 맨 처음에 이미 슬라이더가 나와있는 상태로 나오게 하고 싶어서 prop 추가 ```<AnimatePresence initial={false}```
* offset: 6
  + 6이 넘으면 다시 0으로 돌아간다
```tsx
const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{bgphoto: string}>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
`;

const offset = 6;

// 중략

const [index, setIndex] = useState(0);
const [leaving, setLeaving] = useState(false);
const increaseIndex = () => {
  if (data) {
    if (leaving) return;
    setLeaving(true);
    const totalMovies = data.results.length - 1; // main에 하나 썼으니까 한개빼야함
    const maxIndex = Math.floor(totalMovies / offset);
    setIndex(prev => (prev === maxIndex ? 0 : prev+1));
  }

};
const toggleLeaving = () => setLeaving(prev => !prev);

const width = useWindowDimensions();

// 중략

<Slider>
  <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
    <Row
      initial={{x: width+10}}
      animate={{x:0}} exit={{x: -width-10}}
      transition={{ type: "tween", duration: 1 }}
      key={index}>
      {data?.results.slice(1).slice(offset*index, offset*index+offset).map((movie) => (
        <Box key={movie.id} bgphoto={makeImagePath(movie.backdrop_path, "w500")} />
      ))}
    </Row>
  </AnimatePresence>
</Slider>
```

### Box
#### 포스터에 마우스 올리면 사진 확대되는지
* 맨 앞이랑 마지막 포스터 짤리지 않게 확대 -> Box styled에서 ```transform-origin``` 설정

#### 버튼 활성화
* info 생성 후 Box 안에 넣기
```tsx
const Box = styled(motion.div)<{bgphoto: string}>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 0.7,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

// 중략

<Box 
  key={movie.id}
  whileHover="hover"
  initial="normal"
  variants={boxVariants}
  transition={{ type: "tween" }}
  bgphoto={makeImagePath(movie.backdrop_path, "w500")}>
    <Info variants={infoVariants}>
      <h4>{movie.title}</h4>
    </Info>
</Box>
```

### Movie Modal
* Box 클릭 하면 더 큰 Card 처럼 나오는 거
* onBoxClicked 함수 생성 후 Box에 넣기
  + arg를 넘겨주기 위해서 arrow function 사용

#### URL
* url을 왔다갔다하기 위해 ```useHistory``` 사용
* App.tsx에서 ```"/"```에 ```<Home />```을 Route 할 때 ```/movies/:movieId```도 출력할 수 있도록 path를 배열로 변경
```tsx
<Route path={["/", "/movies/:movieId"]}>
```

#### useRouteMatch
* bigMovieMatch 생성
  + 이 값이 null이면 아무값도 출력하지 않고 OBJ로 나오면 그 해당 값을 큰 카드로 출력하면 된다.
  ```bash
  // bigMovieMatch 출력하면
  {
    "path": "/movies/:movieId",
    "url": "/movies/823625",
    "isExact": true,
    "params": {
        "movieId": "823625"
    }
  }
  ```
* AnimatePresence 선언 후에 layoutId로 Box component와 연결
  + string으로 만들기 ```layoutId={movie.id+""}```

#### 배경 누르면 다시 상자가 들어가게 (Overlay)
* BigMovie를 fragment로 감싸기
* Overlay 생성 후 적용
* 마우스 BigMovie 보기 위해 useViewportScroll 사용

### Overlay에 포스터 이미지 넣기
* clickedMovie 생성
  + 클릭해서 movieId가 넘어왔을 경우 그 id로 data에서 데이터를 찾자
  ```bash
  // clickedMovie 출력하면 이렇게 나옴
  {
    "adult": false,
    "backdrop_path": "/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
    "genre_ids": [
        16,
        10751,
        35,
        14
    ],
    "id": 508947,
    "original_language": "en",
    "original_title": "Turning Red",
    "overview": "Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.",
    "popularity": 6458.785,
    "poster_path": "/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg",
    "release_date": "2022-03-10",
    "title": "Turning Red",
    "video": false,
    "vote_average": 7.5,
    "vote_count": 1511
  }
  ```
* BigCover, BigTitle, BigOverview 생성
```tsx
const Box = styled(motion.div)<{bgphoto: string}>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

// 중략

// Movie Modal
const history = useHistory();
const onBoxClicked = (movieId:number) => {
  history.push(`/movies/${movieId}`);
}
const bigMovieMatch = useRouteMatch<{movieId:string}>("/movies/:movieId");

// Movie Modal Overlay
const onOverlayClick = () => history.push("/");
const { scrollY } = useViewportScroll();
const clickedMovie = bigMovieMatch?.params.movieId && 
  data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId);

  // 중략
<AnimatePresence>
  {bigMovieMatch ? (
    <>
      <Overlay 
        onClick={onOverlayClick} 
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }} />
      <BigMovie
        style={{ top: scrollY.get() + 100 }}
        layoutId={bigMovieMatch.params.movieId}>
          {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            )}
      </BigMovie>
    </>
  ) : null}
</AnimatePresence>
```
## React-hook-form
### Search
#### Header.tsx에서 작업
* IForm 생성 후 ```useForm``` 사용해서 ```register, handleSubmit``` 호출
  + ```<Input>```에 register 적용
  + Search를 span에서 form으로 변경 후 ```<Search>```에 handleSubmit 적용
* ```useHistory``` 사용해서 onValid 안에서 ```/search``` (route)로 이동시킴
```tsx
const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

interface IForm {
  keyword: string;
}

// 중략

const {register, handleSubmit} = useForm<IForm>();
const history = useHistory();
const onValid = (data:IForm) => {
  console.log(data);
  history.push(`/search?keyword=${data.keyword}`);
};

// 중략

<Search onSubmit={handleSubmit(onValid)}>
  <motion.svg></motion.svg>
  <Input
    {...register("keyword", {required: true, minLength: 2})}
    animate={inputAnimation}
    initial={{ scaleX: 0 }}
    transition={{ type: "linear" }}
    placeholder="Search for movie or tv show." />
</Search>
```
#### Search.tsx에서 작업
* ```useLocation```으로 param 가져오기
```tsx
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return null;
}

export default Search;
```