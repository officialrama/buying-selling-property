import React, { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

const Component = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <Oval
            ariaLabel="loading-indicator"
            height={100}
            width={100}
            strokeWidth={5}
            secondaryColor="#E4E7EC"
            color="#00529C"
          />
        </div>
      </div>
    </div>
  );
};

export default Component;