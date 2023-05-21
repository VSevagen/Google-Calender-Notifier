import React from "react";
import Call from '../assets/call.png'
import Header from "../Header";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Dna } from "react-loader-spinner";

const PhoneBox = () => {

  const [phoneNumbers, setPhoneNumbers] = React.useState();
  const [newNumber, setNewNumber] = React.useState(null);
  const [newName, setNewName] = React.useState('');
  const [countryEnabled, setCountryEnabled] = React.useState(null);

  React.useLayoutEffect(() => {
    if(window?.localStorage && localStorage.getItem('phoneNumbers') !== null) {
      setPhoneNumbers(JSON.parse(localStorage.getItem('phoneNumbers')));
    } else {
      setPhoneNumbers([{number: null, name: null}]);
    }
  }, []);

  React.useLayoutEffect(() => {
    const fetchData = async () => {
      const statData = await fetch(`${process.env.REACT_APP_TWILLIO_SERVER_URL}api/country-configured`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return statData;
    };
    fetchData()
    .then(res => res.json())
    .then(data => setCountryEnabled(data));
  }, [])

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
      numberData = [];
      numberData = [{name: newName, number: newNumber}]
      SaveToLocalStorage(numberData);
    } else {
      if(!checkDuplicate()) {
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
      <h2 className="text-[24px] text-center">Phone Numbers</h2>
      <form
        className="flex items-center flex-col justify-center"
        onSubmit={(event) => handleAddNumber(event)}
      >
        {countryEnabled ?
        <>
          <input className="mb-[10px] p-[10px] w-[300px] border-slate-400 border-[1px] rounded" type="text" placeholder="Enter name" value={newName} onChange={(event) => setNewName(event.target.value)} required/>
          <PhoneInput
            country={countryEnabled ? JSON.parse(countryEnabled?.countries)?.[0] : []}
            value={newNumber}
            onChange={(phone) => {
              setNewNumber(phone)
            }}
            disableCountryCode={true}
            onlyCountries={countryEnabled ? JSON.parse(countryEnabled?.countries) : []}
            inputProps={{
              name: "phone",
              required: true,
              placeholder: "Enter phone number"
            }}
          />
        </>
        :
        <Dna
          visible={true}
          height="85"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        }
        <button className="bg-[#6C757D] text-white rounded p-1 mt-2 hover:opacity-60" type="submit">Save</button>
      </form>
      <div className="flex justify-center flex-col items-center sm:flex-row mt-[20px]">
        {phoneNumbers?.length > 0 && phoneNumbers[0]?.name !== null && phoneNumbers?.map((item, index) =>(
          <div className="w-[250px] rounded mx-[20px] mb-[15px] py-[20px] shadow-[rgba(0,0,0,0.35)_0px_5px_15px] flex flex-col items-center">
            <p className="bg-[#54aced] text-white px-[8px] rounded">#{index + 1}</p>
            <p className="pt-[10px] font-bold text-[20px]">{item?.name}</p>
            <div className="text-slate-400 flex">
              <img  className="w-[26px] h-[26px]" src={Call} alt="Phone icon" />
              {item?.number}
            </div>
            <button className="bg-[#DC3444] text-white rounded p-1 mt-2 hover:opacity-60" onClick={() => removeNumber(item?.number)}>Delete</button>
          </div>
        ))}
      </div>
      {(phoneNumbers?.length > 0 || phoneNumbers?.length === 0)  &&  (phoneNumbers[0]?.name === null || phoneNumbers[0]?.name === undefined) && (
        <div>No numbers registered yet</div>
      )}
      <Header />
    </div>
  )
}

export default PhoneBox;