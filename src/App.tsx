import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 8px;
  top: 80px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  entry: (back: boolean) => ({
    x: back ? -100 : 100,
    opacity: 0,
    scale: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: (back: boolean) => ({
    x: back ? 100 : -100,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  })
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const sliderNext = () => {
    setBack(false);
    setVisible(prev => prev === 10 ? 1 : prev+1);
  };
  const sliderPrev = () => {
    setBack(true);
    setVisible(prev => prev === 1 ? 10 : prev-1);
  };
  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box
          custom={back}
          variants={boxVariants} 
          initial="entry" 
          animate="center" 
          exit="exit" key={visible}>{visible}</Box>
      </AnimatePresence>
      <button onClick={sliderNext}>NEXT</button>
      <button onClick={sliderPrev}>PREV</button>
    </Wrapper>
  );
}

export default App;