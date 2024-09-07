import React, { useState } from 'react';

const Component = ({ image, name, data }) => {
  const [isActive, setIsActive] = useState(false);
  const PP = image === ""  || image === undefined ? "" : image
  return (
    <div className="border-[1px] border-[#D3D4D4] rounded-lg p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-base font-semibold text-[#292929]">{name}</p>
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
      {data === null ? (
        <div>
          {isActive && <hr className="my-2 border-[#D3D4D4]" />}
          {isActive && (
            <p className="font-semibold text-lg mt-2">
              Tidak ada KJPP / Notaris di Sekitar Kantor Wilayah yang anda pilih!
            </p>
          )}
        </div>
      ) : (
        <>
          {isActive && <hr className="my-2 border-[#D3D4D4]" />}
          {isActive && (
            <div
              className={`${
                data.length > 5 ? 'max-h-60 overflow-y-auto' : ''
              }`}
            >
              {data?.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <p className="text-[#292929] mt-2 font-semibold text-base">{item?.Nama}</p>
                  <p className="text-[#777777] mt-2 font-normal text-base">{item?.Deskripsi}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Component;
