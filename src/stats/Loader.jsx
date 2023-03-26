import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 100px;
  height: 100px;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
  position: relative;
  padding-left: 10px;
`;

const Bar1 = styled.div`
  width: 20px;
  height: 100px;
  background-color: #DC3444;
  position: absolute;
  bottom: 4px;
  @keyframes chartHeight {
    0% { 
      height: 10px;
      background-color: #cd0a00;
    }
    50% {
      background-color: #fa8a00;
    }
    80% {
      background-color: #91d700;
    }
    100% {
      height: 90px;
      background-color: #91d700;
    }
  }
  animation-name: chartHeight;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

const Bar2 = styled.div`
  width: 20px;
  height: 100px;
  background-color: #DC3444;
  position: absolute;
  bottom: 4px;
  left: 33px;
  /* @keyframes chartHeight {
    0% {
      height: 10px;
      background-color: #DC3444;
    }

    100% {
      height: 100px;
      background-color: #28A745;
    }
  } */
  animation-name: chartHeight;
  animation-duration: 2.1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

const Bar3 = styled.div`
  width: 20px;
  height: 100px;
  background-color: #DC3444;
  position: absolute;
  bottom: 4px;
  left: 56px;
  /* @keyframes chartHeight {
    0% {
      height: 10px;
      background-color: #DC3444;
    }

    100% {
      height: 100px;
      background-color: #28A745;
    }
  } */
  animation-name: chartHeight;
  animation-duration: 2.2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

const Bar4 = styled.div`
  width: 20px;
  height: 100px;
  background-color: #DC3444;
  position: absolute;
  bottom: 4px;
  left: 79px;
  /* @keyframes chartHeight4 {
    0% {
      height: 10px;
      background-color: #DC3444;
    }

    100% {
      height: 100px;
      background-color: #28A745;
    }
  } */
  animation-name: chartHeight;
  animation-duration: 2.3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

const Loader = () => {
  return (
    <Container>
      <Bar1 />
      <Bar2 />
      <Bar3 />
      <Bar4 />
    </Container>
  )
}

export default Loader;