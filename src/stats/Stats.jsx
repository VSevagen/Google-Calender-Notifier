import React from 'react';
import styled from 'styled-components';
import Example from './Chart';
import Loader from './Loader';

import FailedMsg from '../assets/failed-message.png';
import Msg from '../assets/mail.png';
import SuccessMsg from '../assets/chat.png'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 992px) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const Card = styled.div`
  width: 300px;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 25px auto;
`;

const NumberStat = styled.span`
  font-size: 25px;
  font-weight: bold;
  text-align: left;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const Text = styled.p`
  font-size: 15px;
  font-weight: normal;
  margin-top: -3px;
`;

const MemoizedStats = ({stats, undeliveredSMS, deliveredSMS}) => {
  return (
    <>
      <StatsContainer>
        <CardContainer>
          <Card>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: "20px"
            }}>
              <NumberStat>
                {stats?.length || 0}
                <Text>SMS Sent</Text>
              </NumberStat>
              <Img src={Msg} />
            </div>
          </Card>
          <Card>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: "20px"
            }}>
              <NumberStat>
                {undeliveredSMS() || 0}
                <Text>Undelivered SMS</Text>
              </NumberStat>
              <Img src={FailedMsg} />
            </div>
          </Card>
          <Card>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: "20px"
            }}>
              <NumberStat>
                {deliveredSMS() || 0}
                <Text>Delivered SMS</Text>
              </NumberStat>
              <Img src={SuccessMsg} />
            </div>
          </Card>
        </CardContainer>
        <div style={{
          width: "1000px",
          height: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {stats ?
            <Example stats={stats && stats}/> :
            <Loader />
          }
        </div>
      </StatsContainer>
    </>
  )
};

const fetchData = async () => {
  const statData = await fetch(`${process.env.REACT_APP_TWILLIO_SERVER_URL}api/message`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return statData;
};

const Stats = () => {
  const [stats, setStats] = React.useState();

  const undeliveredSMS = React.useCallback(() => {
    if(stats) {
      const num = stats?.filter(item => item?.status === "undelivered")?.length;
      return num;
    }
    return;
  }, [stats]);

  const deliveredSMS = React.useCallback(() => {
    if(stats) {
      const num = stats?.filter(item => item?.status === "delivered")?.length;
      return num;
    }
    return;
  }, [stats]);
  
  React.useLayoutEffect(() => {
    fetchData()
    .then(res => res.json())
    .then(data => setStats(data));
  }, [])

  React.useEffect(() => {
    console.log("stats changed", stats)
  }, [stats])

  return (
    React.useMemo(() => <MemoizedStats stats={stats} undeliveredSMS={undeliveredSMS} deliveredSMS={deliveredSMS}/>, [stats, deliveredSMS, undeliveredSMS])
  )
}

export default Stats;