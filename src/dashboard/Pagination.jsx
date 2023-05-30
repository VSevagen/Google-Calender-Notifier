import React from "react";
import { ThemeContext } from "../AppWrapper";

const Pagination = ({setPage, currentPage, totalPosts, postPerPage, reference}) => {
  const paginationNums = [];
  const {theme} = React.useContext(ThemeContext);
  for(let i=1; i<=Math.ceil(totalPosts?.length/postPerPage); i++) {
    paginationNums.push(i);
  }

  const handleAnimation = () => {
    if(reference) {
      reference.current.classList.add("slide-away");
      setTimeout(() => {reference.current.classList.add("hide-rightside")}, 500);
      setTimeout(() => {reference.current.classList.add("slide-in")}, 600);
      setTimeout(() => {reference.current.classList.remove("slide-away", "slide-in", "hide-rightside")}, 1100);
    }
  }

  return (
    <div className="mt-[10px]">
      {paginationNums.map((ele) => (
        <button 
          className={`mx-2 px-3 py-1 text-white rounded 
            ${(ele === currentPage) ? "bg-[#4b5563]" : "bg-[#a1a1aa]"}`
          } 
          disabled={ele === currentPage} 
          onClick={() => {
            handleAnimation()
            setTimeout(() =>{setPage(ele)}, 500);
          }}>
            {ele}
          </button>
      ))}
    </div>
  )
}

export default Pagination;