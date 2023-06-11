import React from 'react';
import Search from '../assets/search.png';
import { ThemeContext } from '../AppWrapper';

const Intro = ({tokenPresent}) => {

  const { theme } = React.useContext(ThemeContext);

  return (
    <>
    {tokenPresent === null &&
      <div className={`text-[#f7f7ff] mx-4 sm:w-1/2 sm:mx-auto mt-[50px] sm:mt-[100px] bg-[#131112] px-3 py-5 rounded-[10px]`}>
        <ol>
          <li className="py-2">Sign in using your gmail account to access your meetings</li>
          <li className="py-2">In case, you're not able to sign in, please send an email to <strong>sevagenv@gmail.com</strong> with your primary email address</li>
        </ol>
        <button
          className={`
            rounded mt-[5px]
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
        </button>
      </div>
      }
    </>
  )
}

export default Intro;