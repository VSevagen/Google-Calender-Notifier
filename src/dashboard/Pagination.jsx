import React from "react";
import { ThemeContext } from "../AppWrapper";

const Pagination = ({setPage, currentPage, totalPosts, postPerPage, reference}) => {
  const paginationNums = [];
  const {theme} = React.useContext(ThemeContext);
  for(let i=1; i<=Math.ceil(totalPosts?.length/postPerPage); i++) {
    paginationNums.push(i);
  }

  const handleAnimation = (page) => {
    if(reference) {
      reference.current.classList.add(page > currentPage ? "slide-away" : "slide-away-reverse");
      setTimeout(() => {reference.current.classList.add(page > currentPage ? "hide-rightside" : "hide-leftside")}, 500);
      setTimeout(() => {reference.current.classList.add("slide-in")}, 600);
      setTimeout(() => {reference.current.classList.remove("slide-away", "slide-in", "hide-rightside", "slide-away-reverse", "hide-leftside")}, 1100);
    }
  }

  return (
    <div className="mt-[10px]">
      {currentPage !== 1 ?
        <button
          className={`mx-2 px-3 py-1 text-white rounded bg-[#a1a1aa]`}
          onClick={() => {
            if(currentPage !== 1) {
              handleAnimation(currentPage - 1);
              setTimeout(() => setPage(currentPage - 1), 500);
            }
          }}
        >
          &lt;
        </button>
        :
        ""
      }
      {paginationNums.map((ele) => (
        <button 
          className={`mx-2 px-3 py-1 text-white rounded 
            ${(ele === currentPage) ? "bg-[#4b5563]" : "bg-[#a1a1aa]"}`
          }
          disabled={ele === currentPage} 
          onClick={() => {
            handleAnimation(ele)
            setTimeout(() =>{setPage(ele)}, 500);
          }}>
            {ele}
          </button>
      ))}
      {currentPage !== paginationNums.length ?
        <button
          className={`mx-2 px-3 py-1 text-white rounded bg-[#a1a1aa]`}
          onClick={() => {
            if(currentPage !== paginationNums.length) {
              handleAnimation(currentPage + 1);
              setTimeout(() => setPage(currentPage + 1), 500);
            }
          }}
        >
          &gt;
        </button>
        :
        ""
      }
    </div>
  )
}

export default Pagination;