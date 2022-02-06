# Studylog

## #2. Styled Components

### #2.0~ Setting the project

1. create-react-app으로 프로젝트 생성하기

```
$ npx create-react-app react-master
```

2. 그리고 VScode에서 해당 프로젝트 열고 App.js와 index.js 빼고 모두 지우기
3. 그 이후로 서버 실행할 때마다 $ npm start 하면 된다.

### #2.1~ Styled Component

#### 설치

```
$ npm i styled-components
```

그리고 extension: vscode-styled-components

#### 설정

```
import styled from "styled-components";
```

#### 사용

```
// Before
<div style={{ dispaly: "flex" }}></div>

// After
const Fater = styled.div`
  dispaly: flex;
`;

<Father></Father>
```

back tik 안에는 CSS 문법 쓰듯이 쓰면 된다.

### #2.3~ As and Attrs

#### As

이미 만들어 놓은 컴포넌트를 다른 애(?)로 쓸 때 사용
예를 들어 div로 선언 된 Father를 아래처럼 선안하면 header로 쓸 수 있다.

```
<Fater as="header">
```

그 외에 button으로 만든 애를 a로 쓰는 것도 가능

#### Attrs

Attributes의 줄임말임
컴포넌트에 속성을 주고 싶을 때 똑같이 styled를 사용해서 줄 수 있음

```
// Before
<Input required minLength=10 />
<Input required minLength=10 />
<Input required minLength=10 />

// After
const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
