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
        {saState.successPengajuan ? <img src="/images/success-pengajuan.png" alt="icon-park_success" className='h-[148px]'/> : <></>}
      </div>
      <p className='text-2xl text-[#292929] font-bold'>
      Pengajuan Asuransi Berhasil
      </p>
      <p className='text-[#666666] text-center text-base font-medium'>
      Pengajuanmu telah kami terima. Mohon tunggu sampai petugas kami menghubungimu, ya!
      </p>
      <Button
          className="bg-[#1078CA] text-[#FFFFFF] text-base w-[384px] h-[48px] font-bold whitespace-nowrap"
          paddingSize={"padding-0"}
          onClick={() => window.location.href = saState.msgSuccessPengajuan}
        >
          Kembali ke Home
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