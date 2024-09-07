import React from 'react';

const HorizontalLineWithText = ({text}) => {
  return (
    <div className="flex space-x-2 w-full my-3 items-center">
      <span className="bg-gray-300 h-px flex-1 " />
      <span className="p-2 uppercase text-xs text-gray-400 font-semibold">{text}</span>
      <span className="bg-gray-300 h-px flex-1  " />
    </div>
  );
};

export default HorizontalLineWithText;