import React from 'react';
import Modal from '../modal/Modal';
import { ThemeContext } from '../AppWrapper';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const Card = ({
  item,
  phoneNumbers
}) => {

  const {theme} = React.useContext(ThemeContext)
  const [showModal, setShowModal] = React.useState(false);

  const timeConvention = (hour) => {
    if(hour > 12) {
      return "PM";
    } else {
      return "AM";
    }
  }

  // startDate : Number Month (1 January);
  let startDate = `${new Date(item.start).getDate()} ${months[new Date(item.start).getMonth()]}`
  console.log("StartDate", startDate, item.start, item);

  // startTime: 11:00 AM
  let startTime = `${new Date(item.start).getHours()}:${(new Date(item.start).getMinutes() < 10 ? "0":"") + new Date(item.start).getMinutes()} ${timeConvention(new Date(item.start).getHours())}`;

  // endTime: 13:00 PM
  let endTime = `${new Date(item.end).getHours()}:${(new Date(item.end).getMinutes() < 10 ? "0":"") + new Date(item.end).getMinutes()} ${timeConvention(new Date(item.end).getHours())}`

  // timeTanges: 11:00 AM - 13:00 PM
  const timeRanges = `${startTime} - ${endTime}`;
  const dateData = {
    startDate: startDate,
    endDate: timeRanges
  };

  const handleSMSSender = () => {
    setShowModal(true);
  }

  const Calendar = <svg className={`w-[20px] h-[20px] ${theme === 'light' ? "fill-[#404040]" : "fill-[#526D82]"}`} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg>
  const Time = <svg className={`w-[20px] h-[20px] ${theme === 'light' ? "fill-[#404040]" : "fill-[#526D82]"}`} id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m9 24h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"/><path d="m7 20h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"/><path d="m5 16h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z"/><path d="m13 23.955a1 1 0 0 1 -.089-2 10 10 0 1 0 -10.87-10.865 1 1 0 0 1 -1.992-.18 12 12 0 0 1 23.951 1.09 11.934 11.934 0 0 1 -10.91 11.951c-.03.003-.061.004-.09.004z"/><path d="m12 6a1 1 0 0 0 -1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414l-2.707-2.707v-4.586a1 1 0 0 0 -1-1z"/></svg>

  return (
    <>
      <div className={`relative w-80 mx-5 my-2`}>
        <div className={`w-[7px] bg-[#14A2B8] ${theme === 'light' ? "bg-[#14A2B8]" : "bg-[#DDE6ED]"} rounded-[3px_0_0_3px] absolute h-full z-[1]`}/>
        <div className={`relative flex flex-row w-80 rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px] justify-center items-center min-h-[180px] ${theme === 'light' ? "bg-[#fff]" : "bg-[#27374D]"}`}>
          <div className={`flex flex-col items-center`}>
            <p className={`font-bold pt-2 px-[10px] ${theme === 'light' ? "text-black" : "text-[#DDE6ED]"}`}>
              {item.title}
            </p>
            <p className="py-2 flex">
              {Calendar}
              <span className={`pl-[10px] ${theme === 'light' ? "text-[##020617]" : "text-[#9DB2BF]"}`}>
                {startDate}
              </span>
            </p>
            <p className="flex mb-[10px]">
              {Time}
              <span className={`pl-[10px] ${theme === 'light' ? "text-[##020617]" : "text-[#9DB2BF]"}`}>
                {timeRanges}
              </span>
            </p>
            <button className="rounded-[10px] font-bold bg-[#DC3444] text-white w-24" onClick={() => handleSMSSender()}>Send SMS</button>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} description={item.title} dateData={dateData} phoneNumbers={phoneNumbers}/>
    </>
  )
}

export default Card;