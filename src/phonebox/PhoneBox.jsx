import React from "react";
import styled from "styled-components";
import Call from '../assets/call.png'
import Header from "../Header";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneNumberTab = styled.div`
display: grid;
justify-items:center;
padding: 20px 0 20px 0px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
margin-bottom: 10px;
margin-left: 20px;
margin-right: 20px;
text-align: left;
border-radius: 10px;
width: 250px;
`;

const Index = styled.div`
display: inline-block;
padding-left: 10px;
padding-right: 10px;
background-color: #54aced;
border-radius: 10px;;
color: white;
margin-bottom: 5px;
`;

const Number = styled.div`
display: inline-block;
padding-left: 10%;
padding-right: 10%;
text-align: right;
color: grey;
`;

const Name = styled.div`
display: inline-block;
padding-left: 10%;
padding-right: 10%;
font-weight: bold;
font-size: 20px;
padding-bottom: 5px;
text-align: center;
`;

const CallImage = styled.img`
width: 26px;
height: 26px;
margin-bottom: -7px;
padding-right: 5px;
`;

const PhoneContainer = styled.div`
 display: flex;
 margin-top: 20px;
 justify-content: center;
 flex-wrap: wrap;
`;

const AddNumberButton = styled.button`
background-color: #6C757D;
border-radius: 5px;
padding-left: 10px;
padding-right: 10px;
padding-top: 5px;
padding-bottom: 5px;
margin-left: 5px;
color: white;
outline: none;
border: none;
font-weight: bold;
cursor: pointer;
:hover {
    opacity: 0.6;
  }
`;

const RemoveButton = styled.button`
background-color: #DC3444;
border-radius: 5px;
padding-left: 10px;
padding-right: 10px;
padding-top: 5px;
padding-bottom: 5px;
margin-top: 10px;
color: white;
outline: none;
border: none;
font-weight: bold;
cursor: pointer;
:hover {
    opacity: 0.6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  min-width: 275px;
`;

const PhoneBox = () => {

  const [phoneNumbers, setPhoneNumbers] = React.useState();
  const [newNumber, setNewNumber] = React.useState(null);
  const [newName, setNewName] = React.useState('');

  React.useLayoutEffect(() => {
    if(window?.localStorage && localStorage.getItem('phoneNumbers') !== null) {
      setPhoneNumbers(JSON.parse(localStorage.getItem('phoneNumbers')));
    } else {
      setPhoneNumbers([{number: null, name: null}]);
    }
  }, []);

  const checkDuplicate = () => {
    let numberData = phoneNumbers;
    const numberExist = numberData?.findIndex((item) => item.number === newNumber);
    // -1 : does not exist
    return numberExist === -1 ? false : true;
  }

  const SaveToLocalStorage = (numberData) => {
    if(window?.localStorage) {
      localStorage.setItem('phoneNumbers', JSON.stringify(numberData));
      window.location.reload();
    }
  }

  const handleAddNumber = (event) => {
    event.preventDefault();
    let numberData = phoneNumbers;
    if(numberData[0]?.name === null) {
      console.log("Reached if");
      numberData = [];
      numberData = [{name: newName, number: newNumber}]
      SaveToLocalStorage(numberData);
    } else {
      console.log("Reached else");
      if(!checkDuplicate()) {
        console.log("Reached inside else");
        numberData?.push({name: newName, number: newNumber});
        SaveToLocalStorage(numberData);
      } else {
        alert("Number already exists");
      }
    }
  }

  const removeNumber = (number) => {
    let numberData = phoneNumbers;
    const numberToDelete = numberData?.findIndex((item) => item.number === number);
    numberData.splice(numberToDelete, 1);
    if(window?.localStorage) {
      localStorage.setItem('phoneNumbers', JSON.stringify(numberData));
      window.location.reload();
    }
  }

  return (
    <div>
      <h2 style={{textAlign: "center"}}>Phone Numbers</h2>
      <Form onSubmit={(event) => handleAddNumber(event)}>
        <FormInput type="text" placeholder="Enter name" value={newName} onChange={(event) => setNewName(event.target.value)} required/>        <PhoneInput
          country={'us'}
          value={newNumber}
          onChange={(phone) => {
            setNewNumber(phone)
          }}
          disableCountryCode={true}
          inputProps={{
            name: "phone",
            required: true,
            placeholder: "Enter phone number"
          }}
        />
        <AddNumberButton type="submit">Save</AddNumberButton>
      </Form>
      <PhoneContainer>
        {phoneNumbers?.length > 0 && phoneNumbers[0]?.name !== null && phoneNumbers?.map((item, index) =>(
          <PhoneNumberTab>
            <Index>#{index + 1}</Index>
            <Name>{item?.name}</Name>
            <Number>
              <CallImage src={Call} alt="Phone icon" />
              {item?.number}
            </Number>
            <RemoveButton onClick={() => removeNumber(item?.number)}>Delete</RemoveButton>
          </PhoneNumberTab>
        ))}
      </PhoneContainer>
      {(phoneNumbers?.length > 0 || phoneNumbers?.length === 0)  &&  (phoneNumbers[0]?.name === null || phoneNumbers[0]?.name === undefined) && (
        <div>No numbers registered yet</div>
      )}
      <Header />
    </div>
  )
}

export default PhoneBox;