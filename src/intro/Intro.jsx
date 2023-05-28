import React from 'react';
import Search from '../assets/search.png';
import { ThemeContext } from '../AppWrapper';

const Intro = () => {

  const { theme } = React.useContext(ThemeContext);
  const [tokenPresent] = React.useState(window?.localStorage?.getItem('access_token'));
  
  return (
    <>
    {!tokenPresent &&
      <button 
        className={`rounded py-[10px]
          ${theme === 'light' ? "bg-[#fff]" : "bg-[#27374D]"}
          ${theme === 'light' ? "text-[#444]" : "text-white"}
          p-2
          shadow-[1px_1px_1px_grey] border-[1px] border-[#888] hover:opacity-[0.6]`}
        onClick={
          () => {
            if(window && window?.activateSignIn) {
              window.activateSignIn();
            }
          }
        }>
        <img className="w-[25px] h-[25px] icon inline mr-[10px]" src={Search}></img>
        <span className="buttonText">Sign in with Google</span>
      </button>}
    </>
  )
}

export default Intro;