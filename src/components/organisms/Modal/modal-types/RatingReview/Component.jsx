import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { userRating } from '../../../../../store/actions/fetchData/userState';
import { showSingleModal } from '../../../../../store/actions/changeState';

const Component = ()  => {
  const dispatch = useDispatch();
  const stateModal = useSelector((state) => state.stateReducer);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const isRatingValid = rating > 0;

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleKirimClick = () => {
    dispatch(userRating(rating, comment))
  };

  return (
    <div className='flex justify-center items-center p-[24px] mobile:p-[4px]'>
      <div className="text-center">
      {!window.location.pathname.includes("/kpr/approval") && !window.location.pathname.includes("/payment-success-visitor") ?
        <span className='text-[#777777] text-base mt-3 mb-4 mobile:w-[250px]'>Bagaimana pengalamanmu dalam menggunakan Homespot ?</span>
      : <span className='text-[#777777] text-base mt-3 mb-4 mobile:w-[250px]'>Bagaimana pengalamanmu dalam mengajukan KPR ? </span>
      }
      <br></br>
        <div className='flex flex-row justify-center mt-2'>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={i}>
              <input
                className='hidden'
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className="star inline-block"
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
           </label> 
              );
        })}
            </div> 
        <textarea
          className="mt-3 border-2 border-[#D3D4D4] rounded-lg h-[108px] mobile:w-[250px] w-[384px]"
          placeholder="Deskripsikan detail pengalamanmu di sini"
          value={comment}
          onChange={handleInputChange}
        />
        <button
          className={`rounded-lg mt-3 px-4 py-2 w-[384px] mobile:w-[250px] ${!isRatingValid ? "bg-[#B5B6B6] text-[#EAEBEB] cursor-not-allowed" : "bg-[#1078CA] text-white cursor-pointer"}`}
          onClick={handleKirimClick}
          disabled={!isRatingValid}
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default Component;
