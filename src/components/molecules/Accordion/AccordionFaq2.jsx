import React, { useState } from 'react';

const AccordionFaq2 = ({ question, children, image }) => {
  const [isActive, setIsActive] = useState(false);
  const PP = image === ""  || image === undefined ? "" : image
  return (
    <div className="border-[1px] border-[#D3D4D4] rounded-lg p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-base text-[#292929]">{question}</p>
        {isActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      {isActive && <hr className="my-2 border-[#D3D4D4]" />}
      {isActive && <div>{children}</div>}
      {isActive && <div className="mt-2 object-contain relative max-w-[100%] max-h-[100%] w-auto h-auto flex justify-center">
           {PP !== "" ?    
          <img className="w-[380px] h-[190px] rounded-lg" src={PP} />
          : <div></div>}
        </div>}
    </div>
  );
};

export default AccordionFaq2;
