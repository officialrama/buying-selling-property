import React, { useEffect, useState } from "react";
import {
  Modal,
  NavHeaderAdmin,
  SideMenuAdmin,
} from "../../components/organisms";
import _ from 'lodash-contrib';

const PksDeveloper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <NavHeaderAdmin
        menuOnClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <SideMenuAdmin
        title="Dashboard Report"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="user-ref__wrapper">
          <iframe
            title="Embedded Report"
            src="https://report-homespot.bitcorp.id/?page=pksdeveloper"
            width="100%"
            height="700px"
          ></iframe>
        </div>
      </SideMenuAdmin>
    </div>
  );
};

export default React.memo(PksDeveloper);
