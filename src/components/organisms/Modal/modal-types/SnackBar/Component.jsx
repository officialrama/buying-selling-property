import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Snackbar = ({ message, timeout = 20000, status, refreshPage=false}) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const checkLocalStorage = () => {
      const showSnackbar = localStorage.getItem('snackBarSucces');
      if (showSnackbar === 'true') {
        setVisible(true);
        const timer = setTimeout(() => {
          setVisible(false);
          localStorage.setItem('snackBarSucces', 'false');
          if(refreshPage){
            navigate(0)
          }
        }, timeout);
        return () => clearTimeout(timer);
      } else {
        setVisible(false);
      }
    };

    checkLocalStorage();
    const interval = setInterval(() => {
      checkLocalStorage();
    }, 1000);
    return () => clearInterval(interval);
  }, [timeout, status]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('snackBarSucces', 'false');
    if(refreshPage){
      navigate(0)
    }
  };

  return (
    <div className='fixed top-[65px] xxl:left-[28%] largePc:left-[43%] mobile:left-[50%] xxl:h-[42px] largePc:h-[42px] mobile:h-[55px] mobile:w-[380px] z-40' style={{ display: visible ? 'block' : 'none', transform: 'translateX(-50%)', backgroundColor: '#E1F8EB', color: '#27AE60', padding: '12px', borderRadius: '4px', maxWidth: '700px'}}>
      <div className='flex flex-row'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clip-path="url(#clip0_12234_4647)">
            <path d="M8.00065 1.3335C4.32065 1.3335 1.33398 4.32016 1.33398 8.00016C1.33398 11.6802 4.32065 14.6668 8.00065 14.6668C11.6807 14.6668 14.6673 11.6802 14.6673 8.00016C14.6673 4.32016 11.6807 1.3335 8.00065 1.3335ZM6.19398 10.8602L3.80065 8.46683C3.54065 8.20683 3.54065 7.78683 3.80065 7.52683C4.06065 7.26683 4.48065 7.26683 4.74065 7.52683L6.66732 9.44683L11.254 4.86016C11.514 4.60016 11.934 4.60016 12.194 4.86016C12.454 5.12016 12.454 5.54016 12.194 5.80016L7.13398 10.8602C6.88065 11.1202 6.45398 11.1202 6.19398 10.8602Z" fill="#27AE60"/>
          </g>
          <defs>
            <clipPath id="clip0_12234_4647">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span className='font-medium text-[#525252] px-2' style={{fontSize: '12px', lineHeight: '18px'}}>{message} <button className='mobile:hidden' style={{ float: 'right', backgroundColor: 'transparent', border: 'none', color: '#27AE60', cursor: 'pointer', paddingLeft:'8px' }} onClick={handleClose}>X</button></span>
      </div>
    </div>
  );
};

export default Snackbar;
