import React from 'react';

const Loader = () => {
  return (
    <div className="w-[100px] h-[100px] relative pl-[10px] border-[black] border-l-2 border-b-2">
      <div className="bar1"/>
      <div className="bar2"/>
      <div className="bar3"/>
      <div className="bar4"/>
    </div>
  )
}

export default Loader;