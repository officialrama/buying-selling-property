import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CurrencyInputCalc, InputMasked, LabelInputTextbox, RadioButtonWithLabel } from "../../../../../components/atoms";
import { Dropdown, ModalGimmick, TextboxLabel } from "../../../../molecules";
import { addGimmick, editGimmick } from "../../../../../store/actions/fetchData/inquiryGimmick";

const AddInquiry = ({ data, id, isModal, closeModal, editMode, inputs, inputsGmk, dispatch, otherProps }) => {
   
    const inputArr = [
      inputsGmk?.name?.isValid,
      inputsGmk?.biayaAdminNominal?.value !== "", 
      inputsGmk?.biayaProvisiNominal?.value !== "",
      inputsGmk?.biayaProvisiPercentage?.value !== "",
      inputsGmk?.biayaAdminPercentage?.value !== "",
      inputsGmk?.fixedRate?.isValid,
      inputsGmk?.floatingRate?.isValid,
      inputsGmk?.tenorFixedRate?.isValid,
      inputsGmk?.programGimmick === 'Homespot' || inputsGmk?.programGimmick === ''
    ];
    return (
      <ModalGimmick isModal={isModal} closeModal={closeModal} title={!editMode ? "Tambah Program" : "Edit Program"} editMode={editMode}>
        <form>
          <div className="p-6 pt-2 pb-0 flex-auto max-h-[50vh] overflow-y-auto lg:w-[600px]">
            <div className="mb-4">
              <TextboxLabel topLabel="Nama Program" requiredStar={true} placeholder="Nama" name="name" value={inputsGmk?.name?.value}
  
                onChange={(e) => {
                  otherProps.handleInputNoNumberAndSpec(e?.target?.value, e.target.name);
                }}
  
                warnText={inputsGmk?.name?.msgError}
              />
            </div>
            <LabelInputTextbox text="Tipe Program" requiredStar={true} />
            <div className="mb-4 mt-2 grid grid-cols-2 gap-2">
            <RadioButtonWithLabel checked={inputsGmk?.programGimmick === 'Homespot'} name="Homespot" onChange={(event) => otherProps.handleRadioDropChange("programGimmick", event.target.value)} text="Info Lelang" />
            <RadioButtonWithLabel checked={inputsGmk?.programGimmick === ''} name="" onChange={(event) => otherProps.handleRadioDropChange("programGimmick", event.target.value)} text="Homespot" />
            </div>
            {/* <div className="mb-4 mt-2 grid grid-cols-2 gap-2">
            <label>
            <input
            type="radio"
            name="radioButtonAdmin"
            value="nominalAdmin"
            onChange={handleRadioAdmin}
            className="mr-[10px]"
            />
            Nominal
            </label>
            <label>
            <input
            type="radio"
            name="radioButtonAdmin"
            value="persentaseAdmin"
            onChange={handleRadioAdmin}
            className="mr-[10px]"
            />
            Persentase
            </label>
            </div> */}
            <div className="mb-4">
            <div className="mb-2">
            <LabelInputTextbox text="Admin Nominal" requiredStar={true} />
            </div>
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="biayaAdminNominal"
                placeholder="0"
                decimalsLimit={2}
                onValueChange={(value) => otherProps.handleInputNoZero(value || "", "biayaAdminNominal")}
                groupSeparator="."
                decimalSeparator=","
                allowDecimals={false}
                allowNegativeValue={false}
                maxLength={14}
                value={inputsGmk?.biayaAdminNominal?.value }
                warnText={inputsGmk?.biayaAdminNominal?.msgError}
              />
            </div>
            <div className="mb-4">
            <LabelInputTextbox text="Admin Persentase" requiredStar={true} />
              <InputMasked className="textbox-label__currency" placeholder="00.00" name="biayaAdminPercentage" rightLabel="%" requireDecimal={true} value={inputsGmk?.biayaAdminPercentage?.value} onChange={otherProps?.handleAdmPercentInput} warnText={inputsGmk?.biayaAdminPercentage?.msgError} />
            </div>
            {/* <div className="mb-4 mt-2 grid grid-cols-2 gap-2">
            <label>
            <input
            type="radio"
            name="radioButtonProvisi"
            value="nominalProvisi"
            onChange={handleRadioProvisi}
            className="mr-[10px]"
            />
            Nominal
            </label>
            <label>
            <input
            type="radio"
            name="radioButtonProvisi"
            value="persentaseProvisi"
            onChange={handleRadioProvisi}
            className="mr-[10px]"
            />
            Persentase
            </label>
            </div> */}
            <div className="mb-4">
              <div className="mb-2">
            <LabelInputTextbox text="Provisi Nominal" requiredStar={true} />
            </div>
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="biayaProvisiNominal"
                placeholder="0"
                decimalsLimit={2}
                onValueChange={(value) => otherProps.handleInputNoZero(value || "", "biayaProvisiNominal")}
                groupSeparator="."
                decimalSeparator=","
                allowDecimals={false}
                allowNegativeValue={false}
                maxLength={14}
                value={inputsGmk?.biayaProvisiNominal?.value}
                warnText={inputsGmk?.biayaProvisiNominal?.msgError}
              />
            </div>
            <div className="mb-4">
            <LabelInputTextbox text="Provisi Persentase" requiredStar={true} />
              <InputMasked className="textbox-label__currency" placeholder="00.00" name="biayaProvisiPercentage" rightLabel="%" requireDecimal={true} value={inputsGmk?.biayaProvisiPercentage?.value} onChange={otherProps?.handleAdmPercentInput} warnText={inputsGmk?.biayaProvisiPercentage?.msgError} />
            </div>
            <div className="mb-4 mt-2 grid grid-cols-3 gap-3">
            <div className="mb-4">
              <LabelInputTextbox text="Suku Bunga" requiredStar={true} />
              <InputMasked className="textbox-label__currency" placeholder="00.00" name="fixedRate" requireDecimal={true} value={`${inputsGmk?.fixedRate?.value}%`} onChange={otherProps?.handleAdmPercentInput} warnText={inputsGmk?.fixedRate?.msgError} />
            </div>
            <div className="mb-4">
              <LabelInputTextbox text="Floating Rate" requiredStar={true} />
              <InputMasked className="textbox-label__currency" placeholder="00.00" name="floatingRate" requireDecimal={true} value={`${inputsGmk?.floatingRate?.value}%`} onChange={otherProps?.handleAdmPercentInput} warnText={inputsGmk?.floatingRate?.msgError} />
            </div>
            <div className="mb-4">
              <TextboxLabel topLabel="Tenor" requiredStar={true} placeholder="Tenor" name="tenorFixedRate" value={inputsGmk?.tenorFixedRate?.value} onChange={otherProps?.handleNumberInput} maxLength="2" warnText={inputsGmk?.tenorFixedRate?.msgError} />
            </div>
            </div>
            {/* <div className="mb-4">
            <Dropdown
              topLabel="Program Gimmick"
              value={otherProps?.dropdownVal?.programGimmick}
              onChange={(value) => {
                otherProps?.setDropdownVal({ ...otherProps?.dropdownVal, programGimmick: value });
                otherProps?.handleRadioDropChange("program gimmick", value.value);
              }}
              data={personalDataConst.programGimmick}
            />
            </div> */}
          </div>
          <div className="p-6 w-full">
            <Button btnTypes="submit" id="submitGmk" name="submitGmk" className="w-full" disabled={inputArr.filter(Boolean).length !== 9} onClick={() => {
              closeModal();
              if (!editMode) {
                dispatch(addGimmick(inputsGmk));
              } else {
                dispatch(editGimmick(inputsGmk));
              }
            }}>{editMode ? "Simpan" : "Tambahkan"}</Button>
          </div>
        </form>
      </ModalGimmick>
    );
  };

  export default AddInquiry