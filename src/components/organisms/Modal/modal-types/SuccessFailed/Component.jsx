import React from 'react';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { decryptStr } from '../../../../../helpers/encryptDecrypt';

function Component({ title, desc, btnBottom }) {
  const saState = useSelector((state) => state.superAdminReducer);
  const stateLogin = useSelector((state) => state.loginReducer);
  return (
    <div className="modal-sf__wrapper">
      <div className='modal-sf__circle'>
        {saState.success || stateLogin.successReg ? <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupSuccess/icon-park_success.svg" alt="icon-park_success" /> : <></>}
        {saState.fail || stateLogin.failed.state || decryptStr(window.localStorage.getItem("timeout")) === "true" ? <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupFailed/icon-park_error.png" alt="icon-park_failed" /> : <></>}
        {/* { ? <img src="https://storage.googleapis.com/artifacts.concrete-plasma-244309.appspot.com/homespot/popupFailed/icon-park_error.png" alt="icon-park_failed" /> : <></>} */}
      </div>
      <p className='modal-sf__title'>
        {title}
      </p>
      <p className='modal-sf__desc'>
        {desc}
      </p>
      {btnBottom}
    </div>
  );
};

Component.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  btnBottom: PropTypes.any
};

Component.defaultProps = {
  title: "",
  desc: "",
  btnBottom: (<></>)
};

export default Component;