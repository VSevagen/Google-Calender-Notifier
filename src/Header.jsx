import React from "react";
import styled from "styled-components"
import Home from './assets/home.png';
import Stats from './assets/bar-chart.png';
import Phonebook from './assets/phonebook.png';

const HeaderWrapper = styled.header`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  background-color: white;
  display: block;
  position: fixed;
  width: 100%;
  bottom: 0;
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
  color: #3F78B0;
`;

const HeaderImg = styled.img`
  width: 23px;
  height: 23px;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderItemsWrapper>
        <HeaderItem href="/homepage">
          <HeaderImg src={Home}/>
          <span>Homepage</span>
        </HeaderItem>
        <HeaderItem href="/phonebox">
          <HeaderImg src={Phonebook}/>
          <span>Phonebook</span>
        </HeaderItem>
        <HeaderItem href="/stats">
          <HeaderImg src={Stats}/>
          <span>Stats</span>
        </HeaderItem>
      </HeaderItemsWrapper>
    </HeaderWrapper>
  )
}

export default Header;