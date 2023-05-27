import React from 'react';
import { Dna } from "react-loader-spinner";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Form = ({newNumber, setNewNumber, newName, setNewName}) => {
  const [countryEnabled, setCountryEnabled] = React.useState(null);

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

  return (
    <>
      {countryEnabled ?
      <>
        <input className="mb-[10px] p-[10px] w-[300px] h-[35px] border-slate-400 border-[1px] rounded" type="text" placeholder="Enter name" value={newName} onChange={(event) => setNewName(event.target.value)} required/>
        <PhoneInput
          country={countryEnabled ? JSON.parse(countryEnabled?.countries)?.[0] : []}
          value={newNumber}
          onChange={(phone) => {
            setNewNumber("+" + phone)
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
    </>
  )
};

export default Form;