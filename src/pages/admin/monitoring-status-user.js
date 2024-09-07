import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  NavHeaderAdmin,
  SideMenuAdmin,
} from "../../components/organisms";
import TextboxLabel from "./../../components/molecules/Input/textbox-custom/textbox-label";
import { Pagination } from "flowbite-react";
import TableData from "./../../components/molecules/Tables/Component";
import useSAHooks from "../../hooks/useSAHooks";
import {
  closeModalFail,
  closeModalSuccess,
  deleteUser,
  inquiryListUser,
  saReset,
} from "../../store/actions/fetchData/superAdminState";
import { showSingleModal } from "../../store/actions/changeState";
import { Dropdown } from "../../components/atoms";
import { staticConst } from "../../static/staticConst";
import { toTitleCase } from "../../helpers/string";
import cookie from "hs-cookie";
import _ from 'lodash-contrib';
import { decryptStr } from "../../helpers/encryptDecrypt";
import TableUser from "./table-user";
import { FiSearch } from "react-icons/fi";

const StatusUser = () => {
  const state = useSelector((state) => state.stateReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const dispatch = useDispatch();
  const [dataTemp, setDataTemp] = useState({
    originalRows: [],
    rows: [],
    search: "",
  });
  const [filter, setFilter] = useState({
    userType: { name: "Semua Type", value: "all" },
  });
  const { bodyListOfUser, setBodyListOfUser } = useSAHooks();
  const [email, setEmail] = useState("");
  const [cari, setCari] = useState("");
  const [typeUser, setTypeUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const emailCookie = _.isJSON(cookie?.get?.("morgateCookie")) && JSON?.parse?.(cookie?.get?.("morgateCookie"))?.email;

  useEffect(() => {

    dispatch(inquiryListUser(bodyListOfUser, emailCookie));
    return () => {
      dispatch(saReset());
    };
  }, [bodyListOfUser]);

  useEffect(() => {
    setDataTemp({
      ...dataTemp,
      originalRows: saState?.resApi?.responseData,
      rows: saState?.resApi?.responseData,
      metadata: saState?.resApi?.metadata
    });
  }, [saState?.resApi]);

  const handleChangeTypes = (data) => {
    setFilter({
      ...filter,
      userType: data
    });

    setBodyListOfUser({
      ...bodyListOfUser,
      userType: data.value,
      pageStart: 1
    });
  };

  const handleInputChange = (evt) => {
    setCari(evt.target.value);
  };

  const handleOnSearch = () => {
    setBodyListOfUser({
      ...bodyListOfUser,
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
    setBodyListOfUser({
      ...bodyListOfUser,
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
            dispatch(deleteUser(email, typeUser));
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
            dispatch(inquiryListUser(bodyListOfUser, emailCookie));
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => dispatch(closeModalFail())}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <NavHeaderAdmin
        menuOnClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <SideMenuAdmin
        title="Status & Detail User"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
          <div className="admin-page__srch-drp-wrap gtc-mon-user">
            <div className="admin-page__srch-drp">
              <TextboxLabel
                leftLabel={<FiSearch color={"#777777"} />}
                placeholder="Cari"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="admin-page__srch-drp">
              <Dropdown onClick={handleChangeTypes} type={filter?.userType} dropdownData={staticConst.allTypeMenu} />
            </div>
          </div>
          <div className="user-ref__wrapper">
          <TableUser dataTemp={React.useMemo(() => (dataTemp), [dataTemp])} setEmail={setEmail} setTypeUser={setTypeUser} />
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

export default React.memo(StatusUser);
