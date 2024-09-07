import React from 'react';
import _ from "lodash-contrib";
import Modal from '../../modal';
import { showModalRating } from '../../../../../store/actions/changeState';
import { useDispatch, useSelector } from 'react-redux';

const FloatingButtonRating = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stateReducer);
  return (
    <div className="group fixed bottom-0 right-0 p-2 flex items-end justify-end w-[48px] h-[48px] cursor-pointer">
        {state.showModalRating === true && (
        <Modal
          closeModal={() => dispatch(showModalRating(!state.showModalRating))}
          modalTypes="ratingReview"
          title=""
          disableScroll={false}
        />
      )}
      <div className="text-white shadow-xl flex flex-row gap-2 items-center justify-center p-3 rounded-full bg-[#F47104] z-50 absolute"
      onClick={() => {
      dispatch(showModalRating(true));
      }}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M12.133 13.4811H13.1768C13.6472 13.4811 14.0735 13.1968 14.2645 12.7555L16.8184 6.85761C17.1757 6.03205 17.9734 5.5 18.8535 5.5C20.3086 5.5 21.373 6.90887 21.0106 8.35539L20.1708 11.7075H25.0943C26.9273 11.7075 28.3021 13.4288 27.9426 15.2737L26.5126 22.6125C26.2411 24.0062 25.049 25.0093 23.6644 25.0093H12.133V13.4811Z" fill="#DDEFFC"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 13.6478C4 12.8244 4.65022 12.157 5.45233 12.157H9.90633C10.7084 12.157 11.3587 12.8244 11.3587 13.6477V25.0093C11.3587 25.8326 10.7084 26.5 9.90633 26.5H5.45233C4.65022 26.5 4 25.8326 4 25.0093V13.6478ZM9.08315 21.1334C9.5644 21.1334 9.95454 21.5339 9.95454 22.0278V22.7732C9.95454 23.2672 9.5644 23.6676 9.08315 23.6676C8.60189 23.6676 8.21175 23.2672 8.21175 22.7732V22.0278C8.21175 21.5339 8.60189 21.1334 9.08315 21.1334Z" fill="#DDEFFC"/>
      </svg>
      <div className='hidden group-hover:flex'>
      <span className="icon-text font-semibold text-lg text-[#DDEFFC] whitespace-nowrap">Nilai Layanan Homespot</span>
      </div>
      </div>
    </div>
  );
};

export default FloatingButtonRating;
