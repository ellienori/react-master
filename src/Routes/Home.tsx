import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from '../api';
import styled from "styled-components";
import { makeImagePath } from '../utilities';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import useWindowDimensions from '../useWindowDimensions';

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
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

function Home() {
  // Get a Main Poster
  const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  // Slider Index System
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
  return (
    <Wrapper>
      {isLoading ? (
      <Loader>Loading</Loader>
    ) : (<>
      <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
        <Title>{data?.results[0].title}</Title>
        <Overview>{data?.results[0].overview}</Overview>
      </Banner>
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
    </>)}
    </Wrapper>
  );
}

export default Home;