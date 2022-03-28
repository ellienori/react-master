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

## interface를 optional 주기
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
* useQuery의 두번째 인자에는 함수를 넣어야하는데 이번에는 __coinId__ 라는 parameter를 넘겨주기 위해 함수 형태를 유지하기 위해 arrow function 형태로 넣었다.

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