import styled from "styled-components";

const Fater = styled.div`
  dispaly: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Text = styled.span`
  color: white;
`;

function App() {
  return (
    <Fater>
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
    </Fater>
  );
}

export default App;
