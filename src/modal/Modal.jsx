import React from "react";
import { ThemeContext } from "../AppWrapper";
import Error from "./Error";

const Modal = ({ showModal = false, description = '', setShowModal, dateData, phoneNumbers }) => {

  const textAreaData = `${description}\nStart: ${dateData.startDate}\nEnd: ${dateData.endDate}`

  const {theme} = React.useContext(ThemeContext);
  const [message, setMessage] = React.useState({to: phoneNumbers, body: textAreaData})
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onHandleChange = event => {
    const name = event.target.getAttribute('name');
    if(name === 'to') {
      setMessage({...message, to: event.target.value.split(',')});
    } else {
      setMessage({...message, [name]: event.target.value});
    }
  }

  const sendTwillioRequest = async (requestDetails) => {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_TWILLIO_SERVER_URL}api/messages`, requestDetails)
      .then(res => res.json())
      .then(data => resolve(data))
    })
  }

  const onSubmit = event => {
    event.preventDefault();
    let userRequests = [];
    for(let i = 0;i<message?.to?.length;i++) {
      if(message?.to[i] !== undefined || message?.to[i] !== null) {
        userRequests.push(sendTwillioRequest({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({to: message?.to[i], body: message.body})
        }));
      }
    }
    setSubmitting(true);
    Promise.all(userRequests)
    .then(result => {
      console.log(result.find(item => item.success === false), result);
      if(result.find(item => item.success === false)) {
        setError(true);
      } else {
        setError(false);
        setShowModal(false);
        setSubmitting(false);
      }
    });
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  return (
    <div 
      className={`
        ${showModal ? "block" : "hidden"}
        fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-screen w-full h-screen h-full overflow-auto
        sm:absolute z-[2]`}
      id="myModal"
      >
      <div className={`
        ${theme === 'light' ? "bg-[#fefefe]" : "bg-[#262626]"}
        ${theme === 'light' ? "border-black" : "border-white"}
        rounded m-auto p-[20px] sm:w-1/2 sm:h-auto mb-[15%] mx-auto border-2 border-solid
        sm:my-[15%] relative z-[2]`}
      >
        <div className={`flex justify-end`}>
          <button className={`text-white bg-[#DC3444] py-[10px] px-[15px] rounded-[10px] text-[17px] cursor-pointer hover:opacity-[0.6]`} onClick={() => handleModalClose()}>X</button>
        </div>
        <form
          onSubmit={onSubmit}
          className="sms-form"
        >
          <div>
            <label htmlFor="to" className={`
              ${theme === 'light' ? "text-slate-700" : "text-white"}
              block text-sm font-bold`
            }>
              To:
            </label>
            <input
              className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50"
              type="tel"
              name="to"
              id="to"
              value={message.to}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="body" className={`
              ${theme === 'light' ? "text-slate-700" : "text-white"}
              block text-sm font-bold`
              }>
                Body:
            </label>
            <textarea
              className="meet-detail px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50"
              name="body"
              id="body"
              value={message.body}
              onChange={onHandleChange}
            />
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <button className={`text-white bg-[#017BFE] text-bold w-1/2 py-[10px] rounded disabled:opacity-[0.6] cursor-pointer`} type="submit" disabled={submitting}>
              { submitting && <span className="loader"></span>}
              <span className="button-text">Send message</span>
            </button>
          </div>
        </form>
        {error && <Error />}
      </div>
      <div className="bg-black opacity-[0.6] w-full w-screen h-screen absolute top-[0]"></div>
    </div>
  );
};

export default Modal;
