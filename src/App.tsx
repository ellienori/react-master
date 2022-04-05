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