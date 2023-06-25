import React from 'react';
import './Dashboard.css';
import Card from './Card';
import Pagination from './Pagination';
import { ThemeContext } from '../AppWrapper';
import Intro from '../intro/Intro';

import { getPhoneNumbers } from '../supabaseHelper';

const Dashboard = ({events}) => {
  const [phoneNumbers, setPhoneNumbers] = React.useState([]);
  const { theme, tokenPresent } = React.useContext(ThemeContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(10);
  const dashRef = React.useRef(null);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = events?.slice(indexOfFirstPost, indexOfLastPost)

  React.useLayoutEffect(() => {
    (async () => {
      const {data, error} = await getPhoneNumbers();
      data?.forEach(element => {
        if(element?.number !== null) {
          setPhoneNumbers(prev => [...prev, element?.number]);
        }
      });
    })()
  })

  return (
    <div className="mb-[100px]">
      <h2 className={`text-4xl my-3 ${theme === 'light' ? "text-black" : "text-white"}`}>Your meetings</h2>
      <Intro tokenPresent={tokenPresent}/>
      <div ref={dashRef} className="flex flex-row mx-[5px] flex-wrap justify-center">
        {currentPosts &&
          currentPosts.map((item) => (
            <Card
              item={item}
              phoneNumbers={phoneNumbers}
            />
          ))
        }
      </div>
      {tokenPresent !== null && <Pagination setPage={setCurrentPage} currentPage={currentPage} totalPosts={events} postPerPage={postPerPage} reference={dashRef}/>}
    </div>
  );
}

export default Dashboard;
