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