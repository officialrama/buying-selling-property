import React from 'react'
import cookie from "hs-cookie";
import _ from "lodash-contrib";
import { Title } from '../../atoms'
import { showModalRating, showSingleModal } from '../../../store/actions/changeState';
import { useDispatch, useSelector } from 'react-redux';
import { decryptStr } from '../../../helpers/encryptDecrypt';
import { Modal } from '../../organisms';

const Footer = () => {
  const dispatch = useDispatch();
  const userStatus = _.isJSON(cookie.get("morgateCookie")) ? (JSON.parse(cookie.get("morgateCookie")).userType) : ""
  const visitor = decryptStr(userStatus)
  const state = useSelector((state) => state.stateReducer);
  return (
    <div className='footer__wrapper bg-[#0F78CB] pb-2'>
      <div className='footer__grid-footer pb-2'>
        <div className="footer__child-wrapper">
          <div className='mb-5'>
            <Title className="text-xl fontcolor__white fontweight__semibold" text="Kantor Pusat" />
          </div>
          <p className="text-xs fontcolor__white fontweight__normal">
            PT. Bringin Inti Teknologi (BIT) <br />
            Intiland Tower Lt 12A <br />
            Jalan Jenderal Sudirman No. 32 <br />
            Jakarta Pusat 10220 <br />
            Indonesia
          </p>
        </div>
        <div className="footer__child-wrapper mobile:mt-3">
          <div className='mb-5'>
            <Title className="text-xl fontcolor__white fontweight__semibold" text="Dukungan"/>
          </div>
          <div className='flex mb-6'>
            <p className="text-xs fontcolor__white fontweight__normal"><a href='/privacy-policy'>Kebijakan Privasi</a><br />
            <a href='terms-and-conditions'>Syarat dan Ketentuan</a><br />
            </p>
          </div>
          {/* <div className='flex mb-6'>
          <p className="text-xs fontcolor__white fontweight__normal"></p>
          </div> */}
        </div>
        <div className="footer__child-wrapper">
          <div className='mb-5'>
            <Title className="text-xl fontcolor__white fontweight__semibold" text="Hubungi Kami" />
          </div>
          <div className='flex mb-1'>
            <img className="mr-2" src="/icons/small-icons/wa-icon-white.png" alt="wa-icon" style={{width: '17px', height: '17px'}}/>
            <p className="text-xs fontcolor__white fontweight__normal">+62 813-8900-1162</p>
          </div>
          <div className='flex mb-1'>
            <img className="mr-2" src="/icons/small-icons/email-white.svg" alt="email" style={{width: '17px', height: '17px'}} />
            <p className="text-xs fontcolor__white fontweight__normal">support@homespot.id</p>
          </div>
        </div>
        <div className="footer__child-wrapper mobile:mt-[25px] ">
          <div className="mb-5">
            <Title className="text-xl fontcolor__white fontweight__semibold" text="Homespot by : " />
            <img className="flex-none w-[110px]" src="/images/logo bit.png" alt="BRIIT" />
          </div>
          </div>
          <div className="footer__child-wrapper mobile:mt-[25px] ">
          <div className="mb-5">
            <Title className="text-xl fontcolor__white fontweight__semibold mb-4" text="Powered by :" />
            <img className="flex-none w-[90px] pt-2" src="/images/bri-logo.png" alt="BRIIT" />
          </div>
          </div>
      </div>
    </div>
  )
}

export default Footer
