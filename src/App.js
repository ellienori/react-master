import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  dispaly: flex;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform:rotate(360deg);
    border-radius: 120px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

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

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>😁</Emoji>
      </Box>
      <Emoji>👽</Emoji>
    </Wrapper>
  );
}

export default App;
