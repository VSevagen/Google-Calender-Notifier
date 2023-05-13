import React from "react";

const Pagination = ({setPage, currentPage, totalPosts, postPerPage}) => {
  const paginationNums = [];
  for(let i=1; i<=Math.ceil(totalPosts?.length/postPerPage); i++) {
    paginationNums.push(i);
  }

  console.log(paginationNums, totalPosts, postPerPage);

  return (
    <div>
      {paginationNums.map((ele) => (
        <button disabled={ele === currentPage} onClick={() => {
          setPage(ele);
        }}>{ele}</button>
      ))}
      {/* {currentPage !== 1 &&
        <button onClick={() => {
          setPage((prev) => prev - 1)
        }}>Prev</button>
      }

      <button onClick={() => {
        setPage((prev) => prev + 1);
      }}>Next</button> */}
    </div>
  )
}

export default Pagination;