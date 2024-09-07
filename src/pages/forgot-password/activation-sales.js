import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormForgotPassword from "../../components/organisms/Form/forgot-password";
import { Oval } from "react-loader-spinner";
import { Button } from '../../components/atoms';
import { activationSales } from '../../store/actions/fetchData/userState';
import { SET_ACTIVATION } from '../../store/actions/types';
import NewPassword from './new-password';
import { useDispatch, useSelector } from 'react-redux';

const ActivationSales = () => {
    const dispatch = useDispatch();
    const srState = useSelector((state) => state.stateReducer);
    const navigate = useNavigate();

    useEffect(() => {
        const urlEncoded = (window.location.href).replace("http://localhost:3000/", "http://172.17.0.186/");
        const email = urlEncoded.substring(urlEncoded.lastIndexOf('/') + 1);
        dispatch(activationSales(email, urlEncoded));
    }, []);

    const handleNavigate = () => {
        if (srState.messageError === "") {
            navigate('/', { replace: true });
        } else if (srState.messageError === "Maaf, Anda sudah mencapai batas input kode OTP. Coba kembali dalam waktu 1x24 jam.") {
            navigate('/', { replace: true });
        } else {
            dispatch({ type: SET_ACTIVATION, activation: true });
        }
    }
    return (
        <div className="forgot-pass__basePage">

            {srState.activation === true ? (
                <FormForgotPassword title="Masukkan Kode OTP" bodyType="otp" />
            ) : srState.activation === false ? (

                <div className="forgot-pass__baseForm">
                    <form className="forgot-pass__form__bodyForm__formBase">
                        <div className="forgot-pass__form__bodyForm__doneChangePass__wrapper">
                            <div className="forgot-pass__form__bodyForm__doneChangePass__circle">
                                <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupFailed/icon-park_error.png" alt="icon-park_failed" />
                            </div>
                            <div className="forgot-pass__form__bodyForm__doneChangePass__textWrap">
                                <p className="forgot-pass__form__bodyForm__doneChangePass__title">
                                    Aktivasi Gagal
                                </p>
                                <p className="forgot-pass__form__bodyForm__doneChangePass__desc">
                                    {srState.messageError ? srState.messageError : "Link Verifikasi Email Tidak Valid / Sudah Mencapai Batas Permintaan"}
                                </p>
                            </div>
                            <div className="w-[50%]">
                                {/* <Link to="/"> */}
                                <Button
                                    buttonColor="blue"
                                    textColor="white"
                                    fullWidth={true}
                                    paddingSize={"padding-1"}
                                    onClick={handleNavigate}
                                >
                                    Kembali
                                </Button>
                                {/* </Link> */}
                            </div>

                        </div>
                    </form>
                </div>
            ) : srState.activation === "newPassword" ? (
                <NewPassword action="activate" user="user" />
            ) : (
                <div className="forgot-pass__baseForm">
                    <form className="forgot-pass__form__bodyForm__formBase">
                        <div className="forgot-pass__form__bodyForm__doneChangePass__wrapper">
                            <Oval
                                wrapperclassName="loader__oval"
                                ariaLabel="loading-indicator"
                                height={100}
                                width={100}
                                strokeWidth={5}
                                color="#00529C"
                                secondaryColor="#bbd7f0"
                            />

                        </div>
                    </form>
                </div>
            )}

            <p className="forgot-pass__copyright">© {new Date().getFullYear()} PT. Bringin Inti Teknologi (BIT) | All Rights Reserved.</p>
        </div>
    );
};

export default ActivationSales;