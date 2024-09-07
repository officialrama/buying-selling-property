import classNames from "classnames";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { TextColor } from "../../components/theme/text/text";

const VirtualAccount = ({inputs, itemBriva, setItemBriva}) => {

    const dispatch = useDispatch();
    const [item, setItem] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [state, setState]= useState({
        value: '',
        copied: false,
      })

    return (
        <div>
            <div className="kprApproval__pages__summary__wrapper">
                <div className="field-persn-data">
                    <p className={classNames("field-persn-data__field", `text-[${TextColor.black}]`)}>Nomor Virtual Account</p>
                    <p style={{display:"flex"}}>{itemBriva?.data?.responseData?.brivaNo}{itemBriva?.data?.responseData?.custCode}
                        <CopyToClipboard text={`${itemBriva?.data?.responseData?.brivaNo}${itemBriva?.data?.responseData?.custCode}`} onCopy={() => setState({copied: true})}>
                            <button style={{color: "#EF3F3A", display:"flex", marginLeft:"5px"}}>
                                <img src="/icons/small-icons/copy.svg"
                                    alt="icon-copy"/>
                                <p style={{marginLeft:"3px", marginRight:"5px"}}>Salin</p>
                            </button>
                        </CopyToClipboard>
                    </p>
                    {state.copied ? <span style={{color: 'gray'}}>(Berhasil Tersalin).</span> : null}
                </div>
                <h1><b>Cara Pembayaran</b></h1>
                <div>
                    <p>1. Masukan kartu debit BRI dan PIN anda</p>
                    <p>2. Pilih Menu Transaksi lainnya {'>'} pembayaran {'>'} lainnya {'>'} BRIVA </p>
                    <p>3. Masukan X angka kode perusahaan untuk developer (XXXX) dan No hp yang terdaftar</p>
                    <p>4. Simpan struk sebagai bukti pembayaran</p>
                </div>
                <div className="mb-[3.5rem]" />
            </div>
        </div>
    );
}

export default VirtualAccount;