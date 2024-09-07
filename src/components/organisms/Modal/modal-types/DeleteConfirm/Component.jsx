import React from "react";
import { Button } from "../../../../atoms";

const Component = ({ cancel, onClickDelete }) => {
  return (
    <div className="confirm-btn__wrapper">
      <p className="confirm-btn__title">
        Apakah anda yakin ingin menghapus item ini?
      </p>
      <div className="confirm-btn__btn-wrap">
        <Button
          buttonColor="blue"
          textColor="white"
          fullWidth={false}
          paddingSize={"padding-0"}
          onClick={onClickDelete}
        >
          Hapus
        </Button>
        <Button
          buttonColor="blueLight"
          textColor="blue"
          fullWidth={false}
          paddingSize={"padding-0"}
          onClick={cancel}
        >
          Batal
        </Button>
      </div>
    </div>
  );
};

export default Component;
