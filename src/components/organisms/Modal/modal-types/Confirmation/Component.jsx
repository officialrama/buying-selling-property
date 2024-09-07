import React from "react";
import { Button } from "../../../../atoms";

const Component = ({ closeModal, onConfirm, descBody,  }) => {
  return (
    <div className="confirm-btn__wrapper">
      <p className="confirm-btn__title">{descBody}</p>
      <div className="confirm-btn__btn-wrap">
        <Button
          buttonColor="blueLight"
          textColor="blue"
          fullWidth={false}
          paddingSize={"padding-0"}
          onClick={closeModal}
        >
          Tidak
        </Button>
        <Button
          buttonColor="blue"
          textColor="white"
          fullWidth={false}
          paddingSize={"padding-0"}
          onClick={onConfirm}
        >
          Ya
        </Button>
      </div>
    </div>
  );
};

export default Component;
