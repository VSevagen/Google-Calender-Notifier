import React from "react";
import Error from "./Error";

const Modal = ({ showModal = false, description = '', setShowModal, dateData, phoneNumbers }) => {

  const textAreaData = `${description}\nStart: ${dateData.startDate}\nEnd: ${dateData.endDate}`

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
    // message?.to?.forEach((newTo) => {
    //   if(newTo !== undefined || newTo !== null) {
    //     userRequests.push(sendTwillioRequest({
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({to: newTo, body: message.body})
    //     }));
    //   }
    // })
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

    // newMessage.forEach((newTo) => {
    //   fetch(`${process.env.REACT_APP_TWILLIO_SERVER_URL}api/messages`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({to: newTo, body: message.body})
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.success) {
    //       setSubmitting(false);
    //       setError(false);
    //       setMessage({...message, to: ""});
    //       setShowModal(false);
    //     } else {
    //       setSubmitting(false);
    //       setError(true);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // })
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
        bg-[#fefefe] m-auto p-[20px] sm:w-1/2 sm:h-auto mb-[15%] mx-auto border-2 border-solid border-[#888]
        sm:my-[15%]`}
      >
        <div className={`flex justify-end`}>
          <button className={`text-white bg-[#DC3444] py-[10px] px-[15px] rounded-[10px] text-[17px] cursor-pointer hover:opacity-[0.6]`} onClick={() => handleModalClose()}>X</button>
        </div>
        <form
          onSubmit={onSubmit}
          className="sms-form"
        >
          <div>
            <label htmlFor="to">To:</label>
            <input
              type="tel"
              name="to"
              id="to"
              value={message.to}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="body">Body:</label>
            <textarea
              className="meet-detail"
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
    </div>
  );
};

export default Modal;
