import React, {useState} from "react";
import { Button } from "../../../components/atoms";
import { useNavigate } from "react-router-dom";
import { NavHeaderSales } from "../../../components/organisms";
import { Footer } from "../../../components/molecules";

function FailBeli(){
    const navigate = useNavigate();
    // setTimeout(() => {
    //   navigate(`/`)
    // }, 5000);
    return (
        <div>
          <div className="kprApproval__pages__done__bodyWrapper">
            <div className="kprApproval__pages__done__wrapper">
              <div className="kprApproval__pages__done__fail items-center">
                <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupFailed/icon-park_error.png" alt="icon-park_failed" />
              </div>
              <p className="kprApproval__pages__done__title">Pembayaran UTJ Anda Gagal</p>
              <p className="kprApproval__pages__done__desc">Pembayaran UTJ Anda telah gagal. Mohon maaf coba ulangi lagi.</p>
              <Button onClick={() => navigate(`/`)} buttonColor="blue" textColor="white" fullWidth={false} paddingSize={"padding-1"}>
                Lihat Penjualan Lainnya
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      );
    };

export default FailBeli
