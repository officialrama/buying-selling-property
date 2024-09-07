/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CurrencyInput, InputMasked, LabelInputTextbox, Dropdown } from "../../../components/atoms";
import { ModalGimmick, TableInquiryGimmick, TableNewGimmick } from "../../../components/molecules";
import { AddInquiry, Modal, NavHeaderAdmin, SideMenuAdmin } from "../../../components/organisms";
import { formatRupiah, formatRupiahNumber, toTitleCase } from "../../../helpers/string";
import useInputGmkHooks from "../../../hooks/useInputGmkHooks";
import useInputHooks from '../../../hooks/useInputHooks';
import useSAHooks from "../../../hooks/useSAHooks";
import { listInquiryGimmickConst } from "../../../static/admin/inquiry-gimmick-kpr";
import { staticConst } from "../../../static/staticConst";
import { showSingleModal } from "../../../store/actions/changeState";
import { addGimmick, deleteGimmick, editGimmick, inquiryListGimmick } from "../../../store/actions/fetchData/inquiryGimmick";
import {
  closeModalFail,
  closeModalSuccess,
  saReset
} from "../../../store/actions/fetchData/superAdminState";
import TextboxLabel from "./../../../components/molecules/Input/textbox-custom/textbox-label";
import TableData from "./../../../components/molecules/Tables/Component";
import { Pagination } from "flowbite-react";
import useKprApprovalHooks from "../../../hooks/useKprApprovalHooks";
import { personalDataConst } from "../../../static/personal-data/personal-data";
import useFormStepperHooks from "../../../hooks/useFormStepperHooks";

const InquiryGimmick = () => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const saState = useSelector((state) => state.superAdminReducer);
  const state = useSelector((state) => state.stateReducer);
  const { bodyInquiryGimmick, setBodyInquiryGimmick, dataTemp, setDataTemp, gimmickId, setGimmickId, editMode, setEditMode, handleSearchChange, cari } = useSAHooks();
  const { inputs } = useInputHooks();
  const { inputsGmk, setInputsGmk, handleInput, handleAltInput, handleNumberInput, handleInputNoZero, handleAdmPercentInput, handleStrSpecChar, handleInputNoNumberAndSpec, handleRadioDropChange } = useInputGmkHooks();
  const { dropdownVal, setDropdownVal } = useKprApprovalHooks();

  useEffect(() => {
    setDataTemp({
      ...dataTemp,
      originalRows: saState?.resApi?.responseData,
      rows: saState?.resApi?.responseData,
      metadata: saState?.resApi?.metadata
    });
  }, [saState?.resApi]);

  useEffect(() => {
    dispatch(inquiryListGimmick(bodyInquiryGimmick));
    return () => {
      dispatch(saReset());
    };
  }, [bodyInquiryGimmick]);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleModalEdit = (id) => {
    if (id) {
      const dataFiltered = dataTemp.rows.filter((e) => e.id === id)[0];
      setInputsGmk({
        name: { isValid: !!dataFiltered.name, value: dataFiltered.name },
        programGimmick: { isValid: !!dataFiltered.programGimmick, value: dataFiltered.programGimmick },
        biayaAdminNominal: { isValid: !!dataFiltered.biayaAdminNominal, value: dataFiltered.biayaAdminNominal },
        biayaProvisiNominal: { isValid: !!dataFiltered.biayaProvisiNominal, value: dataFiltered.biayaProvisiNominal },
        biayaAdminPercentage: { isValid: !!dataFiltered.biayaAdminPercentage, value: dataFiltered.biayaAdminPercentage },
        biayaProvisiPercentage: { isValid: !!dataFiltered.biayaProvisiPercentage, value: dataFiltered.biayaProvisiPercentage },
        fixedRate: { isValid: !!dataFiltered.fixedRate, value: dataFiltered.fixedRate },
        floatingRate: { isValid: !!dataFiltered.floatingRate, value: dataFiltered.floatingRate },
        tenorFixedRate: { isValid: !!dataFiltered.tenorFixedRate, value: dataFiltered.tenorFixedRate / 12 },
        gimmickId: { value: dataFiltered.id },
      })
    }
    setIsModal(!isModal);
  };

  const closeModal = () => {
    setInputsGmk({});
    setIsModal(false);
  };

  const [filter, setFilter] = useState({
    userType: { name: "Semua", value: "all" },
  });

  const handleChangeTypes = (data) => {
    setFilter({
      ...filter,
      userType: data,
    });
    setBodyInquiryGimmick({
      ...bodyInquiryGimmick,
      status: data.value
    });
    // dispatch(inquiryListGimmick({ ...bodyInquiryGimmick, status: data.value }));
  };

  const handleOnSearch = () => {

    setBodyInquiryGimmick({
      ...bodyInquiryGimmick,
      nameSearch: cari,
      pageStart: 1
    });
  };

  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") {
      handleOnSearch();
    }
  };

  const onPageChange = (e) => {
    setBodyInquiryGimmick({
      ...bodyInquiryGimmick,
      pageStart: e,
    });
  }

  return (
    <div>
      {state.showSingleModal === true && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          onClickDelete={() => dispatch(deleteGimmick(gimmickId))}
          modalTypes="deleteConfirm"
          title="Konfirmasi"
        />
      )}
      {saState.success === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            dispatch(saReset());
            dispatch(inquiryListGimmick(bodyInquiryGimmick));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalFail());
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <NavHeaderAdmin />
      <SideMenuAdmin title="Inquiry Program Suku Bunga">
        <div>
          <div className="admin-page__srch-drp-gmk-wrap gtc-gmk-kpr">
            <div>
              <div className="admin-page__srch-drp">
                <TextboxLabel
                  placeholder="Search"
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <div className="admin-page__srch-drp">
              <Dropdown onClick={handleChangeTypes} type={filter?.userType} dropdownData={staticConst.gimmickFilter} />
            </div>
            <div>
              <Button
                buttonColor="blue"
                textColor="white"
                className="mobile:text-[12px] text-[15px] mobile:w-full text-center mobile:mb-2"
                onClick={() => {
                  setEditMode(false);
                  handleModal();
                }}
              >
                + Tambah Program
              </Button>
            </div>
          </div>
          <TableNewGimmick
            tblAdmin
            header={[
              {
                name: "Nama Program",
                class: "admin-page__tbl--left",
              },
              {
                name: "Tipe Program",
                class: "admin-page__tbl",
              },
              {
                topName: " ",
                name: "Biaya",
                class: "admin-page__tbl",
              },
              {
                topName: "Admin",
                name: "%",
                class: "admin-page__tbl",
              },
              {
                topName: " ",
                name: "Biaya",
                class: "admin-page__tbl",
              },
              {
                topName: "Provisi",
                name: "%",
                class: "admin-page__tbl",
              },
              {
                name: "Suku Bunga",
                class: "admin-page__tbl",
              },
              {
                name: "Floating Rate",
                class: "admin-page__tbl",
              },
              {
                name: "Tenor",
                class: "admin-page__tbl",
              },
              {
                name: "Status",
                class: "admin-page__tbl",
              },
              {
                name: "Aksi",
                class: "admin-page__tbl--right",
              },
            ]}
          >
            {dataTemp?.rows !== undefined ?
              (
                <>
                  {dataTemp?.rows?.map((data, index) => {
                    return (
                      <TableInquiryGimmick
                        lastElm={listInquiryGimmickConst.length - 1}
                        index={index}
                        name={data.name}
                        biayaAdmin={formatRupiahNumber(data.biayaAdminNominal || 0)}
                        biayaProvisi={formatRupiahNumber(data.biayaProvisiNominal || 0)}
                        biayaAdminPersen={`${data.biayaAdminPercentage || 0} %`}
                        biayaProvisiPersen={`${data.biayaProvisiPercentage || 0} %`}
                        fixedRate={`${data.fixedRate || 0} %`}
                        floatingRate={`${data.floatingRate || 0} %`}
                        tenorFixedRate={`${data.tenorFixedRate / 12 || 0}`}
                        gimmickType={data.gimmickType}
                        status={toTitleCase(data.status)}
                        onClickDelete={() => {
                          setGimmickId(data.id);
                          dispatch(showSingleModal(true));
                        }}
                        onClickEdit={() => {
                          setEditMode(true);
                          setGimmickId(data.id);
                          handleModalEdit(data.id);
                        }}
                      />
                    );
                  })}
                </>
              ) : (
                <tr >
                  <td colspan="10" className="rounded-tr-lg border-l border-r text-center mobile:text-left">Data tidak ditemukan</td>
                </tr>
              )
            }
          </TableNewGimmick>
          {dataTemp && dataTemp?.metadata?.listGimmickDtoRes?.totalData > 10 ?
            (
              <div className='flex items-center justify-center'>
                <Pagination
                  currentPage={dataTemp?.metadata?.listGimmickDtoRes?.currentPage || 1}
                  totalPages={Math.ceil(dataTemp?.metadata?.listGimmickDtoRes?.totalData / 10) || 10}
                  onPageChange={onPageChange}
                  showIcons={true}
                />
              </div>
            ) : ""
          }
        </div>
        <AddInquiry data={dataTemp?.rows} id={gimmickId} isModal={isModal} editMode={editMode} closeModal={closeModal} inputs={inputs} inputsGmk={inputsGmk} dispatch={dispatch} otherProps={{ handleInput, handleAdmPercentInput, handleInputNoZero, handleAltInput, handleNumberInput, handleStrSpecChar, handleInputNoNumberAndSpec, dropdownVal, setDropdownVal, handleRadioDropChange }} />
      </SideMenuAdmin >
    </div >
  );
};

export default InquiryGimmick;