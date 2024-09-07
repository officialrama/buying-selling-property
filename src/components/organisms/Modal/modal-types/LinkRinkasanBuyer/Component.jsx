/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import useWindowDimensions from '../../../../../utils/dimensions';
import { Button } from '../../../../atoms';
import { Textbox } from '../../../../molecules';
import { encryptStr, encryptStrFe } from '../../../../../helpers/encryptDecrypt';

const RingkasanBuyer = (otherProps) => {
  const { width } = useWindowDimensions();
  const url = window.location.hostname+`/payment/${(encodeURIComponent(encryptStr(otherProps?.otherProps)))}` ;

  return (
      <>  
      <div className="ml-3 text-sm font-normal ">
        <span className='fontweight__semibold'>Bagikan link ini ke pelanggan</span>
        <Textbox value={url} ></Textbox>
        <br></br>
        <CopyToClipboard text={url}>
          <Button buttonColor="blue" textColor="white">
            {width >= 770 ? "Salin" : "Salin"}
          </Button>
        </CopyToClipboard>
      </div>
    </>
  )
}

export default RingkasanBuyer;
