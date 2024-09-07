import { openLink } from "../../../../../helpers/newTab"

const ModalDetailPage = ({
    isModal,
    closeModal,
    isFavProperty,
    isSameProperty,
    onClickLanjut
}) => {
    return (
        <div>
          {isModal && (
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
              <div className="relative w-auto my-auto mx-auto max-w-2xl">
                <div className="w-full rounded-lg bg-white">
                    <div className="flex items-start justify-end px-5 py-3 border-solid border-gray-300 rounded-t mobile:mt-[50%]">
                        <button
                            className="bg-transparent border-0 text-black float-right place-self-center"
                            onClick={closeModal}
                        >
                            <img src="/icons/Close_Circle.svg" alt="Close Button" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 text-center justify-center items-center w-[432px] h-fit px-6 pb-6">
                        {isSameProperty === true ? (
                            <>
                                <img width="216" height="180" src="/images/Same_Properti.svg"  alt="img-saved-properti" />
                                <p className="font-bold text-[24px] text-[#292929]">Properti Tidak Boleh Sama</p>
                                <p className="font-medium text-[16px] text-[#666666]">Yuk, temukan properti lainnya yang sesuai kebutuhanmu dan tambahkan ke daftar favorit untuk bisa membandingkan properti.</p>
                                <button className="justify-center items-center bg-[#1078CA] rounded-lg w-full h-12" onClick={onClickLanjut}>
                                    <p className="font-bold text-[16px] text-[#ffffff]">Cari Properti</p>
                                </button>
                            </>
                        ) : (
                            <>
                                <img width="216" height="180" src={`${isFavProperty ? '/images/Properti_Tersimpan_kosong.svg' : '/images/Properti_Tersimpan.svg'}`}  alt="img-saved-properti" />
                                <p className="font-bold text-[24px] text-[#292929]">{isFavProperty ? 'Belum Ada Properti Favorit' : 'Berhasil Difavoritkan'}</p>
                                <p className="font-medium text-[16px] text-[#666666]">{isFavProperty ? 'Untuk membandingkan properti, pilih dan simpan properti ke daftar properti favoritmu dulu, ya!' : 'Kamu bisa melihat dan membandingkan properti favoritmu di laman properti favorit'}</p>
                                <button className="justify-center items-center bg-[#1078CA] rounded-lg w-full h-12" onClick={onClickLanjut}>
                                    <p className="font-bold text-[16px] text-[#ffffff]">{isFavProperty ? 'Pilih Properti' : 'Lanjut Cari Properti'}</p>
                                </button>
                            </>
                        )}
                        
                        {!isFavProperty && (
                            <button className="justify-center items-center bg-[#ffffff] border border-[#1078CA] rounded-lg w-full h-12" onClick={() => openLink("/profile-user/saved-property", false)}>
                                <p className="font-bold text-[16px] text-[#1078CA]">Buka Halaman Properti Favorit</p>
                            </button>
                        )}
                    </div>
                </div> 
              </div>
            </div>
          )}
        </div>
    )
}

export default ModalDetailPage