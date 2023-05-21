import React from "react";

const Pagination = ({setPage, currentPage, totalPosts, postPerPage}) => {
  const paginationNums = [];
  for(let i=1; i<=Math.ceil(totalPosts?.length/postPerPage); i++) {
    paginationNums.push(i);
  }

  return (
    <div className="mt-[10px]">
      {paginationNums.map((ele) => (
        <button className={`mx-2 px-3 py-1 text-white rounded ${ele === currentPage ? "bg-cyan-950" : "bg-sky-500"}`} disabled={ele === currentPage} onClick={() => {
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