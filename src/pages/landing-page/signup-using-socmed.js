import React, { useEffect, useState } from "react";
import { Checkbox } from "../../components/molecules";
import { Button } from "../../components/atoms";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signupSocmed } from "../../store/actions/fetchData/socialMedia";
import Dashboard from ".";

const SignupUsingSocmed = () => {
    const dispatch = useDispatch();
    const [queryParam] = useSearchParams();
    const [tnc, setTnc] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleChekbox = (e) => {
        setTnc(e.target.checked);
    };

    const handleSignUp = () => {
        let data = {
            email       : queryParam?.get("email"),
            platform    : queryParam?.get("platform"),
            name        : queryParam?.get("name"),
            validation  : queryParam?.get("validation")
        };
        dispatch(signupSocmed(data, dispatch));
    }

    const navigateToDashboard = () => {
        navigate('/');
    }


    return (
        <div>
            <center>
                <div style={{ marginTop: "50px" }}>
                    <img src="/icons/logo.svg" alt="img" /><br /><br />
                    <div className="max-w-lg border p-4 border-[#E4E7EC] rounded-2xl mobile:mx-auto flex flex-col mobile:w-10/12 w-full bg-white shadow-2xl;">
                        <div className="flex items-center gap-2">
                            {queryParam?.get("platform") === "google" ? <img src="/icons/google_g_30.svg" /> : <img src="/icons/facebook-logo.svg" width="30px" height="30px" />}
                            <div>
                                <p style={{ textAlign: "left"}} className="mb-2 mobile:text-sm">Apakah kamu ingin membuat akun Homespot menggunakan email {queryParam?.get("email")} ?</p>
                                <Checkbox
                                    onChange={(e) => handleChekbox(e)}
                                    checked={tnc}
                                    fontSize="sm"
                                    label={<label className="mobile:text-sm text-left"><p style={{ textAlign: "left"}}>Saya menyetujui <a style={{ color: "blue" }} href="/terms-and-conditions" target="_blank" className="mobile:text-sm">Syarat dan Ketentuan</a> dan  <a target="_blank" style={{ color: "blue" }} href="/privacy-policy" className="mobile:text-sm">Kebijakan Privasi</a></p></label>}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="flex items-right gap-2 bottom-0 right-0" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button className={"shadow-md rounded"} buttonColor="white" textColor="black" onClick={navigateToDashboard}>Cancel</Button>
                            <Button disabled={tnc === true ? false : true} onClick={() => handleSignUp(queryParam?.get("email"))}>Buat Akun</Button>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default SignupUsingSocmed;