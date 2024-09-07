import React, { useEffect } from "react";
import DatePicker from "react-date-picker";
import { useDispatch } from "react-redux";
import { Checkbox, DetailsCard, Dropdown } from "../../components/molecules";
import { selectConst } from "../../static/selectConst";
import {
  setCertificate,
  setElectricalPower,
  setFacingHouse,
  setMaidRoom,
  setNumberOfFloors,
  setPropertyCondition,
  setYearOfDevelopment,
} from "../../store/actions/changeDropdownState";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";

const SellAdditionalInfo = ({ inputs, handleInputChange, handleRadioDropChange, initiateState, handleCheckboxChange, dropdownVal, setDropdownVal, handleDateInputChange }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    window.scrollTo(0, 0);
    dispatch(setCertificate(selectConst.certificate[0]));
    dispatch(setNumberOfFloors(selectConst.numberOfFloors[0]));
    dispatch(setPropertyCondition(selectConst.propertyCondition[0]));
    dispatch(setElectricalPower(selectConst.electricalPower[0]));
    dispatch(setFacingHouse(selectConst.facingHouse[0]));
    dispatch(setYearOfDevelopment(selectConst.yearOfDevelopment[0]));
    dispatch(setMaidRoom(selectConst.maidRoom[0]));
  }, []);
  function RedStar() {
    return <span className="sellprops__card__redstar">*</span>;
  }

  return (
    <div>
      <div className="sellprops__wrapper">
        <div className="sellprops__text-wrapper">
          <p className="sellprops__title">Informasi Tambahan</p>
          <p>
          Masukkan data isian informasi properti anda.
          </p>
        </div>
        <div className="sellprops__card__wrap-flex-col">
          <DetailsCard>
            <div className="sellprops__card__wrapper-content">
              <p className="sellprops__card__title">
                Informasi Properti {RedStar()}
              </p>
              <div className="sellprops__card__form-col__wrapper">
                <p className="sellprops__card__form-col__text">Sertifikat</p>
                <div className="sellprops__card__form-col__form-dropdown">
                  <Dropdown
                    value={dropdownVal.certificate}
                    onChange={(value) => {
                      setDropdownVal({ ...dropdownVal, certificate: value });
                      handleRadioDropChange("sertifikat", value.value);
                    }}
                    data={selectConst.certificate}
                    warnText={inputs?.sertifikat?.msgError}
                  />
                </div>
              </div>
              <div className="sellprops__card__form-col__wrapper">
                <p className="sellprops__card__form-col__text">Jumlah Lantai</p>
                <div className="sellprops__card__form-col__form-dropdown">
                  <Dropdown
                    value={dropdownVal.numberOfFloors}
                    onChange={(value) => {
                      setDropdownVal({ ...dropdownVal, numberOfFloors: value });
                      handleRadioDropChange("jmlLantai", value.value);
                    }}
                    data={selectConst.numberOfFloors}
                    warnText={inputs?.jmlLantai?.msgError}
                  />
                </div>
              </div>
              <div className="sellprops__card__form-col__wrapper">
                <p className="sellprops__card__form-col__text">
                  Kondisi Properti
                </p>
                <div className="sellprops__card__form-col__form-dropdown">
                  <Dropdown
                    value={dropdownVal.propertyCondition}
                    onChange={(value) => {
                      setDropdownVal({
                        ...dropdownVal,
                        propertyCondition: value,
                      });
                      handleRadioDropChange("kondisiProperti", value.value);
                    }}
                    data={selectConst.propertyCondition}
                    warnText={inputs?.kondisiProperti?.msgError}
                  />
                </div>
              </div>
              <div className="sellprops__card__form-col__wrapper">
                <p className="sellprops__card__form-col__text">Daya Listrik</p>
                <div className="sellprops__card__form-col__form-dropdown">
                  <Dropdown
                    value={dropdownVal.electricalPower}
                    onChange={(value) => {
                      setDropdownVal({
                        ...dropdownVal,
                        electricalPower: value,
                      });
                      handleRadioDropChange("dayaListrik", value.value);
                    }}
                    data={selectConst.electricalPower}
                    warnText={inputs?.dayaListrik?.msgError}
                  />
                </div>
              </div>
              <div className="sellprops__card__form-col__wrapper">
                <p className="sellprops__card__form-col__text">Hadap Rumah</p>
                <div className="sellprops__card__form-col__form-dropdown">
                  <Dropdown
                    value={dropdownVal.facingHouse}
                    onChange={(value) => {
                      setDropdownVal({ ...dropdownVal, facingHouse: value });
                      handleRadioDropChange("hadapRumah", value.value);
                    }}
                    data={selectConst.facingHouse}
                    warnText={inputs?.hadapRumah?.msgError}
                  />
                </div>
              </div>
              <div className="sellprops__card__form-col__wrapper">
                <p className="sellprops__card__form-col__text">Tahun Bangun</p>
                <div className="sellprops__card__form-col__form-dropdown">
                  <DatePicker
                    name="tahunBangun"
                    onChange={(e) => {
                      handleDateInputChange(e, "tahunBangun");
                    }}
                    value={inputs?.tahunBangun?.value || null}
                    onChangeRaw={(e) => e.preventDefault()}
                    maxDetail="decade"
                    minDate={new Date(`${new Date("1980").toString()}`)}
                    maxDate={new Date()}
                    format="yyyy"
                    locale="id-ID"
                    calendarIcon={<FaCalendarAlt />}
                    clearIcon={<MdOutlineClear />}
                  />
                  {inputs?.tahunBangun?.msgError && <p className="textbox__invalidTxt">{inputs?.tahunBangun?.msgError}</p>}
                </div>
              </div>
              <div className="sellprops__card__form-col__wrapper">
                <p className="sellprops__card__form-col__text">
                  Kamar Pembantu
                </p>
                <div className="sellprops__card__form-col__form-dropdown">
                  <Dropdown
                    value={dropdownVal.maidRoom}
                    onChange={(value) => {
                      setDropdownVal({ ...dropdownVal, maidRoom: value });
                      handleRadioDropChange("kamarPembantu", value.value);
                    }}
                    data={selectConst.maidRoom}
                    warnText={inputs?.kamarPembantu?.msgError}
                  />
                </div>
              </div>
            </div>
          </DetailsCard>

          <DetailsCard>
            <p className="sellprops__card__title">Kelengkapan Rumah</p>
            <div className="sellprops__card__checklist-wrapper">
              <Checkbox
                label="Dapur"
                checked={inputs.dapur}
                fontSize="16px"
                name="dapur"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Jalur PDAM"
                checked={inputs.jalurPDAM}
                fontSize="16px"
                name="jalurPDAM"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Ruang Keluarga"
                checked={inputs.ruangKeluarga}
                fontSize="16px"
                name="ruangKeluarga"
                onChange={handleCheckboxChange}
              />
              <div className="sellprops__card__text-hidden"></div>
              <Checkbox
                label="Jalur Listrik"
                checked={inputs.jalurListrik}
                fontSize="16px"
                name="jalurListrik"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Jalur Telepon"
                checked={inputs.jalurTelepone}
                fontSize="16px"
                name="jalurTelepone"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Ruang Kerja"
                checked={inputs.ruangKerja}
                fontSize="16px"
                name="ruangKerja"
                onChange={handleCheckboxChange}
              />
              <div className="sellprops__card__text-hidden"></div>
            </div>
          </DetailsCard>

          <DetailsCard>
            <p className="sellprops__card__title">Akses</p>
            <div className="sellprops__card__checklist-wrapper">
              <Checkbox
                label="Rumah Sakit"
                checked={inputs.rumahSakit}
                fontSize="16px"
                name="rumahSakit"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Pasar"
                checked={inputs.pasar}
                fontSize="16px"
                name="pasar"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Bioskop"
                checked={inputs.bioskop}
                fontSize="16px"
                name="bioskop"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Bandara"
                checked={inputs.bandara}
                fontSize="16px"
                name="bandara"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Jalan Tol"
                checked={inputs.jalanTol}
                fontSize="16px"
                name="jalanTol"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Farmasi"
                checked={inputs.farmasi}
                fontSize="16px"
                name="farmasi"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Bar"
                checked={inputs.bar}
                fontSize="16px"
                name="bar"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Gerbang Tol"
                checked={inputs.gerbangTol}
                fontSize="16px"
                name="gerbangTol"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Sekolah"
                checked={inputs.sekolah}
                fontSize="16px"
                name="sekolah"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Rumah Ibadah"
                checked={inputs.rumahIbadah}
                fontSize="16px"
                name="rumahIbadah"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Halte"
                checked={inputs.halte}
                fontSize="16px"
                name="halte"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="SPBU"
                checked={inputs.spbu}
                fontSize="16px"
                name="spbu"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Mall"
                checked={inputs.mall}
                fontSize="16px"
                name="mall"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Restoran"
                checked={inputs.restoran}
                fontSize="16px"
                name="restoran"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Gymnasium"
                checked={inputs.gymnasium}
                fontSize="16px"
                name="gymnasium"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Bank / ATM"
                checked={inputs.bankAtm}
                fontSize="16px"
                name="bankAtm"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Taman"
                checked={inputs.taman}
                fontSize="16px"
                name="taman"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Stasiun"
                checked={inputs.stasiun}
                fontSize="16px"
                name="stasiun"
                onChange={handleCheckboxChange}
              />
            </div>
          </DetailsCard>

          <DetailsCard>
            <p className="sellprops__card__title">Fasilitas</p>
            <div className="sellprops__card__checklist-wrapper">
              <Checkbox
                label="Kolam Renang"
                checked={inputs.kolamRenang}
                fontSize="16px"
                name="kolamRenang"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Lift"
                checked={inputs.lift}
                fontSize="16px"
                name="lift"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Tempat Parkir"
                checked={inputs.tempatParkir}
                fontSize="16px"
                name="tempatParkir"
                onChange={handleCheckboxChange}
              />
              <div className="sellprops__card__text-hidden"></div>
              <Checkbox
                label="Club House"
                checked={inputs.clubHouse}
                fontSize="16px"
                name="clubHouse"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Garasi"
                checked={inputs.garasi}
                fontSize="16px"
                name="garasi"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Keamanan 24 jam"
                checked={inputs.keamanan24Jam}
                fontSize="16px"
                name="keamanan24Jam"
                onChange={handleCheckboxChange}
              />
              <div className="sellprops__card__text-hidden"></div>
              <Checkbox
                label="Elevator"
                checked={inputs.elevator}
                fontSize="16px"
                name="elevator"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Row Jalan 12"
                checked={inputs.rowJalan12}
                fontSize="16px"
                name="rowJalan12"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Penghijauan"
                checked={inputs.penghijauan}
                fontSize="16px"
                name="penghijauan"
                onChange={handleCheckboxChange}
              />
              <div className="sellprops__card__text-hidden"></div>
              <Checkbox
                label="Gym"
                checked={inputs.gym}
                fontSize="16px"
                name="gym"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="CCTV"
                checked={inputs.cctv}
                fontSize="16px"
                name="cctv"
                onChange={handleCheckboxChange}
              />
              <Checkbox
                label="Rumah Sakit"
                checked={inputs.rumahSakit2}
                fontSize="16px"
                name="rumahSakit2"
                onChange={handleCheckboxChange}
              />
              <div className="sellprops__card__text-hidden"></div>
              <Checkbox
                label="Jogging Track"
                checked={inputs.jogingTrack}
                fontSize="16px"
                name="jogingTrack"
                onChange={handleCheckboxChange}
              />
            </div>
          </DetailsCard>
        </div>
      </div>
    </div>
  );
};

export default SellAdditionalInfo;
