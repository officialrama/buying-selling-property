/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../atoms';
import { TextboxLabel } from '../../../../molecules';
import useInputRefHooks from '../../../../../hooks/useInputRefHooks';
import { userReferralKPR } from '../../../../../store/actions/fetchData/salesReferral';
import useRegSalesHooks from '../../../../../hooks/useRegSalesHooks';
import { decryptStr } from '../../../../../helpers/encryptDecrypt';
import useREPassHooks from '../../../../../hooks/useREPassHooks';


const PaymentUser = (otherProps) => {
  // const {inputsRef, setInputsRef} = useInputRefHooks();
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const {inputs, editMode, setEditMode} = useRegSalesHooks();
  const { inputsRef, setInputsRef, handleName, handlePhoneNum} = useInputRefHooks();
  const inputArr = [
    inputsRef?.nameUser?.isValid,
    inputsRef?.mobilePhone?.isValid
];
// const url = window.location.href.split('/');
// const pathname = url.pop();
// console.log("okeini",pathname)

const closeModal = () => {
  setInputsRef({});
  setIsModal(false);
};
  return (
      <>
          <div className="forgot-pass_formbodyForm_formBase">
          <p className="forgot-pass_formbodyForm_textStyle">
            Masukan Data Diri
          </p>
          <div className='p-6 pt-2 pb-0 flex-auto max-h-[50vh] overflow-y-auto lg:w-[400px]'>
                            <div className='mb-4'>
                                <TextboxLabel 
                                topLabel= "Nama Lengkap" 
                                requiredStar={true} 
                                placeholder="Nama Lengkap" 
                                name="nameUser" 
                                value={inputsRef?.nameUser?.value} 
                                onChange={handleName}
                                warnText={inputsRef?.nameUser?.msgError}
                                />                    
                            </div>
                            <div className='mb-4'>
                                <TextboxLabel topLabel="No.HP" 
                                requiredStar={true} placeholder="08xxxxxxxxxx" name="mobilePhone" 
                                maxLength={13}
                                value={inputsRef?.mobilePhone?.value}
                                onChange={handlePhoneNum}
                                warnText={inputsRef?.mobilePhone?.msgError}
                                />
                            </div>    
                            {/* <div className='mb-4'>
                                <TextboxLabel topLabel="Properti ID" requiredStar={true} value={decodeURIComponent(pathname)}
                                    
                                />
                            </div>                */}
                        </div>
                        <Button btnTypes="submit" id="submitRef" name="submitRef" className="w-full" onClick={() => {
                        closeModal();
                        if (!editMode) {
                            dispatch(userReferralKPR(inputsRef));
                        } else {
                            dispatch(userReferralKPR(inputsRef));
                        }
                    }}>Simpan</Button>
        </div>
      </>
  )
}
export default PaymentUser;