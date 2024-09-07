import React, {useEffect, useState} from "react";
import { Button } from "../../../components/atoms";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Footer } from "../../../components/molecules";
import { useDispatch } from "react-redux";
import { dokuTrigger } from "../../../store/actions/fetchData/salesReferral";
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt";

function SuccesBeli(){

    const [queryParam] = useSearchParams();
    const [condition, setCondition] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.time();
useEffect(() => {
   const id = queryParam.get("id").replaceAll(/\s/g, "+")
   dispatch(dokuTrigger(id,setCondition))
   
}, []);

useEffect(() => {
  if (condition !== "") {
    setTimeout(() => {
      navigate(`/`)
    }, 5000);
  }
}, [condition]);
console.timeEnd();
    return (
        <div>
          {condition === true ?(
          <div className="kprApproval__pages__done__bodyWrapper">
            <div className="kprApproval__pages__done__wrapper">
              <div className="kprApproval__pages__done__circle">
                <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupSuccess/icon-park_success.svg" alt="icon-park_success" />
              </div>
              <p className="kprApproval__pages__done__title">Berhasil</p>
              <p className="kprApproval__pages__done__desc">Pengajuan pembelian KPR Anda telah berhasil di ajukan, Invoice akan dikirimkan ke email yang terdaftar. Mohon untuk menunggu, kami akan segera menghubungi Anda.</p>
              <Button onClick={() => navigate(`/`)} buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-1"}>
              Lihat Pengajuan Lainnya
              </Button>
            </div>
          </div>)
          : (
          <div></div>
          )}
          {condition === false ?(
          <div className="kprApproval__pages__done__bodyWrapper">
          <div className="kprApproval__pages__done__wrapper">
            <div className="kprApproval__pages__done__fail items-center">
              <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupFailed/icon-park_error.png" alt="icon-park_failed" />
            </div>
            <p className="kprApproval__pages__done__title">Gagal</p>
            <p className="kprApproval__pages__done__desc">Pengajuan KPR Anda Gagal. Mohon maaf coba ulangi lagi.</p>
            <Button onClick={() => navigate(`/`)} buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-1"}>
            Lihat Pengajuan Lainnya
            </Button>
          </div>
        </div> ): ""}
        
          <Footer />
        </div>
      );
    };
export default SuccesBeli
