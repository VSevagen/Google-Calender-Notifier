import React from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  height: 100%;
  border: 2px solid red;
  border-radius: 10px;
  background-color: #f6a6a4;
  margin-top: 15px;
  position: relative;
`;

const AlertContent = styled.p`
  font-weight: bold;
`;

const Error = () => {
  return (
    <AlertContainer alertType="">
      <AlertContent>
        Oops, something wasn't right !
      </AlertContent>
    </AlertContainer>
  );
};

export default Error;
