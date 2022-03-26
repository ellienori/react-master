import styled, { keyframes } from "styled-components";

const Father = styled.div`
  display: flex;
`;

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

function App() {
  return (
    <Father>
      <Box>
        <span>😄</span>
      </Box>
    </Father>
  );
}

export default App;
