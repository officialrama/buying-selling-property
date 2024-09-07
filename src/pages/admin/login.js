import React from "react";
import { Textbox } from "../../components/molecules";
import Button from "./../../components/atoms/Button/Component";

const AuthLogin = () => {
  const onSubmit = () => {
    window.location.href = "/admin/monitoring-status-user";
  };

  return (
    <div className="bg-[#F2F5F7] h-screen grid gap-0 grid-cols-2">
      <div className="bg-gradient-to-b from-[#0E71BE] to-[#07447B]">
        <div className="mt-[100px]">
          <img
            alt="img"
            src="/images/bri-logo.png"
            className="w-[190px] h-[72px] m-auto"
          />
        </div>
        <div className="relative w-full mt-[100px]">
          <img
            src="/images/img-login.png"
            alt="img"
            className="w-[445px] h-[297px] z-10 absolute m-auto left-0 right-0"
          />
          <img
            src="/images/top-pattern.png"
            alt="img"
            className="w-[395px] h-[395px] z-0 absolute top-[-49px] left-[55px]"
          />
          <img
            src="/images/bot-pattern.png"
            alt="img"
            className="w-[345px] h-[395px] z-0 absolute right-[20px] top-[10px]"
          />
        </div>
      </div>
      <div>
        <div className="bg-white w-9/12 m-auto mt-[150px] p-[32px]">
          <h1 className="text-[#00529C] text-[48px] font-semibold">
            Selamat Datang
          </h1>
          <p className="text-[#00529C] text-[18px]">
            Silahkan masukan Email dan Password untuk login
          </p>
          <div className="mt-[32px]">
            <Textbox label="Email" placeholder="Email" typeInput="text" />
          </div>
          <div className="mt-[32px]">
            <Textbox
              label="Password"
              placeholder="Password"
              typeInput="password"
              isPassword={true}
            />
          </div>
          <Button
            buttonColor="blue"
            textColor="white"
            className="mt-[32px]"
            fullWidth={true}
            paddingSize={"padding-1"}
            onClick={onSubmit}
          >
            Masuk
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
