import React from 'react';
import styled from 'styled-components';
import Example from './Chart';
import { format, sub } from "date-fns";

import FailedMsg from './assets/failed-message.png';
import Msg from './assets/mail.png';
import SuccessMsg from './assets/chat.png'

const currentDate = format(new Date(),  'MM/dd/yyyy');

const data = [
  {
    name: sub(currentDate, { days: 7 })
  },
  {
    name: sub(currentDate, { days: 6 })
  },
  {
    name: sub(currentDate, { days: 5 })
  },
  {
    name: sub(currentDate, { days: 4 })
  },
  {
    name: sub(currentDate, { days: 3 })
  },
  {
    name: sub(currentDate, { days: 2 })
  },
  {
    name: sub(currentDate, { days: 1 })
  }
]

console.log(data);

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const Stats = () => {
  const [stats, setStats] = React.useState();

  const fetchData = React.useCallback(async () => {
    const statData = await fetch(`${process.env.REACT_APP_TWILLIO_SERVER_URL}api/message`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return statData;
  });

  const undeliveredSMS = () => {
    if(stats) {
      const num = stats?.filter(item => item?.status === "undelivered")?.length;
      return num;
    }
    return;
  }

  const deliveredSMS = () => {
    if(stats) {
      const num = stats?.filter(item => item?.status === "delivered")?.length;
      return num;
    }
    return;
  }
  
  React.useEffect(() => {
    fetchData()
    .then(res => res.json())
    .then(data => setStats(data));
  }, [])

  return (
  <>
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
    {console.log(stats)}
    <div style={{
      width: "1000px",
      height: "500px"
    }}>
      <Example />
    </div>
  </>
  )
}

export default Stats;