import React from "react";
import { Button } from "../../../../atoms";

const Component = ({ cancel, onClickDelete }) => {
  return (
    <div className="flex flex-col text-center justify-center">
      <p className="text-[#292929] text-2xl font-bold">
        Yakin Ingin Menghapus Fasiltas/Akses Ini?
      </p>
      <p className="text-[#666666] text-base ">
        Fasiltas/akses pilihanmu akan terhapus dari daftar informasi fasilitas/akses?
      </p>
      <div className="flex flex-row justify-center items-center gap-2 pt-3">
        <Button
          className="w-[302px] border border-[#1078CA] rounded-lg font-bold"
          buttonColor="white"
          textColor="blue"
          fullWidth={false}
          paddingSize={"padding-0"}
          onClick={cancel}
        >
          Batal
        </Button>
        <Button
          className="w-[302px] bg-[#1078CA]"
          textColor="white"
          fullWidth={false}
          paddingSize={"padding-0"}
          onClick={onClickDelete}
        >
          Hapus
        </Button>
      </div>
    </div>
  );
};

export default Component;
