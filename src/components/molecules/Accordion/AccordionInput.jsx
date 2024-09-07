import React, { useState } from 'react'

const Component = ({title, children, classesName}) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-6">
      <div className="border border-gray-300 rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-3 py-2 border-gray-300 flex items-center justify-between focus:outline-none"
        >
          <span className={`${classesName}`}>{title}</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {isOpen && (
          <>
            {children}
          </>
        )}
      </div>
    </div>
  )
}

export default Component