/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../../components/atoms";
import { Pagination } from "flowbite-react";
import TextboxLabel from "../../../components/molecules/Input/textbox-custom/textbox-label";
import TableData from "../../../components/molecules/Tables/Component";
import {
  Modal,
  NavHeaderAdmin,
  SideMenuAdmin
} from "../../../components/organisms";
import useSAHooks from "../../../hooks/useSAHooks";
import { showSingleModal } from "../../../store/actions/changeState";
import {
  closeModalFail,
  closeModalSuccess,
  deleteUser,
  inquiryListUser,
  saReset
} from "../../../store/actions/fetchData/superAdminState";
import cookie from "hs-cookie";
import _ from 'lodash-contrib';
import { encryptStrFe, decryptStr } from '../../../helpers/encryptDecrypt';
import TableListDeveloper from "../table-list-developer";

const rupiahformat = require("rupiah-format");
const Developer = () => {
  const onClickView = (email) => {
    window.location.href = `/admin/user-management/developer/${encodeURIComponent(encryptStrFe(email)).toString()}`;
  };
  const state = useSelector((state) => state.stateReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const { bodyListOfUser, setBodyListOfUser, dataTemp, setDataTemp, bodyListDev, setBodyListDev, handleSearchChange, cari } = useSAHooks();
  const [email, setEmail] = useState("");
  const emailCookie = _.isJSON(cookie?.get?.("morgateCookie")) && JSON?.parse?.(cookie?.get?.("morgateCookie"))?.email;

  useEffect(() => {
    setDataTemp({
      ...dataTemp,
      originalRows: saState?.resApi?.responseData,
      rows: saState?.resApi?.responseData,
      metadata: saState?.resApi?.metadata
    });
  }, [saState?.resApi]);

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(
      inquiryListUser(bodyListDev, emailCookie)
    );
    return () => {
      dispatch(saReset());
    };
  }, [bodyListDev]);

  const handleOnSearch = () => {
    setBodyListDev({
      ...bodyListDev,
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
    setBodyListDev({
      ...bodyListDev,
      pageStart: e,
    });
  };

  return (
    <div>
      {state.showSingleModal === true && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          onClickDelete={() => {
            dispatch(showSingleModal(!state.showSingleModal));
            dispatch(deleteUser(email, "Developer"));
          }}
          modalTypes="deleteConfirm"
          title="Konfirmasi"
        />
      )}
      {saState.success === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalSuccess());
            dispatch(saReset());
            dispatch(inquiryListUser(bodyListDev, emailCookie));
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
            dispatch(saReset());
            dispatch(inquiryListUser(bodyListDev, emailCookie));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <NavHeaderAdmin />
      <SideMenuAdmin title="Developer">
          <div className="admin-page__srch-drp-wrap gtc-mon-user">
            <div className="admin-page__srch-drp">
              <TextboxLabel
                placeholder="Search"
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="admin-page__srch-drp">
              <Link to="/admin/user-management/developer">
                <Button
                  buttonColor="blue"
                  textColor="white"
                  className="mobile:text-[12px] w-full"
                >
                  + Tambah Developer
                </Button>
              </Link>
            </div>
          </div>
          <div className="user-ref__wrapper">
          <TableListDeveloper dataTemp={React.useMemo(() => (dataTemp), [dataTemp])} setEmail={setEmail} />
          {dataTemp?.metadata?.listUserDtoRes?.totalData > 10 ?
            (
                <Pagination
                  currentPage={dataTemp?.metadata?.listUserDtoRes?.currentPage || 1}
                  totalPages={Math.ceil(dataTemp?.metadata?.listUserDtoRes?.totalData / 10) || 1}
                  onPageChange={onPageChange}
                  showIcons={false}
                  layout={window.innerWidth <=768 ? "navigation" : "pagination"}
                  className="flex items-center justify-center"
                />
            ) : ""
          }
        </div>
      </SideMenuAdmin>
    </div>
  );
};

export default React.memo(Developer);
