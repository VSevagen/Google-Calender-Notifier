import React from 'react';
import Modal from '../modal/Modal';

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
      <div className="relative w-80 mx-5 my-2">
        <div className="w-[7px] bg-[#14A2B8] rounded-[10px_0_0_6px] absolute h-full"/>
        <div className="relative flex flex-row w-80 rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px] justify-center items-center min-h-[180px]">
          <div className="flex flex-col items-center">
            <p className="font-bold pt-2">{item.title}</p>
            <p className="py-2">{startDate}</p>
            <p className="py-2">{endDate}</p>
            <button className="rounded-[10px] font-bold bg-[#DC3444] text-white w-24" onClick={() => handleSMSSender()}>Send SMS</button>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} description={item.title} dateData={dateData} phoneNumbers={phoneNumbers}/>
    </>
  )
}

export default Card;