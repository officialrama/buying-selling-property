import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useListPropertyHooks from "../../hooks/useListPropertyHooks";
import { ProfileUser } from "../../components/templates";
import { Modal, SnackBar } from "../../components/organisms";
import { TableData, TblListPengajuanKpr, TblListPengajuanKprCS, TextboxLabel } from "../../components/molecules";
import { closeModalSuccess } from "../../store/actions/fetchData/superAdminState";
import { Button, SmallLoading } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import { listPengajuanCS } from "../../store/actions/fetchData/customer-service";
import { decryptStr } from "../../helpers/encryptDecrypt";
import cookie from "hs-cookie";
import _ from "lodash-contrib";
import { Pagination } from "flowbite-react";


const ListPengajuanCustomerService = ({userStatus}) => {
    const saState = useSelector((state) => state.superAdminReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = _.isJSON(cookie.get("morgateCookie")) ? JSON?.parse?.(cookie.get("morgateCookie"))?.emailView : ""
    const { onFetchData, setOnFetchData } = useListPropertyHooks();
    const [ dataPengajuanCS, setDataPengajuanCS] = useState();
    const [ fetchPengajuanCS, setFetchPengajuanCS] = useState({
        limit: 10,
        offset: 0,
        keyword: "",
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
      dispatch(listPengajuanCS(email, fetchPengajuanCS, setDataPengajuanCS))
    }, [fetchPengajuanCS]);

    const handleOnSearch = (evt) => {
      setFetchPengajuanCS({
        ...fetchPengajuanCS,
        nameSearch: evt.target.value,
      });
    };

    const handleKeyDown = (evt) => {
      if (evt.key === "Enter") {
        handleOnSearch();
      }
    };

    const handleInputChange = (evt) => {
      setFetchPengajuanCS({...fetchPengajuanCS, keyword : evt.target.value});
    };

    const onPageChange = (e) => {
      setFetchPengajuanCS({
        ...fetchPengajuanCS,
        offset: e - 1,
      });
    };
    const success = localStorage.getItem('snackBarSucces')
    return (
      <div>
        {success === 'true' &&
        <SnackBar timeout={5000} message='Berhasil mengajukan pembelian properti' refreshPage={true}/>}
        <ProfileUser
          title="List Pengajuan"
          userStatus={userStatus}
          data={saState.resApi && saState.resApi?.responseData && saState.resApi?.responseData[0]}
        >
        <div className="admin-page__srch-drp-wrap gtc-mon-user">
            <div className="admin-page__srch-drp">
              <TextboxLabel
                placeholder="Search"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="admin-page__srch-drp">
                <Button
                  buttonColor="blue"
                  textColor="white"
                  className="mobile:text-[12px] w-full"
                  onClick={() => {navigate("/customer-service/approvalCS")}}
                >
                  + Tambah Pengajuan
                </Button>
            </div>
          </div>
          <div className="property-listing__wrapper">
              <TableData
                header={[
                  { name: "No", class: "pengajuan-kpr-list__header" },
                  { name: "Pembeli", class: "pengajuan-kpr-list__header" },
                  { name: "Referral", class: "pengajuan-kpr-list__header" },
                  { name: "Properti", class: "pengajuan-kpr-list__header" },
                  { name: "Harga", class: "pengajuan-kpr-list__header" },
                  { name: "Status", class: "pengajuan-kpr-list__header" },
                  { name: "No. Referensi", class: "pengajuan-kpr-list__header" },
                  { name: "Action", class: "pengajuan-kpr-list__header" },
                ]}
              >
               {onFetchData ?
                  <tr>
                    <td colSpan="14" className="tabs-profile__loading">
                      <SmallLoading blueColor={true} />
                    </td>
                  </tr>
                  :
                  (dataPengajuanCS?.responseData?.length > 0 ?
                    (dataPengajuanCS?.responseData?.map((data, index) => {
                        return (
                          <TblListPengajuanKprCS
                            index={index}
                            data={data}
                          />
                        );
                    }))
                    :
                    <tr>
                      <td colSpan="8" className="tabs-profile__loading"> 
                        <p className="tabs-profile__text-not-found">Data tidak ditemukan</p>
                      </td>
                    </tr>
                  )
                } 
              </TableData>
          </div>

                <Pagination
                  currentPage={dataPengajuanCS?.metadata?.currentPage + 1 || 1}
                  totalPages={Math.ceil(dataPengajuanCS?.metadata?.totalData / 10) || 1}
                  onPageChange={onPageChange}
                  showIcons={false}
                  layout={window.innerWidth <=768 ? "navigation" : "pagination"}
                  className="flex items-center justify-center"
                />
        </ProfileUser>
      </div>
    );
  };
  
export default ListPengajuanCustomerService