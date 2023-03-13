import React, { useContext } from 'react';
import './Dashboard.css';
import Card from './Card';
import styled from 'styled-components';

import Search from './assets/search.png';
import { NumberContext } from './App';
const CardMainContainer = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: center;
`;

const GoogleButton = styled.button`
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
  :hover {
    opacity: 0.6;
  }
`;

const GoogleImage = styled.img`
display: inline-block;
vertical-align: middle;
width: 25px;
height: 25px;
padding-right: 10px;
`;

const Heading = styled.h2`
`;

const Dashboard = ({events}) => {
  const phoneNumbers = useContext(NumberContext)
  let numbers = [];
  phoneNumbers?.forEach(element => {
    if(element?.number !== null) {
      numbers.push(element?.number);
    }
  });

  const [tokenPresent] = React.useState(window?.localStorage?.getItem('access_token'));
  return (
    <div>
      <Heading>Your meetings</Heading>
      {!tokenPresent && <GoogleButton onClick={
        () => {
          if(window && window?.activateSignIn) {
            window.activateSignIn();
          }
        }
      }>
        <GoogleImage src={Search} className="icon"></GoogleImage>
        <span className="buttonText">Sign in with Google</span>
      </GoogleButton>}
      <CardMainContainer>
        {events &&
          events.map((item) => (
            <Card item={item} phoneNumbers={numbers}/>
          ))
        }
      </CardMainContainer>
    </div>
  );
}

export default Dashboard;
