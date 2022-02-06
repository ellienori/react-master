import styled from "styled-components";

const Fater = styled.div`
  dispaly: flex;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;

function App() {
  return (
    <Fater as="header">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Fater>
  );
}

export default App;
