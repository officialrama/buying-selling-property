import React from 'react';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { decryptStr } from '../../../../../helpers/encryptDecrypt';
import { Button } from 'flowbite-react';

function Component({ title, desc, btnBottom }) {
  const saState = useSelector((state) => state.superAdminReducer);
  const stateLogin = useSelector((state) => state.loginReducer);
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-6">
      <div className=''>
        <img src="/images/success-register.svg" alt="icon-park_success" className='h-[148px]'/> : <></>
      </div>
      <p className='text-2xl text-[#292929] font-bold'>
      Verifikasi Berhasil
      </p>
      <p className='text-[#666666] text-center text-base font-medium'>
      Akun Homespot kamu sudah aktif. Atur preferensimu dulu agar lebih mudah beli properti.
      </p>
      <Button
          className="bg-[#1078CA] text-[#FFFFFF] text-base w-[384px] h-[48px] font-bold whitespace-nowrap"
          paddingSize={"padding-0"}
          onClick={() => window.location.href = saState.msgsuccessRegisterV2}
        >
          Atur Preferensi Properti
        </Button>
    </div>
  );
};

Component.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  btnBottom: PropTypes.any
};

Component.defaultProps = {
  title: "",
  desc: "",
  btnBottom: (<></>)
};

export default Component;