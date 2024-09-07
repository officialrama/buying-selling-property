import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BorderLine, CurrencyInput, Radiobox, Textarea, UploadSingleFile } from '../../../../components/atoms';
import { Checkbox, DetailsCard, Dropdown, DropdownFasilitas, ModalGMaps, Textbox, TextboxDropdown, TextboxDropdownFasilitas } from '../../../../components/molecules';
import { GMapsPinBox, Location, Modal, SnackBar, UploadSellProp } from '../../../../components/organisms';
import { getLocByLatLng } from '../../../../helpers/getLocByLatLng';
import { showModalFail } from '../../../../store/actions/fetchData/superAdminState';
import { fasilitasAksesConst, jarakWaktuTempuhConst, typeFasilitasConst } from '../../../../static/fasilitas-akses/fasilitasAksesConst';
import { showSingleModal } from '../../../../store/actions/changeState';
import { deleteFasilitas } from '../../../../store/actions/fetchData/v2/saveProject';

const DetailProject = ({ inputs, brochureFile, loadingFile, setBrochureFile, handleRadioDropChange, handleCheckboxChange, handleInputChange, files, setFiles, zip, getRootProps, getInputProps, removeItem, handleOnDragEnd, dataAddress, setDataAddress, onChangeAddress, handleLetterNumberInput, handleAllCharInput, handleRangePrice, handleMobileNo, handleDateInput, siteplanFile, setSiteplanFile, pricelistFile, setPricelistFile, handleNumberInput, dropdownVal, setDropdownVal, fasAksesPropertiDto, setFasAksesPropertiDto, handleDeleteNewField, handleAdditionalFieldChange, handleAddField, newFieldAkses, setNewFieldAkses, idProject }) => {
  const state = useSelector((state) => state.stateReducer);
  const refBrochureUpload = useRef(null);
  const refSiteplanUpload = useRef(null);
  const refPricelistUpload = useRef(null);
 
  const dispatch = useDispatch();
  const resetBrochureUpload = () => {
    refBrochureUpload.current.value = null;
  };
  const resetSiteplanUpload = () => {
    refBrochureUpload.current.value = null;
  };
  const resetPricelistUpload = () => {
    refBrochureUpload.current.value = null;
  };

  const [isModalGmaps, setModalGmaps] = useState(false);
  const [mapsState, setMapsState] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
    address: "",
    zoom: 11,
    gestureHandling: "cooperative",
  });
  const handleLoadPinLoc = () => {
    if (!!dataAddress.placeId) {
      setMapsState({
        ...mapsState,
        center: {
          lat: dataAddress.lat,
          lng: dataAddress.lng,
        },
        address: dataAddress.address,
      });
      setModalGmaps(true);
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        getLocByLatLng(position.coords.longitude, position.coords.latitude)
          .then((res) => {
            setMapsState({
              ...mapsState,
              center: {
                ...mapsState.center,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              address: res.results[0].formatted_address,
              placeId: res.results[0].place_id,
              draggable: true,
            });
            // console.log(res.results[0])
          })
          .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
        setModalGmaps(true);
      }, function(error) {
        console.log(error)
        // default surabaya
        getLocByLatLng(112.768845, -7.250445)
          .then((res) => {
            setMapsState({
              ...mapsState,
              center: {
                ...mapsState.center,
                lat: -7.250445,
                lng: 112.768845,
              },
              address: res.results[0].formatted_address,
              placeId: res.results[0].place_id,
              draggable: true,
            });
            console.log(res.results[0])
          })
          .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
        setModalGmaps(true);
      });
    }

  };

  function RedStar() {
    return <span className="sellpropsV2__card__redstar">*</span>;
  }
  function InfoProyekItemWrap({ title, item }) {
    return (
      <div className="sellpropsV2__card__form-col__wrapper grid-tpl-col">
        <p className="sellpropsV2__card__form-col__title-25">
          {title}
        </p>
        <div>
          {item}
        </div>
      </div>
    )
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [id , setId] = useState("")
  // const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   const showSnackbar = localStorage.getItem('snackBarSucces');
  //     if (showSnackbar === 'true') {
  //       setVisible(true);
  //       const timer = setTimeout(() => {
  //         setVisible(false);
  //         localStorage.setItem('snackBarSucces', 'false');
  //       }, timeout);
  //       return () => clearTimeout(timer);
  //     } else {
  //       setVisible(false);
  //     }
  // }, [fasAksesPropertiDto]);
  return (
    <div>
      <div className='z-50'>
    <SnackBar message="Berhasil menghapus fasilitas/akses" status={fasAksesPropertiDto} />
    </div>
    {state.showSingleModal === true && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          onClickDelete={() => {
            dispatch(showSingleModal(!state.showSingleModal));
            dispatch(deleteFasilitas(idProject, id))
          }}
          modalTypes="deleteFasilitas"
        />
      )}
      <ModalGMaps
        isModalGmaps={isModalGmaps}
        dataAddress={dataAddress}
        mapsState={mapsState}
        setMapsState={setMapsState}
        setDataAddress={setDataAddress}
        setModalGmaps={setModalGmaps}
      />
      <div className="sellpropsV2__wrapper">
        <div className="sellpropsV2__text-wrapper">
          <p className="sellpropsV2__title">Detail Proyek</p>
        </div>
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__wrapper-content">
            <p className="sellpropsV2__card__title">Info Proyek {RedStar()}</p>
            {InfoProyekItemWrap({
              title: "Nama Proyek",
              item: [
                <Textbox
                  placeholder="Nama Proyek"
                  typeInput="text"
                  name="namaProyek"
                  value={inputs?.namaProyek?.value}
                  onChange={handleLetterNumberInput}
                  invalid={!inputs?.namaProyek?.isValid}
                  invalidTxt={!inputs?.namaProyek?.value ? "Nama Proyek tidak valid" : inputs?.namaProyek?.msgError} maxLength={100} />]
            })}
            {InfoProyekItemWrap({
              title: "Kisaran Harga",
              item: [
                <div className="sellpropsV2__priceRange__wrapper">
                  <CurrencyInput
                    className="textbox-label__currency"
                    name="startRangePrice"
                    placeholder="0"
                    decimalsLimit={2}
                    groupSeparator="."
                    decimalSeparator=","
                    maxLength={16}
                    allowNegativeValue={false}
                    value={inputs?.startRangePrice?.value}
                    onValueChange={(value) => handleRangePrice(value || "", "startRangePrice", inputs?.endRangePrice?.value)}
                    warnText={
                      Number(inputs?.startRangePrice?.value) > Number(inputs?.endRangePrice?.value) ?
                        "Harga awal melebihi harga akhir" :
                        inputs?.startRangePrice?.value !== "" && Number(inputs?.startRangePrice?.value) >= Number(inputs?.endRangePrice?.value) ?
                          "Harga awal sama dengan harga akhir" :
                          inputs?.startRangePrice?.value === "" && inputs?.endRangePrice?.value === "" ?
                            "Harga Mulai Properti Kosong" :
                            !inputs?.startRangePrice?.value && !inputs?.endRangePrice?.value ?
                              "Harga Mulai Properti Kosong" :
                              inputs?.startRangePrice?.msgError
                    }
                  />
                  <span className="sellpropsV2__horizontal-line-price" />
                  <CurrencyInput
                    className="textbox-label__currency"
                    name="endRangePrice"
                    placeholder="0"
                    decimalsLimit={2}
                    groupSeparator="."
                    decimalSeparator=","
                    maxLength={16}
                    allowNegativeValue={false}
                    value={inputs?.endRangePrice?.value}
                    onValueChange={(value) => handleRangePrice(value || "", "endRangePrice", inputs?.startRangePrice?.value)}
                    warnText={inputs?.endRangePrice?.msgError}
                  />
                </div>
              ]
            })}
            {InfoProyekItemWrap({
              title: "PIC Proyek",
              item: [
                <div className="w-[45%] mobile:w-full">
                  <Textbox
                    placeholder="PIC Proyek"
                    typeInput="text"
                    name="picProyek"
                    value={inputs?.picProyek?.value}
                    onChange={handleLetterNumberInput}
                    invalid={!inputs?.picProyek?.isValid}
                    invalidTxt={!inputs?.picProyek?.value ? "PIC Proyek tidak valid" : inputs?.picProyek?.msgError}
                  />
                </div>
              ]
            })}
            {InfoProyekItemWrap({
              title: "No HP PIC Proyek",
              item: [
                <Textbox
                  placeholder="No HP PIC Proyek"
                  typeInput="text"
                  name="noHpPic"
                  value={inputs?.noHpPic?.value}
                  onChange={handleMobileNo}
                  invalid={!inputs?.noHpPic?.isValid}
                  invalidTxt={!inputs?.noHpPic?.value ? "No Handphone tidak boleh kosong" : inputs?.noHpPic?.msgError}
                />
              ]
            })}
            {/* {InfoProyekItemWrap({
              title: "Tanggal Akhir Proyek",
              item: [
                <>
                  <DatePicker
                    name="tanggalAkhir"
                    onChange={(e) => {
                      handleDateInput(e, "tanggalAkhir", "endAt");
                    }}
                    value={inputs?.tanggalAkhir?.value || null}
                    onChangeRaw={(e) => e.preventDefault()}
                    locale="id-ID"
                    calendarIcon={<FaCalendarAlt />}
                    clearIcon={<MdOutlineClear />}
                  />
                  {!inputs?.tanggalAkhir?.value && <p className="textbox__invalidTxt">Tanggal Akhir Proyek belum dipilih</p>}
                </>
              ]
            })} */}
            {InfoProyekItemWrap({
              title: "Upload Brosur",
              item: [
                <UploadSingleFile
                  loading={loadingFile}
                  reference={refBrochureUpload}
                  name="brosur"
                  id="brosur"
                  files={brochureFile.file}
                  onChange={(e) => {
                    const fileName = e.target.files[0].name.toString();
                    const idxDot = fileName.lastIndexOf(".") + 1;
                    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                    if (extFile !== "pdf") {
                      dispatch(showModalFail("Gagal", "Format file tidak didukung"));
                    } else if (e.target.files[0].size > 5000000) {
                      dispatch(showModalFail("Gagal", "File Terlalu Besar"));
                      resetBrochureUpload();
                    } else {
                      // console.log("DEBUG Brosur", e.target.files);
                      Array.from(e.target.files).forEach((file) => {
                        setBrochureFile({ ...brochureFile, file: file, name: file.name, selected: true });
                      });
                    }
                  }}
                  selectedFile={brochureFile.selected && true}
                  fileName={brochureFile !== [] && brochureFile.name}
                  onClickClear={(e) => {
                    resetBrochureUpload();
                    setBrochureFile({ file: "", name: "", selected: false });
                  }}
                  acceptedFiles=".pdf"
                  invalidTxt={brochureFile.file === "" ? "File Brosur tidak boleh kosong" : ""}
                />
              ]
            })}
          </div>
        </DetailsCard>
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__wrapper-content">
            <p className="sellpropsV2__card__title">Tipe Properti {RedStar()}</p>
            <div>
              <div className="sellpropsV2__card__content-radio-grid">
                <Radiobox text="Apartment" checked={inputs?.tipeProperti?.value === "apartment"} name="apartment" onChange={(event) => handleRadioDropChange("tipeProperti", event.target.value)} />
                <Radiobox text="Rumah" checked={inputs?.tipeProperti?.value === "rumah"} name="rumah" onChange={(event) => handleRadioDropChange("tipeProperti", event.target.value)} />
                <Radiobox text="Ruko" checked={inputs?.tipeProperti?.value === "ruko"} name="ruko" onChange={(event) => handleRadioDropChange("tipeProperti", event.target.value)} />
                <Radiobox text="Villa" checked={inputs?.tipeProperti?.value === "villa"} name="villa" onChange={(event) => handleRadioDropChange("tipeProperti", event.target.value)} />
              </div>
              {!inputs?.tipeProperti?.isValid && <p className="textbox__invalidTxt mb-6 -mt-4">Tipe Properti tidak boleh kosong</p>}
            </div>
            <p className="sellpropsV2__card__title">Jenis Properti {RedStar()}</p>
            <div>
              <div className="sellpropsV2__card__content-radio-grid">
                <Radiobox text="Subsidi" checked={inputs?.jenisProperti?.value === "subsidi"} name="subsidi" onChange={(event) => handleRadioDropChange("jenisProperti", event.target.value)} />
                <Radiobox text="Non Subsidi" checked={inputs?.jenisProperti?.value === "nonsubsidi"} name="nonsubsidi" onChange={(event) => handleRadioDropChange("jenisProperti", event.target.value)} />
              </div>
              {!inputs?.jenisProperti?.isValid && <p className="textbox__invalidTxt mb-6 -mt-4">Jenis Properti tidak boleh kosong</p>}
            </div>
            <div className="sellpropsV2__horizontal-line">
              <BorderLine />
            </div>
            {/* <TextboxLabel
              placeholder="Cari nama lokasi, alamat atau kode pos"
              rightLabel={<img alt="icons" src="/icons/search_btn.svg" />}
              rightLabelBorder={false}
            /> */}
            <Location
              title="Lokasi Properti"
              dataAddress={dataAddress}
              onChangeText={onChangeAddress}
              setDataAddress={setDataAddress}
            />
            <div className="sellprops__card__pinloc-wrap">
              <GMapsPinBox
                title="Pin Lokasi"
                setModalGmaps={handleLoadPinLoc}
                dataAddress={dataAddress}
              />
            </div>
            {dataAddress?.address === "" && <p className="textbox__invalidTxt mb-4">Pin Lokasi tidak boleh kosong</p>}
          </div>
        </DetailsCard>
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__desc-wrap">
            <p className="sellpropsV2__card__desc-title">
              Deskripsi {RedStar()}
            </p>
            <div className="sellpropsV2__card__form-col__form-75">
              <Textarea
                placeholder="Tulis deskripsi properti"
                resize={true}
                rows={6}
                name="deskripsi"
                value={inputs?.deskripsi?.value}
                maxLength={5000}
                warnText={!inputs?.deskripsi?.value ? "Deskripsi tidak valid" : inputs?.deskripsi?.msgError}
                onChange={handleAllCharInput}
              />
            </div>
          </div>
        </DetailsCard>
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__wrapper-content">
            <p className="sellpropsV2__card__title">Fasilitas & Akses</p>
            <div className='flex flex-col gap-4 justify-start'>
            {fasAksesPropertiDto.map((field, index) => (
              <div key={index} className="flex flex-row gap-4 py-3 w-[940px]">
                <div className='flex flex-col gap-3'>
                <p className='text-xs font-semibold whitespace-nowrap'>Kategori</p>
                <div className='w-[200px]'>
                      <Dropdown
                        value={field?.kategori?.value}
                        data={typeFasilitasConst}
                        // onChange={(selectedValue) => {
                        //   handleAdditionalFieldChange(index, 'kategori', selectedValue)}}
                        placeholder={'Pilih Tipe Fasilitas'}
                      />
                      </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                  <p className='text-xs font-semibold whitespace-nowrap'>Tipe Fasilitas/Akses</p>
                  <div className='w-[200px]'>
                    <DropdownFasilitas
                      data={dropdownVal.options}
                      value={field?.tipeFasilitas?.value}
                      // onChange={(selectedValue) => {
                      //   handleAdditionalFieldChange(index, 'tipeFasilitas', selectedValue)}}
                      placeholder="Pilih Tipe Fasilitas/Akses"
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <p className='text-xs font-semibold whitespace-nowrap'>Nama Fasilitas/Akses</p>
                  <div className='w-[260px]'>
                  <Textbox
                    placeholder="Masukan Nama Fasilitas / Akses"
                    typeInput="text"
                    value={field?.namaFas?.value}
                    // onChange={(e) => handleAdditionalFieldChange(index, 'namaFas', e.target.value)}
                    maxLength={100}
                  />
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <p className='text-xs font-semibold whitespace-nowrap'>Jarak/Waktu Tempuh</p>
                  <div className='flex flex-row'>
                  {/* <div className='w-[100px]'>
                      <Textbox
                        placeholder="Masukan Jarak/Waktu Tempuh"
                        typeInput="text"
                        value={field?.jarakWaktuTempuh?.value}
                        // onChange={(e) => handleAdditionalFieldChange(index, 'jarakWaktuTempuh', e.target.value)}
                        maxLength={2}
                      />
                    </div>
                    <div className='w-[85px] h-[50px] text-xs font-semibold'>
                      <Dropdown
                        value={field?.satuan?.value}
                        data={jarakWaktuTempuhConst}
                        // onChange={(selectedValue) => {
                        //   handleAdditionalFieldChange(index, 'satuan', selectedValue)}}
                        placeholder={jarakWaktuTempuhConst?.[0].value}
                      />
                    </div> */}
                    <TextboxDropdownFasilitas
                      valueInput={field?.jarakWaktuTempuh?.value}
                      maxLength={2}
                      value={field?.satuan?.value}
                      data={jarakWaktuTempuhConst}
                    />
                  </div>
                </div>
            <button className='text-[#777777] text-3xl w-[40px] h-[44px] pt-8 pr-2' 
            onClick={() => dispatch(showSingleModal(true))
            (setId(field?.id))
            }>X</button>
            </div>
             ))}
              {newFieldAkses.map((field, index) => (
              <div key={index} className="flex flex-row gap-4 py-3 w-[940px]">
                <div className='flex flex-col gap-3'>
                <p className='text-xs font-semibold whitespace-nowrap'>Kategori</p>
                <div className='w-[200px]'>
                      <Dropdown
                        value={field?.kategori?.value}
                        data={typeFasilitasConst}
                        onChange={(selectedValue) => {
                          handleAdditionalFieldChange(index, 'kategori', selectedValue)}}
                        placeholder={'Pilih Tipe Fasilitas'}
                      />
                      </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                  <p className='text-xs font-semibold whitespace-nowrap'>Tipe Fasilitas/Akses</p>
                  <div className="w-[200px]">
                    <DropdownFasilitas
                      data={field.filteredTipeFasilitas || []}
                      value={field?.tipeFasilitas?.value}
                      onChange={(selectedValue) => {
                        handleAdditionalFieldChange(index, 'tipeFasilitas', selectedValue)}}
                      placeholder="Pilih Tipe Fasilitas/Akses"
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <p className='text-xs font-semibold whitespace-nowrap'>Nama Fasilitas/Akses</p>
                  <div className='w-[260px]'>
                  <Textbox
                    placeholder="Masukan Nama Fasilitas / Akses"
                    typeInput="text"
                    value={field?.namaFas?.value}
                    onChange={(e) => handleAdditionalFieldChange(index, 'namaFas', e.target.value)}
                    maxLength={100}
                  />
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <p className='text-xs font-semibold whitespace-nowrap'>Jarak/Waktu Tempuh</p>
                  <div className='flex flex-row'>
                    <TextboxDropdownFasilitas
                      placeholder="Masukan Jarak/Waktu Tempuh"
                      onValueChange={(e) => handleAdditionalFieldChange(index, 'jarakWaktuTempuh', e.target.value)}
                      onChange={(selectedValue) => {handleAdditionalFieldChange(index, 'satuan', selectedValue)}}
                      valueInput={field?.jarakWaktuTempuh?.value}
                      maxLength={2}
                      placeholderDropdown={jarakWaktuTempuhConst?.[0].name}
                      value={field?.satuan?.value}
                      data={jarakWaktuTempuhConst}
                    />
                  </div>
                </div>
            <button className='text-[#777777] text-3xl w-[40px] h-[44px] pt-8 pr-2' onClick={() => handleDeleteNewField(index)}>X</button>
            </div>
             ))}
             <div>
            <button className='border border-[#1078CA] text-[#1078CA] whitespace-nowrap font-bold rounded-lg h-[40px] text-sm px-4' onClick={handleAddField}>+ Tambah Fasilitas & Akses</button>
            </div>
            </div>
          </div>
        </DetailsCard>
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__wrapper-content">
            <p className="sellpropsV2__card__title">Foto Proyek {RedStar()}</p>
            <UploadSellProp
              files={files}
              setFiles={setFiles}
              zip={zip}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              removeItem={removeItem}
            />
            {files.length < 4 && <p className="textbox__invalidTxt mb-4">Upload Foto Minimal 4</p>}
          </div>
        </DetailsCard>
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div className="sellpropsV2__card__wrapper-content">
            <p className="sellpropsV2__card__title">Video Youtube</p>
            <Textbox placeholder="Link video youtube" typeInput="text" name="youtubeUrl" value={inputs?.youtubeUrl?.value} onChange={handleInputChange} />
          </div>
          <div className="sellpropsV2__card__wrapper-content">
            <p className="sellpropsV2__card__title">Virtual 360</p>
            <Textbox placeholder="Virtual 360" typeInput="text" name="virtual360Url" value={inputs?.virtual360Url?.value} onChange={handleInputChange} />
          </div>
        </DetailsCard>
      </div>
    </div>
  );
};

export default DetailProject;