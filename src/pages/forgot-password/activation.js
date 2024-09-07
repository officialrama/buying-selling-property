import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FormForgotPassword from "../../components/organisms/Form/forgot-password";
import { Oval } from "react-loader-spinner";
import { Button } from '../../components/atoms';
import { activationAcc } from '../../store/actions/fetchData/userState';
import NewPassword from './new-password';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVATION } from '../../store/actions/types';
import { fetchJwtToken } from '../../helpers/fetchApi';

const Activation = () => {
    const [queryParam] = useSearchParams();
    const dispatch = useDispatch();
    const srState = useSelector((state) => state.stateReducer);


    useEffect(() => {
        const email = queryParam.get("user");
        const urlEncoded = (window.location.href).replace("http://localhost:3000/", "https://homespotstaging.bitcorp.id/");

        if (window.location.pathname.includes("/visitor")) {
             dispatch({ type: SET_ACTIVATION, activation: true });
            // dispatch(activationAcc(decodeURI(email).replace(/\s/g, ''), decodeURI(urlEncoded).replace(/\s/g, ''), 2));
        } else {
            dispatch(activationAcc(decodeURI(email).replace(/\s/g, ''), decodeURI(urlEncoded).replace(/\s/g, ''), 1));
        }
    }, []);

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
                                    Link Verifikasi Email Tidak Valid / Sudah Mencapai Batas Permintaan
                                </p>
                            </div>
                            <div className="w-[50%]">
                                <Link to="/">
                                    <Button
                                        buttonColor="blue"
                                        textColor="white"
                                        fullWidth={true}
                                        paddingSize={"padding-1"}
                                    >
                                        Kembali
                                    </Button>
                                </Link>
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

export default Activation;