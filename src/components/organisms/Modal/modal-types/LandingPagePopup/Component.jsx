import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { bannerFetch } from '../../../../../store/actions/fetchData/landing-page';


const Component = ({dynamicPopUp, showPopup, setShowPopup}) => {
  const closeModal = () => {
    setShowPopup(false)
  }
  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
      <div className="relative w-[30rem] h-[27rem] my-6 mx-auto max-w-3xl mb-[10rem] mobile:mb-[0rem]">
      <button
                className="bg-transparent border-0 text-black ml-[28rem] mobile:ml-[85vw]"
                onClick={closeModal}
              >
                <img src="/icons/Close_Circle.svg" alt="Close Button"/>
              </button>
              <a href={dynamicPopUp?.[0]?.url}> 
       <img src={dynamicPopUp?.[0]?.src}>
       </img>
       </a>
      </div>
    </div>
    </div>
  );
};

export default Component;