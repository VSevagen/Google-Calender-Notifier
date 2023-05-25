import React, { useContext } from 'react';
import './Dashboard.css';
import Card from './Card';
import Pagination from './Pagination';

import Search from '../assets/search.png';
import { NumberContext } from '../App';
import { ThemeContext } from '../AppWrapper';

const Dashboard = ({events}) => {
  const phoneNumbers = useContext(NumberContext)
  const { theme } = React.useContext(ThemeContext);
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
      <h2 className={`text-4xl my-3 ${theme === 'light' ? "text-black" : "text-white"}`}>Your meetings</h2>
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
      <div className="flex flex-row mx-[5px] flex-wrap justify-center mb-[100px] sm:mb-[0px]">
        {currentPosts &&
          currentPosts.map((item) => (
            <Card item={item} phoneNumbers={numbers}/>
          ))
        }
      </div>
      <Pagination setPage={setCurrentPage} currentPage={currentPage} totalPosts={events} postPerPage={postPerPage}/>
    </div>
  );
}

export default Dashboard;
