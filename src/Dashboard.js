import React from 'react';
import './Dashboard.css';
import Card from './Card';
import styled from 'styled-components';

const CardMainContainer = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
`;

const Heading = styled.h2`
`;

const Dashboard = ({events, phoneNumbers}) => {
  let numbers = '';
  phoneNumbers?.forEach(element => {
    numbers = numbers + element?.number + ",";
  });
  return (
    <div>
      <Heading>Your meetings</Heading>
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
