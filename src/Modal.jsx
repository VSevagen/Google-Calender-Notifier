import React from "react";
import styled from "styled-components";
import Error from "./Error";

export const ModalContainer = styled.div`
  display: ${prop => (prop.showModal ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  @media(min-width: 992px) {
    position: absolute;
  }
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  @media(min-width: 992px) {
    margin: 15% auto;
    width: 50%;
    height: auto;
  }
`;

export const ModalClose = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalCloseButton = styled.button`
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  font-size: 17px;
  background-color: #DC3444;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const SendButton = styled.button`
  color: white;
  background-color: #017BFE;
  border: none;
  font-weight: bold;
  width: 50%;
  padding: 10px 0 10px 0;
  border-radius: 10px;
  cursor: pointer;
  /* :hover {
    opacity: 0.6;
  } */
  :disabled {
    opacity: 0.6;
  }
`;

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
    <ModalContainer showModal={showModal} id="myModal">
      <ModalContent>
        <ModalClose>
          <ModalCloseButton onClick={() => handleModalClose()}>X</ModalCloseButton>
        </ModalClose>
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
            <SendButton type="submit" disabled={submitting}>
              { submitting && <span className="loader"></span>}
              <span className="button-text">Send message</span>
            </SendButton>
          </div>
        </form>
        {error && <Error />}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
