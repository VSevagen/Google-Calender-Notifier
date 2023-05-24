import React from 'react';
import Example from './Chart';
import Loader from './Loader';
import Header from '../Header';

import FailedMsg from '../assets/failed-message.png';
import Msg from '../assets/mail.png';
import SuccessMsg from '../assets/chat.png'
import { ThemeContext } from '../AppWrapper';

const MemoizedStats = ({stats, undeliveredSMS, deliveredSMS, theme}) => {
  return (
    <>
      <div className={`flex flex-col sm:flex-row-reverse sm:justify-between`}>
        <div className={`flex flex-col`}>
          <div className={`w-[300px] h-[100px] rounded my-[25px] mx-auto shadow-[rgba(0,0,0,0.24)_0px_3px_8px] ${theme === 'light' ? "bg-[#fff]" : "bg-[#27374D]"}`}>
            <div className={`flex flex-row justify-around pt-[20px]`}>
              <span className={`text-bold text-[25px] text-left ${theme === 'light' ? "text-black" : "text-[#DDE6ED]"}`}>
                {stats?.length || 0}
                <p className={`text-[15px] text-normal mt-[-3px] ${theme === 'light' ? "text-black" : "text-[#DDE6ED]"}`}>SMS Sent</p>
              </span>
              <img className={`w-[40px] h-[40px]`} src={Msg} alt="something"/>
            </div>
          </div>
          <div className={`w-[300px] h-[100px] rounded my-[25px] mx-auto shadow-[rgba(0,0,0,0.24)_0px_3px_8px] ${theme === 'light' ? "bg-[#fff]" : "bg-[#27374D]"}`}>
            <div className={`flex flex-row justify-around pt-[20px]`}>
              <span className={`text-bold text-[25px] text-left ${theme === 'light' ? "text-black" : "text-[#DDE6ED]"}`}>
                {undeliveredSMS() || 0}
                <p className={`text-[15px] text-normal mt-[-3px] ${theme === 'light' ? "text-black" : "text-[#DDE6ED]"}`}>Undelivered SMS</p>
              </span>
              <img className={`w-[40px] h-[40px]`} src={FailedMsg} alt="something"/>
            </div>
          </div>
          <div className={`w-[300px] h-[100px] rounded my-[25px] mx-auto shadow-[rgba(0,0,0,0.24)_0px_3px_8px] ${theme === 'light' ? "bg-[#fff]" : "bg-[#27374D]"}`}>
            <div className={`flex flex-row justify-around pt-[20px]`}>
              <span className={`text-bold text-[25px] text-left ${theme === 'light' ? "text-black" : "text-[#DDE6ED]"}`}>
                {deliveredSMS() || 0}
                <p className={`text-[15px] text-normal mt-[-3px] ${theme === 'light' ? "text-black" : "text-[#DDE6ED]"}`}>Delivered SMS</p>
              </span>
              <img className={`w-[40px] h-[40px]`} src={SuccessMsg} alt="something"/>
            </div>
          </div>
        </div>
        <div className="stats-wrapper">
          {stats ?
            <Example stats={stats && stats}/> :
            <Loader />
          }
        </div>
        <Header />
      </div>
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
  const {theme} = React.useContext(ThemeContext)

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
    React.useMemo(() => <MemoizedStats theme={theme} stats={stats} undeliveredSMS={undeliveredSMS} deliveredSMS={deliveredSMS}/>, [stats, deliveredSMS, undeliveredSMS, theme])
  )
}

export default Stats;