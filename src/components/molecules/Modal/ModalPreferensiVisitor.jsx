
import React, { useEffect, useState } from "react";
import TextboxLabel from "../Input/textbox-custom/textbox-label";
import DropdownKota from "../Dropdown/dropdown-kota-homepage";
import Checkbox from "../Input/checkbox";
import { CurrencyInputCalc, RadioButtonWithLabel } from "../../atoms";
import DatePicker from "react-date-picker";
import moment from "moment";
import { useDispatch } from "react-redux";
import { VisitorPreference } from "../../../store/actions/fetchData/userState";
import useFormStepperHooks from "../../../hooks/useFormStepperHooks";
import { notNamePeopleRegex } from "../../../helpers/regex";


const ModalPreferenceVisitor = ({dataDeveloper, email}) => {
  const dispatch = useDispatch();
  const [listDeveloperChecked, setListDeveloperChecked] = useState({
    ciputra : false,
    sinar_mas: false,
    perumnas: false,
    summarecon: false,
    jaya_properti: false
  });
  const [listLainnya, setListLainnya] = useState(true);
  const [referensiHomespot, setReferensiHomespot] = useState(true);
  const [isReferensi, setIsReferensi] = useState();
  const [inputs, setInputs] = useState();
  const [checkboxLainnya, setCheckboxLainnya] = useState([]);
  const [errorHargaTertinggi, setErrorHargaTertinggi] = useState('');
  const [errorHargaTerendah, setErrorHargaTerendah] = useState('');

  const handleCheckboxChange = (event) => {
        setListDeveloperChecked((listDeveloperChecked) => ({
            ...listDeveloperChecked,
            [event.target.name]: event.target.checked,
        }));
  };

  const handleCheckboxLainnya = (event) => {
    setCheckboxLainnya((checkboxLainnya) => ({
     ...checkboxLainnya,
        [event.target.name]: event.target.checked,
    }));
};
  const handleDateInputChange = (date, name) => {
        setInputs((inputs) => ({
            ...inputs,
            [name]: {value: date, msgError: ''},
        }));
};

const handleChangeAlt = (name, value) => {
  if (value === "hargaTerendah" > value === "hargaTertinggi") {
    setInputs({
      ...inputs,
      [name]: { isValid: false, value: value },
    });
  } else {
    setInputs({
      ...inputs,
      [name]: { isValid: !!value, value: value},
    });
  }
};

useEffect(() => {
  if(inputs?.hargaTerendah?.value < 1000000){
    setErrorHargaTerendah('Nominal harus lebih dari Rp1.000.000')
  } else {
    setErrorHargaTerendah('')
  }
  
},[inputs?.hargaTerendah?.value])

useEffect(() => {
  const hargaTerendahValue = Number(inputs?.hargaTerendah?.value);
  const hargaTertinggiValue = Number(inputs?.hargaTertinggi?.value);

  if ( hargaTerendahValue > hargaTertinggiValue) {
    setErrorHargaTertinggi('Nominal harus lebih tinggi dari Preferensi Harga Terendah');
  } else {
    setErrorHargaTertinggi('');
  }
}, [inputs?.hargaTerendah?.value, inputs?.hargaTertinggi?.value]);


const handleReferensi = (event) => {
  setIsReferensi(event);

  if(event === 'others') {
    setReferensiHomespot(false)
  } else {
    setReferensiHomespot(true)
  }

};

const inputsArr = [
  inputs?.dob?.value,
  inputs?.location?.value,
  listDeveloperChecked ,
  isReferensi,
  inputs?.hargaTerendah?.value,
  inputs?.hargaTertinggi?.value,
  errorHargaTerendah === '',
  errorHargaTertinggi === ''
]
const handleLainnya = (event) => {

      setInputs({
          ...inputs,
          [event.target.name]: {
              isValid: true,
              value: event.target.value.replace(notNamePeopleRegex, ""),
              msgError: "",
          },
      });
};

  useEffect(() => {
    if (checkboxLainnya['listLainnya'] === true){
      setListLainnya(false)
    } else {
      setListLainnya(true)
    }
  },[checkboxLainnya['listLainnya']])

  return (
    <div
      className="relative flex flex-col justify-start p-6 bg-white rounded-lg overflow-y-auto largePc:h-fit xxl:h-fit"
    >       
          <div className="flex items-center justify-center pb-2">
          <p className="text-[#292929] font-bold text-2xl">Atur Preferensi Properti</p>
          </div>
          <div className="flex flex-col gap-2 pb-4">
          <p className="text-xs font-semibold text-[#292929] flex flex-row">Tangal Lahir<p className="text-[#E84040]">*</p></p>
          <DatePicker
              onChange={(e) => {
              handleDateInputChange(e, "dob");
              }}
              value={inputs?.dob?.value || null}
              onChangeRaw={(e) => e.preventDefault()}
              maxDate={new Date(moment().subtract(17, "years"))}
              format="dd-MM-yyyy"
              locale="id-ID"
            />
          </div>
          <div className="flex flex-col gap-2 pb-4">
          <p className="text-xs font-semibold text-[#292929] flex flex-row">Preferensi Lokasi<p className="text-[#E84040]">*</p></p>
            <DropdownKota
            placeholder='Pilih Lokasi'
            className='w-[500px]'
            setInputs={setInputs}
            inputs={inputs}
            />
          </div>
          <div className="flex flex-col gap-2 pb-2">
          <p className="text-xs font-semibold text-[#292929] flex flex-row">Preferensi Developer<p className="text-[#E84040]">*</p></p>
          <div className="grid grid-cols-2 gap-4">
          <Checkbox
            //  fontColor='#777777'
             label={dataDeveloper?.[0]?.name}
             name={dataDeveloper?.[0]?.alias}
             checked={listDeveloperChecked[dataDeveloper?.[0]?.alias]} 
             onChange={handleCheckboxChange}
            />
          <Checkbox
            //  fontColor='#777777'
             label={dataDeveloper?.[1]?.name}
             name={dataDeveloper?.[1]?.alias}
             checked={listDeveloperChecked[dataDeveloper?.[1]?.alias]} 
             onChange={handleCheckboxChange}
            />
          <Checkbox
            //  fontColor='#777777'
             label={dataDeveloper?.[2]?.name}
             name={dataDeveloper?.[2]?.alias}
             checked={listDeveloperChecked[dataDeveloper?.[2]?.alias]} 
             onChange={handleCheckboxChange}
            />
          <Checkbox
            //  fontColor='#777777'
             label={dataDeveloper?.[3]?.name}
             name={dataDeveloper?.[3]?.alias}
             checked={listDeveloperChecked[dataDeveloper?.[3]?.alias]} 
             onChange={handleCheckboxChange}
            />
          <Checkbox
            //  fontColor='#777777'
             label={dataDeveloper?.[4]?.name}
             name={dataDeveloper?.[4]?.alias}
             checked={listDeveloperChecked[dataDeveloper?.[4]?.alias]} 
             onChange={handleCheckboxChange}
            />
          <Checkbox
            //  fontColor='#777777'
             label="Lainnya"
             name="listLainnya"
             checked={checkboxLainnya['listLainnya']} 
             onChange={handleCheckboxLainnya}
            />                                                            
          </div>
          </div>
          <div className="flex flex-col gap-2 pb-4">
          <p className="text-xs font-semibold text-[#292929] flex flex-row">Lainnya</p>
            <TextboxLabel
            value={inputs?.listLainnya?.value}
            name='listLainnya'
            onChange={handleLainnya}
            // warnText={inputs?.listLainnya?.msgError}
            placeholder='Masukkan Jawaban'
            disabled={listLainnya}
            />
          </div>
          <div className="flex flex-row gap-2 pb-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-[#292929] flex flex-row">Preferensi Harga Terendah<p className="text-[#E84040]">*</p></p>
              <CurrencyInputCalc
                className={`textbox-label__currency ${errorHargaTerendah !== '' ? "border-[#E84040]" : "border-[#B5B6B6]"}`}
                name="hargaTerendah"
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={inputs?.hargaTerendah?.value}
                onValueChange={(value) => handleChangeAlt("hargaTerendah", value || 0)}
              />
              <p className="text-xs text-[#E84040] font-medium">{errorHargaTerendah}</p>
            </div>
            <div className="flex max-w-[249px] flex-col gap-2">
            <p className="text-xs font-semibold text-[#292929] flex flex-row">Preferensi Harga Tertinggi<p className="text-[#E84040]">*</p></p>
              <CurrencyInputCalc
                className={`textbox-label__currency ${errorHargaTertinggi !== '' ? "border-[#E84040]" : "border-[#B5B6B6]"}`}
                name="hargaTertinggi"
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={inputs?.hargaTertinggi?.value}
                onValueChange={(value) => handleChangeAlt("hargaTertinggi", value || 0)}
              />
               <p className="text-xs text-[#E84040] font-medium">{errorHargaTertinggi}</p>
            </div>
            </div>
            <div className="flex flex-col gap-2 pb-2">
            <p className="text-xs font-semibold text-[#292929] flex flex-row">Dari mana kamu tahu Homespot?<p className="text-[#E84040]">*</p></p>
            <div className="grid grid-cols-2 gap-4">
              <RadioButtonWithLabel
              text="Google"
              name="google"
              checkColor="blueFigma"
              onChange={(e) => handleReferensi(e.target.name)}
              checked={isReferensi === "google"}
              />
              <RadioButtonWithLabel
              text="Facebook"
              name="facebook"
              checkColor="blueFigma"
              onChange={(e) => handleReferensi(e.target.name)}
              checked={isReferensi === "facebook"}
              />
              <RadioButtonWithLabel
              text="Instagram"
              name="instagram"
              checkColor="blueFigma"
              onChange={(e) => handleReferensi(e.target.name)}
              checked={isReferensi === "instagram"}
              />
              <RadioButtonWithLabel
              text="Lainnya"
              name="others"
              checkColor="blueFigma"
              onChange={(e) => handleReferensi(e.target.name)}
              checked={isReferensi === "others"}
              />                
              <RadioButtonWithLabel
              text="TikTok"
              name="tiktok"
              checkColor="blueFigma"
              onChange={(e) => handleReferensi(e.target.name)}
              checked={isReferensi === "tiktok"}
              />                                                                                  
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-4"> 
          <p className="text-xs font-semibold text-[#292929] flex flex-row">Lainnya</p>
            <TextboxLabel
            value={inputs?.referensi?.value}
            name='referensi'
            onChange={handleLainnya}
            // warnText={inputs?.referensiHomespot?.msgError}
            placeholder='Masukkan Jawaban'
            disabled={referensiHomespot}
            />
          </div>
          <button
            className="font-semibold mt-4 h-14 p-4 text-[#ffff] bg-[#1078CA] w-full rounded-lg disabled:bg-[#EAEBEB] disabled:text-[#B5B6B6]"
            disabled={inputsArr.filter(Boolean).length !== 8}
            onClick={() => dispatch(VisitorPreference(decodeURIComponent(email), inputs, listDeveloperChecked, isReferensi))}
          >Lanjut Masuk ke Akunmu</button>
      </div>
  );
};

ModalPreferenceVisitor.propTypes = {
};

ModalPreferenceVisitor.defaultProps = {
};

export default ModalPreferenceVisitor;
