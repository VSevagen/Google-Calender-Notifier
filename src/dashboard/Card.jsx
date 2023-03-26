import React from 'react';
import Modal from '../modal/Modal';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 300px;
  min-height: 175px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  margin: 0 20px 20px 20px;
`;

const CardDetails = styled.div`
  margin: 0 auto;
`;

const BlueBar = styled.div`
  width: 7px;
  background-color: #14A2B8;
  border-radius: 10px 0 0 10px;
`;

const SMSSender = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
  background-color: #DC3444;
  border: none;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const CardTitle = styled.p`
  font-weight: bold;
`;

const Card = ({
item,
phoneNumbers
}) => {

  const [showModal, setShowModal] = React.useState(false);

  const startDate = new Date(item.start).toUTCString();
  const endDate = new Date(item.end).toUTCString();
  const dateData = {startDate: startDate, endDate: endDate};

  const handleSMSSender = () => {
    setShowModal(true);
  }

  return (
    <>
      <CardContainer>
        <BlueBar />
        <CardDetails>
          <CardTitle>{item.title}</CardTitle>
          <p>{startDate}</p>
          <p>{endDate}</p>
          <SMSSender onClick={() => handleSMSSender()}>Send SMS</SMSSender>
        </CardDetails>
      </CardContainer>
      <Modal showModal={showModal} setShowModal={setShowModal} description={item.title} dateData={dateData} phoneNumbers={phoneNumbers}/>
    </>
  )
}

export default Card;