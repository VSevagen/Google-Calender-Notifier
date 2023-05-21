import React from "react";
import styled from "styled-components"

const HeaderWrapper = styled.header`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  display: block;
  background-color: #404040;
  position: fixed;
  width: 100%;
  bottom: 0;
  @media(min-width: 992px) {
    position: absolute;
    width: 50%;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 10%;
    border-radius: 25px;
  }
`;

const HeaderItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const HeaderItem = styled.a`
  padding: 20px 5px 20px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  @media(min-width: 992px) {
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    border-radius: 50%;
    min-width: 95px;
    min-height: auto;
  }
`;

const Header = () => {

  const determineUserLocation = React.useCallback((path) => {
    const location = window && window?.location?.pathname;
    if(path == location) {
      return true;
    } else {
      return false;
    }
  }, [window?.location?.pathname])

  const Brightness = (
    <svg className="w-[40px] h-[40px] p-[5px] outline-[#fbbf24] outline-2 outline rounded-[50%]" fill="#fbbf24" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
      <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm0-8c-1.65,0-3,1.35-3,3s1.35,3,3,3,3-1.35,3-3-1.35-3-3-3Zm1-5V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"/>
    </svg>
  );

  const Moon = (
    <svg className="w-[40px] h-[40px] p-[5px] outline-[#9ca3af] outline-2 outline rounded-[50%]" fill="#9ca3af" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
      <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"/>
    </svg>
  );

  const Home = (
    <svg className={`w-[40px] h-[40px] p-[5px] hover:fill-[#fff] ${determineUserLocation("/") ? "fill-[#fff]": "fill-[#9ca3af]"}`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
      <path d="M12,14a3,3,0,0,0-3,3v7.026h6V17A3,3,0,0,0,12,14Z"/><path d="M13.338.833a2,2,0,0,0-2.676,0L0,10.429v10.4a3.2,3.2,0,0,0,3.2,3.2H7V17a5,5,0,0,1,10,0v7.026h3.8a3.2,3.2,0,0,0,3.2-3.2v-10.4Z"/>
    </svg>
  );

  const PhoneBook = (
    <svg className={`w-[40px] h-[40px] p-[5px] hover:fill-[#fff] ${determineUserLocation("/phonebox") ? "fill-[#fff]": "fill-[#9ca3af]"}`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
      <path d="M20,0H3V3H1V5H3V7H1V9H3v2H1v2H3v2H1v2H3v2H1v2H3v3H20a3,3,0,0,0,3-3V3A3,3,0,0,0,20,0ZM13,4A3.5,3.5,0,1,1,9.5,7.5,3.5,3.5,0,0,1,13,4Zm6,14H17V16a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v2H7V16a3,3,0,0,1,3-3h6a3,3,0,0,1,3,3ZM11.5,7.5A1.5,1.5,0,1,1,13,9,1.5,1.5,0,0,1,11.5,7.5Z"/>
    </svg>
  );

  const Stats = (
    <svg className={`w-[40px] h-[40px] p-[5px] hover:fill-[#fff] ${determineUserLocation("/stats") ? "fill-[#fff]": "fill-[#9ca3af]"}`}  xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" width="512" height="512">
      <g>
        <path d="M257.209,65.285l-0.276-21.258h-21.258c-1.485-0.014-2.97-0.014-4.455,0C102.431,45.257-0.977,150.659,0.253,279.448   c1.23,128.79,106.632,232.197,235.421,230.967c128.729-0.141,233.052-104.455,233.205-233.183v-21.258H256.933L257.209,65.285z"/>
        <path d="M299.854,1.574L299.854,1.574l0,211.925h211.904C511.211,96.692,416.661,2.133,299.854,1.574z"/>
      </g>
    </svg>
  );

  return (
    <HeaderWrapper>
      <HeaderItemsWrapper>
        <HeaderItem href="/" pageActivated={determineUserLocation('/')}>
          {Home}
        </HeaderItem>
        <HeaderItem href="/phonebox" pageActivated={determineUserLocation('/phonebox')}>
          {PhoneBook}
        </HeaderItem>
        <HeaderItem href="/stats" pageActivated={determineUserLocation('/stats')}>
          {Stats}
        </HeaderItem>
        <button>
          {Moon}
        </button>
      </HeaderItemsWrapper>
    </HeaderWrapper>
  )
}

export default Header;