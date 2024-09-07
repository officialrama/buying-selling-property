import React from 'react';

const Component = ({name, href, active}) => {
  return (
      <div className={`flex overflow-hidden rounded-lg bg-[#F8F9F9] ring-gray-900/5 w-[204px] ${active ? 'border-[#1078CA]' : ''}`}>
            <div className={`group relative rounded-lg p-4 bg-[#F8F9F9]  w-[204px] ${active ? 'border-[#1078CA] border-2' : ' border border-[#D3D4D4]'}`}>
              <div>
                <a href={href} className={` text-base w-full ${active ? 'text-[#1078CA] font-bold' : 'text-[#292929] font-medium'}`}>
                  {name}
                  <span className="absolute inset-0" />
                </a>
              </div>
            </div>
      </div>
  );
};

export default Component;
