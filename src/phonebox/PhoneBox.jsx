import React from "react";
import Header from "../Header";
import { ThemeContext } from "../AppWrapper";
import Form from "./Form";

import 'react-phone-input-2/lib/style.css'
import Call from '../assets/call.png'

import { getPhoneNumbers, addPhoneNumber, removePhoneNumber } from "../supabaseHelper";

const PhoneBox = () => {
  const [phoneNumbers, setPhoneNumbers] = React.useState();
  const [newNumber, setNewNumber] = React.useState(null);
  const [newName, setNewName] = React.useState('');
  const { theme } = React.useContext(ThemeContext)

  React.useLayoutEffect(() => {
    (async () => {
      const {data, error} = await getPhoneNumbers();
      setPhoneNumbers(data);
    })();
  }, []);

  const checkDuplicate = () => {
    let numberData = phoneNumbers;
    const numberExist = numberData?.findIndex((item) => item.number === newNumber);
    // -1 : does not exist
    return numberExist === -1 ? false : true;
  }

  const handleAddNumber = async (event) => {
    event.preventDefault();
    if(!checkDuplicate()) {
      await addPhoneNumber(newName, newNumber);
      const {data, error} = await getPhoneNumbers();
      setPhoneNumbers(data);
    } else {
      alert("Number already exists");
    }
  }

  const removeNumber = async (id) => {
    await removePhoneNumber(id);
    const {data, error} = await getPhoneNumbers();
    setPhoneNumbers(data);
  }

  return (
    <div>
      <h2 className={`text-3xl my-3 text-center ${theme === 'light' ? "text-black" : "text-white"}`}>Phone Numbers</h2>
      <form
        className="flex items-center flex-col justify-center"
        onSubmit={(event) => handleAddNumber(event)}
      >
        <Form newNumber={newNumber} setNewNumber={setNewNumber} newName={newName} setNewName={setNewName}/>
        <button className="bg-[#6C757D] text-white rounded p-1 mt-2 hover:opacity-60" type="submit">Save</button>
      </form>
      <div className="flex justify-center flex-col items-center sm:flex-row mt-[20px]">
        {phoneNumbers?.length > 0 && phoneNumbers[0]?.name !== null && phoneNumbers?.map((item, index) =>(
          <div
            className={`w-[250px] rounded mx-[20px] mb-[15px] py-[20px] shadow-[rgba(0,0,0,0.35)_0px_5px_15px] flex flex-col items-center
            ${theme === 'light' ? "bg-[#fff]" : "bg-[#27374D]"}`
          }>
            <p className="bg-[#54aced] text-white px-[8px] rounded">#{index + 1}</p>
            <p
              className={`pt-[10px] font-bold text-[20px]
              ${theme === 'light' ? "text-black" : "text-[#DDE6ED]"}`
            }>
              {item?.name}
            </p>
            <div className="text-slate-400 flex">
              <img  className="w-[26px] h-[26px] mr-[5px]" src={Call} alt="Phone icon" />
              {item?.number}
            </div>
            <button className="bg-[#DC3444] text-white rounded p-1 mt-2 hover:opacity-60" onClick={() => removeNumber(item?.id)}>Delete</button>
          </div>
        ))}
      </div>
      {(phoneNumbers?.length > 0 || phoneNumbers?.length === 0)  &&  (phoneNumbers[0]?.name === null || phoneNumbers[0]?.name === undefined) && (
        <div className="sm:w-1/4 bg-[#131112] sm:mx-auto sm:mt-[50px] text-center p-5 rounded-[10px]">
          <p className={`text-white`}>No numbers registered yet</p>
        </div>
      )}
      <Header />
    </div>
  )
}

export default PhoneBox;