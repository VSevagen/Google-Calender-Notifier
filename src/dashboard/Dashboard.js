import React, { useContext } from 'react';
import './Dashboard.css';
import Card from './Card';
import Pagination from './Pagination';
import styled from 'styled-components';

import Search from '../assets/search.png';
import { NumberContext } from '../App';
const CardMainContainer = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: center;
 margin: 0 10px 0 10px;
 @media(max-width: 992px) {
  margin-bottom: 100px;
 }
`;

const GoogleButton = styled.button`
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
  :hover {
    opacity: 0.6;
  }
`;

const GoogleImage = styled.img`
display: inline-block;
vertical-align: middle;
width: 25px;
height: 25px;
padding-right: 10px;
`;

const Dashboard = ({events}) => {
  const phoneNumbers = useContext(NumberContext)
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = events?.slice(indexOfFirstPost, indexOfLastPost)

  let numbers = [];
  phoneNumbers?.forEach(element => {
    if(element?.number !== null) {
      numbers.push(element?.number);
    }
  });

  const [tokenPresent] = React.useState(window?.localStorage?.getItem('access_token'));
  return (
    <div>
      <h2 className="text-2xl my-2">Your meetings</h2>
      {!tokenPresent && <GoogleButton onClick={
        () => {
          if(window && window?.activateSignIn) {
            window.activateSignIn();
          }
        }
      }>
        <GoogleImage src={Search} className="icon"></GoogleImage>
        <span className="buttonText">Sign in with Google</span>
      </GoogleButton>}
      <CardMainContainer>
        {currentPosts &&
          currentPosts.map((item) => (
            <Card item={item} phoneNumbers={numbers}/>
          ))
        }
      </CardMainContainer>
      <Pagination setPage={setCurrentPage} currentPage={currentPage} totalPosts={events} postPerPage={postPerPage}/>
    </div>
  );
}

export default Dashboard;
