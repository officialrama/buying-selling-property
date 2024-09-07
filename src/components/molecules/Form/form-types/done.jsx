/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { activateAcc } from "../../../../store/actions/fetchData/userState";
import { Button } from "../../../atoms";


const FBDoneChangePass = ({ action, user, paramId }) => {
  const [queryParam] = useSearchParams();
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [activate, setActivate] = useState({
    txt: "",
    state: ""
  });
  useEffect(() => {
    if (user === "visitor") {
      // dispatch(activateAcc(paramId, setActivate, activate, queryParam.get("user")));
      cookie.remove("jwt");
      setActivate({
        ...activate,
        txt: "Selamat akun Anda telah berhasil diaktivasi. Silahkan login menggunakan aplikasi atau melalui web",
        state: true
      })
    } else if (user === "user") {
      cookie.remove("jwt");
      setActivate({
        ...activate,
        txt: "Selamat akun Anda telah berhasil diaktivasi. Silahkan login menggunakan aplikasi atau melalui web",
        state: true
      })
    } else {
      cookie.remove("jwt");
      setActivate({
        ...activate,
        state: true
      })
    }
  }, [dispatch, paramId, user]);
  return (
    <div>
      <form className="forgot-pass__form__bodyForm__formBase">
        <div className="forgot-pass__form__bodyForm__doneChangePass__wrapper">
          {activate.state === "" ? (
            <Oval
              wrapperclassName="loader__oval"
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              color="#00529C"
              secondaryColor="#bbd7f0"
            />
          ) : (
            <>
              <div className="forgot-pass__form__bodyForm__doneChangePass__circle">
                {activate.state ?
                  <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupSuccess/icon-park_success.svg" alt="icon-park_success" />
                  :
                  <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupFailed/icon-park_error.png" alt="icon-park_failed" />
                }
              </div>
              <div className="forgot-pass__form__bodyForm__doneChangePass__textWrap">
                <p className="forgot-pass__form__bodyForm__doneChangePass__title">
                  {activate.state ? "Berhasil" : "Gagal"}
                </p>
                <p className="forgot-pass__form__bodyForm__doneChangePass__desc">
                  {action === "activate" ? activate.txt : "Selamat password baru Anda berhasil diatur ulang"}
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
                    Masuk
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default FBDoneChangePass;
