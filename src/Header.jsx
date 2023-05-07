import React from "react";
import styled from "styled-components"
import Home from './assets/home.png';
import Stats from './assets/bar-chart.png';
import Phonebook from './assets/phonebook.png';
import WhitePhonebook from './assets/phonebook-white.png';
import Whitehome from './assets/home-white.png';
import WhiteStats from './assets/bar-chart-white.png';

const HeaderWrapper = styled.header`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  background-color: white;
  display: block;
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
  /* color: #3F78B0; */
  background-color: ${props => props.pageActivated ? '#DC3444' : ''};
  color: ${props => props.pageActivated ? 'white' : '#3F78B0'};

  @media(min-width: 992px) {
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    border-radius: 50%;
    min-width: 95px;
    min-height: auto;
  }
`;

const HeaderImg = styled.img`
  width: 23px;
  height: 23px;
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

  return (
    <HeaderWrapper>
      <HeaderItemsWrapper>
        <HeaderItem href="/" pageActivated={determineUserLocation('/')}>
          <HeaderImg src={determineUserLocation('/') ? Whitehome : Home}/>
          <span>Homepage</span>
        </HeaderItem>
        <HeaderItem href="/phonebox" pageActivated={determineUserLocation('/phonebox')}>
          <HeaderImg src={determineUserLocation('/phonebox') ? WhitePhonebook : Phonebook}/>
          <span>Phonebook</span>
        </HeaderItem>
        <HeaderItem href="/stats" pageActivated={determineUserLocation('/stats')}>
          <HeaderImg src={determineUserLocation('/stats') ? WhiteStats : Stats}/>
          <span>Stats</span>
        </HeaderItem>
      </HeaderItemsWrapper>
    </HeaderWrapper>
  )
}

export default Header;