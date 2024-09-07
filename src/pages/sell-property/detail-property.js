/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { CurrencyInput, Textarea, UploadSingleFile } from "../../components/atoms";
import { DetailsCard, Dropdown, Textbox, TextboxLabel } from "../../components/molecules";
import { selectConst } from "../../static/selectConst";
import { selectedBathroom, selectedBedroom, selectedGarageCar, selectedPic1, selectedPic2 } from "../../store/actions/changeState";
import { showModalFail } from "../../store/actions/fetchData/superAdminState";

const SellDetailProp = ({ userStatus, inputs, handleRadioDropChange, brochureFile, setBrochureFile, dropdownVal, setDropdownVal, handleCurrency, handleLetterNumberInput, handleNumberInput, handlePromoCodeInput, handleAllCharInput, loadingFile }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedPic1(selectConst.pic[0]));
    dispatch(selectedPic2(selectConst.pic[0]));
    dispatch(selectedBathroom(selectConst.bathroom[0]));
    dispatch(selectedBedroom(selectConst.bedroom[0]));
    dispatch(selectedGarageCar(selectConst.garageCar[0]));
  }, []);
  const refSingleUpload = useRef(null);
  const resetSingleUpload = () => {
    refSingleUpload.current.value = null;
  };
  function RedStar() {
    return <span className="sellprops__card__redstar">*</span>;
  }

  return (
    <div>
      <div className="sellprops__wrapper">
        <div className="sellprops__text-wrapper">
          <p className="sellprops__title">Detail Properti</p>
          <p>
            Masukkan data isian detail properti anda.
          </p>
        </div>
        <div className="sellprops__card__wrap-flex-col">
          <DetailsCard>
            <div className="sellprops__card__wrapper-content">
              <p className="sellprops__card__title">Detail {RedStar()}</p>
              {userStatus === "visitor" ? (
                <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                  <p className="sellprops__card__form-col__title-25">
                    Nama Properti
                  </p>
                  <div>
                    <Textbox
                      placeholder="Nama Properti"
                      typeInput="text"
                      name="namaProperti"
                      value={inputs?.namaProperti?.value}
                      onChange={handleLetterNumberInput}
                      invalid={!inputs?.namaProperti?.isValid}
                      invalidTxt={inputs?.namaProperti?.msgError}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                    <p className="sellprops__card__form-col__title-25">
                      Nama Proyek
                    </p>
                    <div>
                      <Textbox
                        placeholder="Nama Proyek"
                        typeInput="text"
                        name="namaProyek"
                        value={inputs?.namaProyek?.value}
                        onChange={handleLetterNumberInput}
                        invalid={!inputs?.namaProyek?.isValid}
                        invalidTxt={inputs?.namaProyek?.msgError}
                      />
                    </div>
                  </div>
                  <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                    <p className="sellprops__card__form-col__title-25">
                      Upload Brosur
                    </p>
                    <div>
                      <UploadSingleFile
                        loading={loadingFile}
                        reference={refSingleUpload}
                        name="brosur"
                        files={brochureFile.file}
                        onChange={(e) => {
                          const fileName = e.target.files[0].name.toString();
                          const idxDot = fileName.lastIndexOf(".") + 1;
                          const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                          if (extFile !== "pdf") {
                            dispatch(showModalFail("Gagal", "Format file tidak didukung"));
                          } else if (e.target.files[0].size > 5000000) {
                            dispatch(showModalFail("Gagal", "File Terlalu Besar"));
                            resetSingleUpload();
                          } else {
                            Array.from(e.target.files).forEach((file) => {
                              setBrochureFile({ ...brochureFile, file: file, name: file.name, selected: true });
                            });
                          }
                        }}
                        selectedFile={brochureFile.selected && true}
                        fileName={brochureFile !== [] && brochureFile.name}
                        onClickClear={(e) => {
                          resetSingleUpload();
                          setBrochureFile({ file: "", name: "", selected: false });
                        }}
                        acceptedFiles=".pdf"
                        invalidTxt={!brochureFile.file && "Upload Brosur tidak valid"}
                      />
                    </div>
                  </div>
                  <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                    <p className="sellprops__card__form-col__title-25">
                      PIC Proyek
                    </p>
                    <div>
                      <Textbox
                        placeholder="PIC Proyek"
                        typeInput="text"
                        name="picProyek"
                        value={inputs?.picProyek?.value}
                        onChange={handleLetterNumberInput}
                        invalid={!inputs?.picProyek?.isValid}
                        invalidTxt={inputs?.picProyek?.msgError}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </DetailsCard>
          <DetailsCard>
            <div className="sellprops__card__desc-wrap">
              <p className="sellprops__card__desc-title">
                Deskripsi {RedStar()}
              </p>
              <div className="sellprops__card__form-col__form-75">
                <Textarea
                  placeholder="Tulis deskripsi properti"
                  resize={false}
                  rows={6}
                  name="deskripsi"
                  value={inputs?.deskripsi?.value}
                  onChange={handleAllCharInput}
                  maxLength={255}
                  warnText={inputs?.deskripsi?.msgError}
                />
              </div>
            </div>
          </DetailsCard>
          <DetailsCard>
            <div className="p-2">
              <p className="sellprops__card__title">
                Detail Properti {RedStar()}
              </p>
              <div className="sellprops__card__detail-prop-wrap">
                <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                  <p className="sellprops__card__form-col__title-25">
                    <span>
                      <img src="/icons/small-icons/LT.svg" alt="prop-icon" />
                    </span>
                    Luas Tanah
                  </p>
                  <div className="sellprops__card__form-col__form-40">
                    <TextboxLabel
                      placeholder="Masukkan luas tanah"
                      rightLabel="m²"
                      name="lt"
                      value={inputs?.lt?.value}
                      onChange={handleNumberInput}
                      maxLength={10}
                      warnText={inputs?.lt?.msgError}
                    />
                  </div>
                </div>
                <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                  <p className="sellprops__card__form-col__title-25">
                    <span>
                      <img src="/icons/small-icons/LB.svg" alt="prop-icon" />
                    </span>
                    Luas Bangunan
                  </p>
                  <div className="sellprops__card__form-col__form-40">
                    <TextboxLabel
                      placeholder="Masukkan luas bangunan"
                      rightLabel="m²"
                      name="lb"
                      value={inputs?.lb?.value}
                      onChange={handleNumberInput}
                      maxLength={10}
                      warnText={inputs?.lb?.msgError}
                    />
                  </div>
                </div>
                <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                  <p className="sellprops__card__form-col__title-25--start">
                    <span>
                      <img
                        src="/icons/small-icons/Bedroom-Black.svg"
                        alt="prop-icon"
                      />
                    </span>
                    Kamar Tidur
                  </p>
                  <div className="sellprops__card__form-col__form-40">
                    <Dropdown
                      value={dropdownVal.bedroom}
                      onChange={(value) => {
                        setDropdownVal({ ...dropdownVal, bedroom: value });
                        handleRadioDropChange("jmlKmrTidur", value.value);
                      }}
                      data={selectConst.bedroom}
                      warnText={inputs?.jmlKmrTidur?.msgError}
                    />
                  </div>
                </div>
                <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                  <p className="sellprops__card__form-col__title-25">
                    <span>
                      <img
                        src="/icons/small-icons/Bathroom-Black.svg"
                        alt="prop-icon"
                      />
                    </span>
                    Kamar Mandi
                  </p>
                  <div className="sellprops__card__form-col__form-40">
                    <Dropdown
                      value={dropdownVal.bathroom}
                      onChange={(value) => {
                        setDropdownVal({ ...dropdownVal, bathroom: value });
                        handleRadioDropChange("jmlKmrMandi", value.value);
                      }}
                      data={selectConst.bathroom}
                      warnText={inputs?.jmlKmrMandi?.msgError}
                    />
                  </div>
                </div>
                <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                  <p className="sellprops__card__form-col__title-25">
                    <span>
                      <GiTakeMyMoney />
                    </span>
                    Harga Properti
                  </p>
                  <div className="sellprops__card__form-col__form-40">
                    <CurrencyInput
                      className="textbox-label__currency"
                      name="hargaProperti"
                      placeholder="0"
                      decimalsLimit={2}
                      onValueChange={(value) =>
                        handleCurrency(value || "", "hargaProperti")
                      }
                      groupSeparator="."
                      decimalSeparator=","
                      maxLength={14}
                      value={inputs?.hargaProperti?.value}
                      allowNegativeValue={false}
                      allowDecimals={false}
                      warnText={inputs?.hargaProperti?.msgError}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DetailsCard>
          <DetailsCard>
            <div className="p-2">
              <div className="sellprops__card__form-col__wrapper grid-tpl-col">
                <p className="sellprops__card__form-col__title-25">
                  <span>
                    <img
                      src="/icons/small-icons/Price-Black.svg"
                      alt="prop-icon"
                    />
                  </span>
                  Kode Promo Pembelian Proyek
                </p>
                <div className="sellprops__card__form-col__form-40">
                  <Textbox
                    placeholder="Kode Promo Pembelian Proyek"
                    typeInput="text"
                    name="promoPembelianProyek"
                    value={inputs?.promoPembelianProyek?.value}
                    onChange={handlePromoCodeInput}
                    invalid={!inputs?.promoPembelianProyek?.isValid}
                    invalidTxt={inputs?.promoPembelianProyek?.msgError}
                  />
                </div>
              </div>
            </div>
          </DetailsCard>
        </div>
      </div>
    </div>
  );
};

export default SellDetailProp;
