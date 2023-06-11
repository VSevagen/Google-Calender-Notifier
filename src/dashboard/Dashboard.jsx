import React, { useContext } from 'react';
import './Dashboard.css';
import Card from './Card';
import Pagination from './Pagination';

import { NumberContext } from '../App';
import { ThemeContext } from '../AppWrapper';
import Intro from '../intro/Intro';

const Dashboard = ({events}) => {
  const phoneNumbers = useContext(NumberContext)
  const { theme, tokenPresent } = React.useContext(ThemeContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(10);
  const dashRef = React.useRef(null);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = events?.slice(indexOfFirstPost, indexOfLastPost)

  let numbers = [];
  phoneNumbers?.forEach(element => {
    if(element?.number !== null) {
      numbers.push(element?.number);
    }
  });

  return (
    <div className="mb-[100px]">
      <h2 className={`text-4xl my-3 ${theme === 'light' ? "text-black" : "text-white"}`}>Your meetings</h2>
      <Intro tokenPresent={tokenPresent}/>
      <div ref={dashRef} className="flex flex-row mx-[5px] flex-wrap justify-center">
        {currentPosts &&
          currentPosts.map((item) => (
            <Card item={item} phoneNumbers={numbers}/>
          ))
        }
      </div>
      {tokenPresent !== null && <Pagination setPage={setCurrentPage} currentPage={currentPage} totalPosts={events} postPerPage={postPerPage} reference={dashRef}/>}
    </div>
  );
}

export default Dashboard;
