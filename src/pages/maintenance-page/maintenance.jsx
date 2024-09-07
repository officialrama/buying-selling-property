import React from "react";

const Maintenance = () => {

  return (
    <div className="h-screen flex mobile:flex-col items-center justify-center text-xl mobile:text-center">
      <div className="w-[300px] mobile:w-[200px] h-[300px] mobile:h-[200px]"><img src="/icons/under-maintenance.svg" width="100%" height="100%" /> </div>
      Kami akan segera kembali! <br /><br />
      Mohon maaf saat ini kami sedang melakukan pemeliharaan website<br /><br />
      - Tim Homespot<br />

    </div>
  );
};

export default Maintenance;
