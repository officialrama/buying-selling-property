/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootPages from "./pages";
import StatusUser from "./pages/admin/monitoring-status-user";
import InquiryGimmick from "./pages/admin/update-program-kpr/inquiry-gimmick-kpr";
import Developer from "./pages/admin/user-management/developer";
import ListDeveloper from "./pages/admin/user-management/list-developer";
import UploadDeveloper from "./pages/admin/user-management/upload-developer";
import { ForgotPassword, ForgotPasswordOTP } from "./pages/forgot-password";
import ForgotPasswordDoneChange from "./pages/forgot-password/done";
import NewPassword from "./pages/forgot-password/new-password";
import PengajuanKpr from "./pages/kpr/approval";
import DoneSubmitKpr from "./pages/kpr/done";
import DoneSubmitVisitorKpr from "./pages/kpr/done-visitor";
import DoneNoUtj from "./pages/kpr/done-noutj.js";
import PengajuanKprSales from "./pages/kpr-sales/approval-sales";
import KPRSimulasi from "./pages/kpr/simulasi";
import KPRSimulasiSales from "./pages/kpr-sales/simulasi-sales";
import Asuransi from "./pages/landing-page/insurance";
import Dashboard from "./pages/landing-page";
import About from "./pages/landing-page/about";
import PrivacyPolicy from "./pages/landing-page/privacy-policy";
import TermsAndConditions from "./pages/landing-page/terms-and-conditions";
import SignupUsingSocmed from "./pages/landing-page/signup-using-socmed";
import Expo from "./pages/landing-page/expo";
import OutletIndex from "./pages/outlet";
import ProductDetailsV2 from "./pages/product-details/v2";
import CompareProperty from "./pages/product-details/v2/compare-property";
import ListPengajuanKpr from "./pages/profile-user/list-pengajuan-kpr";
import Profile from "./pages/profile-user/profile";
import EditIdentitas from "./pages/profile-user/edit-identitas";
import SalesReferral from "./pages/profile-user/sales-referral";
import UserRefferal from "./pages/profile-user/user-referral";
import SavedProperty from "./pages/profile-user/saved-property";
import PropertyListingV2Responsive from "./pages/profile-user/v2/property-listing-responsive";
import SearchResults from "./pages/search/search-results";
import SellProperty from "./pages/sell-property";
import UploadProyek from "./pages/sell-property/v2/upload-project";
import DetailCluster from "./pages/sell-property/v2/upload-project/detail-cluster";
import DetailUnitProp from "./pages/sell-property/v2/upload-project/detail-unit";
import TypeUnitEdit from "./pages/sell-property/v2/upload-project/type-unit-edit";
import ChatExample from "./pages/test-page/chat";
import store from "./store/store";
import DeveloperPage from "./pages/developer/index";
import SearchResultsV2 from "./pages/search/v2/search-results";
import PenjualanResultsV2 from "./pages/sales/mis/v2/penjualan-results";
import ProjectDetails from "./pages/project-details";
import { decryptStr } from "./helpers/encryptDecrypt";
import Activation from "./pages/forgot-password/activation";
import ActivationSales from "./pages/forgot-password/activation-sales";
import SalesRefferalAdmin from "./pages/admin/mis/sales-refferal";
import UserRefferalAdmin from "./pages/admin/mis/user-refferal";
import { userMe } from "./store/actions/fetchData/userState";
import PengajuanKPRAdmin from "./pages/admin/mis/pengajuan-kpr";
import WishlistAdmin from "./pages/admin/mis/wishlist";
import DataPenjualanDraft from "./pages/sales/mis/data-penjualan-draft";
import DataPenjualanFinal from "./pages/sales/mis/data-penjualan-final";
import ProjectSales from "./pages/sales/mis/v2/project-sales";
import WishlistDeveloper from "./pages/profile-user/wishlist-developer";
import SalesPerson from "./pages/admin/user-management/salesperson";
import SettingSales from "./pages/sales/mis/setting-sales";
import ListHLM from "./pages/admin/lrc/list-hlm";
import CompanyRegistration from "./pages/admin/lrc/company-registration";
import SuccesBeli from "./pages/sales/mis/succes-beli";
import SummaryBuyer from "./pages/kpr/summary-buyer";
import FailBeli from "./pages/sales/mis/fail-beli";
import SuccesBeliVisitor from "./pages/kpr/success-beli-visitor";
import PrivateRoutes from "./utils/PrivateRoutes";
import Maintenance from "./pages/maintenance-page/maintenance";
import LifeCare from "./pages/landing-page/asuransi/life-care";
import PengajuanAsuransi from "./pages/landing-page/asuransi/approval-insurance";
import AcciCare from "./pages/landing-page/asuransi/acci-care";
import Davestera from "./pages/landing-page/asuransi/davestera";
import BrinsAsri from "./pages/landing-page/asuransi/brins-asri";
import BrinsOto from "./pages/landing-page/asuransi/brins-oto";
import BrinsSepeda from "./pages/landing-page/asuransi/asuransi-sepeda";
import LandingPageInfoLelang from "./pages/properti-secondary/v2/landing-page-info-lelang";
import AdminCabang from "./pages/admin/user-management/admin-cabang";
import {
  ProfileAdminCabang,
  ListKjpp,
  ListPropertiSecondary,
  AddPropertiSecondary,
  EditPropertiSecondary
} from './pages/admin-cabang'
import ListNotaris from "./pages/admin-cabang/list-notaris.js"
import DetailProduct from "./pages/info-lelang/detail-product.js"
import DeveloperSummary from "./pages/admin/developer-summary.js";
import PksDeveloper from "./pages/admin/pks-developer.js";
import PengajuanDeveloper from "./pages/admin/pengajuan-developer.js";
import ExecutiveSummary from "./pages/admin/executive-summary.js"
import DynamicBanner from "./pages/admin/dynamic-banner.js"
import ProjectDetails2 from "./pages/project-details/indexv2.js"
import CustomerService from "./pages/admin/user-management/customer-service.js"
import Compare from "./pages/project-details/compare.js"

//Page Customer Service
import {
  ProfileCustomerService,
  ListPengajuanCustomerService,
  PengajuanCS,
  DetailPengajuanCS
} from "./pages/customer-service"
import {
  ListArticles,
  AddArticle
} from "./pages/admin/article/index.js"

import { HomespotUpdateLandingPage, HomespotAllContent, SearchPageArticle } from "../src/pages/article/index.js"


// Test
import DetailProperti from "./pages/admin-cabang/AddPropertiSecondary/detail-properti";
import InformasiProperti from "./pages/admin-cabang/AddPropertiSecondary/informasi-properti";
import KelengkapanRumah from "./pages/admin-cabang/AddPropertiSecondary/kelengkapan-rumah";
import Foto from "./pages/admin-cabang/AddPropertiSecondary/foto";
import RatingHomespot from "./pages/admin/rating-homespot.js";
import Ringkasan from "./pages/admin-cabang/AddPropertiSecondary/ringkasan";
import DetailHomespotUpdate from "./pages/article/detail-article.js";
import PreferenceVisitor from "./pages/preference-visitor/preference-visitor.js";


function App() {
  // useEffect(() => {
  //   (function () {
  //     (function a() {
  //       try {
  //         (function b(i) {
  //           if (('' + (i / i)).length !== 1 || i % 20 === 0) {
  //             (function () { }).constructor('debugger')()
  //           } else {
  //             debugger
  //           }
  //           b(++i)
  //         })(0)
  //       } catch (e) {
  //         setTimeout(a, 5000)
  //       }
  //     })()
  //   })();
  //   if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  //     for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
  //       window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? ()=>{} : null;
  //     }
  //   }
  //   document.onkeydown = function (e) {
  //     return (
  //       123 != e.keyCode &&
  //       (!e.ctrlKey || !e.shiftKey || e.keyCode != 'I'.charCodeAt(0)) &&
  //       (!e.ctrlKey || !e.shiftKey || e.keyCode != 'J'.charCodeAt(0)) &&
  //       (!e.ctrlKey || e.keyCode != 'U'.charCodeAt(0)) &&
  //       (!e.ctrlKey || !e.shiftKey || e.keyCode != 'C'.charCodeAt(0)) &&
  //       void 0
  //     );
  //   };
  // }, []);


  const dispatch = useDispatch();
  const [getUserStatus, setGetUserStatus] = useState({
    referralCode: "",
    email: "",
    userType: "",
    isLoggedIn: false,
    name: "",
    rememberMe: false
  });

  const [getUserJwt, setUserJwt] = useState("");

  useEffect(() => {
    const userStatus = {
      ...getUserStatus,
    }
    const morgateCookieStr = cookie.get("morgateCookie")
    if (morgateCookieStr) {
      const morgateCookie = JSON.parse(morgateCookieStr)
      Object.assign(userStatus, morgateCookie)
    }

    const jwt = cookie.get("jwt")
    if (morgateCookieStr && jwt) {
      if (userStatus.email) {
        // If email exist but not loggedIn then dispatch get me
        dispatch(userMe(userStatus.email));
      }
    }
    setGetUserStatus(userStatus);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootPages userProps={getUserStatus} setUserJwt={setUserJwt} />}>
            <Route index element={process.env.REACT_APP_MAINTENANCE === "true" ? <Navigate to="/maintenance" /> : <Dashboard />} />
            <Route path="testing" element={<Dashboard />} />
            <Route path="about-us" element={<About />} />
            <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="terms-and-conditions" element={<TermsAndConditions />}/>
            <Route path="signup-using-socmed" element={<SignupUsingSocmed />} />
            <Route path="expo" element={<Expo />}/>
            <Route path="insurance" element={<Asuransi />}/>
            <Route path="asuransi/" element={<OutletIndex />} >
            <Route path="approval-insurance" element={<PengajuanAsuransi />} />
            </Route>
            <Route path="life-care" element={<LifeCare />}/>
            <Route path="acci-care" element={<AcciCare />}/>
            <Route path="davestera" element={<Davestera />}/>
            <Route path="brins-asri" element={<BrinsAsri />}/>
            <Route path="brins-oto" element={<BrinsOto />}/>
            <Route path="asuransi-sepeda" element={<BrinsSepeda />}/>
            <Route path="properti-secondary" element={<OutletIndex />}>
              <Route index element={<LandingPageInfoLelang />} />
              <Route path="detail/:id" element={
                <DetailProduct 
                  email={getUserStatus.email} 
                  emailView={getUserStatus?.emailView} 
                  userStatus={getUserStatus.userType} />
              }/>
            </Route>
            <Route path="homespot-update/" element={<OutletIndex />} >
              <Route index element={<HomespotUpdateLandingPage />} />
              <Route path="list-article/:slug" element={<HomespotAllContent />} />
              <Route path="search" element={<SearchPageArticle />} />
              <Route path=":slug" element={<DetailHomespotUpdate />} />
            </Route>
            <Route
                  path="user-management/developer/:email"
                  element={<Developer />}
                />
            {/* <Route path="sales-dashboard" element={<PrivateRoutes role="Sales"/>}> */}
            <Route path="sales-dashboard" element={<OutletIndex />}>
              {/* MIS Data Penjualan */}
              <Route
                path="datapenjualan/draft"
                element={<DataPenjualanDraft />}
              />
              <Route
                path="datapenjualan/final"
                element={<DataPenjualanFinal />}
              />
              <Route
                path="setting"
                element={<SettingSales />}
              />
              <Route path="penjualanresult/sales"
                index element={<PenjualanResultsV2 referralCode={getUserStatus.referralCode} email={getUserStatus.email} />}
              />
            </Route>
            {decryptStr(getUserStatus.userType) === "AdminCabang" ? (
              <Route path="admin-cabang" element={<OutletIndex />}>
                <Route
                  path="setting"
                  element={
                  <ProfileAdminCabang
                      userStatus={getUserStatus.userType}
                      email={getUserStatus.email}
                  />
                }
                />
                <Route
                  path="list-notaris"
                  element={<ListNotaris
                  userStatus={getUserStatus.userType}
                  email={getUserStatus.email}/>}
                />
              </Route>
            ) : <Route path="" element={<Navigate to="/" replace />} />}
            <Route path="project-sales/:referralCode/:id" element={<OutletIndex />}>
              <Route index element={<ProjectSales email={getUserStatus.email} referralCode={getUserStatus.referralCode} />} />
            </Route>
            <Route path="kpr-sales/" element={<OutletIndex />}>
              <Route path="simulasi-sales" element={<KPRSimulasiSales />}></Route>
              <Route path="approval-sales" element={<OutletIndex />}>
                <Route index element={<PengajuanKprSales />} />
              </Route>
              <Route path="donesales" element={<DoneSubmitKpr/>} />
            </Route>
            <Route path="payment-success" element={<SuccesBeli />}/>
            <Route path="payment-success-visitor" element={<SuccesBeliVisitor />}/>
            <Route path="payment-fail" element={<FailBeli />} />
            <Route path="payment/:nik" element={<SummaryBuyer />} />
            {decryptStr(getUserStatus.userType) === "superadmin" ? (
              <Route path="admin" element={<OutletIndex />}>
                {/* Monitoring Status */}
                <Route path="monitoring-status-user" element={<StatusUser />} />

                {/* Report Homespot */}
                <Route path="dashboard-report/executivesummary" element={<ExecutiveSummary />} />
                <Route path="dashboard-report/statususer" element={<DeveloperSummary />} />
                <Route path="dashboard-report/pksdeveloper" element={<PksDeveloper />} />
                <Route path="dashboard-report/pengajuandeveloper" element={<PengajuanDeveloper />} />
                <Route path="dashboard-report/ratinghomespot" element={<RatingHomespot />} />

                {/* User Management */}
                <Route
                  path="user-management/list-developer"
                  element={<ListDeveloper />}
                />
                <Route
                  path="user-management/upload-developer"
                  element={<UploadDeveloper />}
                />
                <Route
                  path="user-management/developer"
                  element={<Developer action="create" />}
                />
                <Route
                  path="user-management/developer/:email"
                  element={<Developer action="edit" />}
                />
                <Route
                  path="user-management/salesperson"
                  element={<SalesPerson />}
                />
                <Route
                  path="user-management/admin-cabang"
                  element={<AdminCabang email={getUserStatus.email} />}
                />
                <Route 
                  path="user-management/cs"
                  element={<CustomerService email={getUserStatus.email} />}
                />
                {/* Update Program */}
                <Route
                  path="update-program-kpr/inquiry-gimmick-kpr"
                  element={<InquiryGimmick />}
                />

                {/* MIS */}
                <Route
                  path="mis/sales-refferal"
                  element={<SalesRefferalAdmin />}
                />
                <Route
                  path="mis/user-refferal"
                  element={<UserRefferalAdmin />}
                />
                <Route
                  path="mis/pengajuan-kpr"
                  element={<PengajuanKPRAdmin />}
                />
                <Route
                  path="mis/wishlist"
                  element={<WishlistAdmin />}
                />
                <Route
                  path="lrc/company-registration"
                  element={<CompanyRegistration />}
                />
                <Route
                  path="lrc/list-hlm"
                  element={<ListHLM />}
                />

                {/* Banner & Popup */}
                <Route
                  path="banner"
                  element={<DynamicBanner email={getUserStatus.email} />}
                />
                <Route
                  path="homespot-update"
                  element={<OutletIndex />}
                >
                  <Route index element={<ListArticles email={getUserStatus.email} />} />
                  <Route path="add-article" element={<AddArticle email={getUserStatus.email} />} />
                  <Route path="edit-article/:slug" element={<AddArticle email={getUserStatus.email} isEdit={true} />} />
                </Route>
              </Route>
            ) : (
              <Route path="admin" element={<Navigate to="/" replace />} />
            )}
            {decryptStr(getUserStatus.userType) === "SuperAdminMIS" ? (
              <Route path="admin" element={<OutletIndex />}>
                {/* MIS */}
                <Route
                  path="mis/sales-refferal"
                  element={<SalesRefferalAdmin />}
                />
                <Route
                  path="mis/pengajuan-kpr"
                  element={<PengajuanKPRAdmin />}
                />
                <Route
                  path="mis/wishlist"
                  element={<WishlistAdmin />}
                />
                <Route path="dashboard-report/pksdeveloper" element={<PksDeveloper />} />
              </Route>
            ) : (
              <Route path="admin" element={<Navigate to="/" replace />} />
            )}
            <Route path="forgot-password" element={<OutletIndex />}>
              <Route index element={<ForgotPassword />} />
              <Route path="otp" element={<ForgotPasswordOTP />} />
              <Route
                path="new-password"
                element={<NewPassword action="resetPass" />}
              />
              <Route
                path="done"
                element={<ForgotPasswordDoneChange action="resetPass" />}
              />
            </Route>
            <Route path="search" element={<OutletIndex />}>
              <Route index element={<SearchResults />} />
            </Route>
            <Route path="v2/search" element={<OutletIndex />}>
              <Route index element={<SearchResultsV2 />} />
            </Route>
            <Route path="product-details/:id" element={<OutletIndex />}>
              <Route index element={<ProductDetailsV2 purchaseType={1} email={getUserStatus.email} emailView={getUserStatus?.emailView} userStatus={getUserStatus.userType} />} />
              <Route path="compare/:secondId" element={<CompareProperty purchaseType={1} email={getUserStatus.email} emailView={getUserStatus?.emailView} />} />
            </Route>
            <Route path="project-details/:id" element={<OutletIndex />}>
              {/* <Route index element={<ProjectDetails email={getUserStatus.email} emailView={getUserStatus?.emailView} userStatus={getUserStatus.userType} />} /> */}
              <Route index
                  element={<ProjectDetails2 
                    email={getUserStatus.email} 
                    emailView={getUserStatus?.emailView} 
                    userStatus={getUserStatus.userType}
                    isType="project"
                  />}
              />
            </Route>
            <Route path="unit-details/:id" element={<OutletIndex />}>
                <Route index
                    element={<ProjectDetails2 
                        email={getUserStatus.email} 
                        emailView={getUserStatus?.emailView} 
                        userStatus={getUserStatus.userType}
                        isType="unit"
                    />}
                />
                <Route
                  path="compare/:secondId"
                  element={<Compare email={getUserStatus.email} emailView={getUserStatus?.emailView}  />} 
                />
            </Route>
            <Route path="kpr" element={<OutletIndex />}>
              <Route path="simulasi" element={<KPRSimulasi />} />
              {/* <Route path="simulasi-sales" element={<KPRSimulasiSales />} /> */}
              <Route path="approval" element={<OutletIndex />}>
                <Route index element={<PengajuanKpr />} />
                <Route path="donevisitor" element={<DoneSubmitVisitorKpr />} />
                <Route path="completevisitor" element={<DoneNoUtj />} />
              </Route>
            </Route>
            {decryptStr(getUserStatus.userType) === "visitor" ||
              decryptStr(getUserStatus.userType) === "developer" ? (
              <Route path="profile-user" element={<OutletIndex />}>
                <Route
                  path="profile"
                  element={
                    <Profile
                      userStatus={getUserStatus.userType}
                      email={getUserStatus.email}
                    />
                  }
                />
                <Route
                  path="saved-property"
                  element={
                    <SavedProperty userStatus={getUserStatus.userType} email={getUserStatus.email} />
                  }
                />
                <Route
                  path="property-listing"
                  element={
                    <PropertyListingV2Responsive
                      userStatus={getUserStatus.userType}
                      email={getUserStatus.email}
                    />
                  }
                />
                {/* <Route
                  path="update/:id"
                  element={
                    <EditIdentitas
                    />
                  }
                /> */}
                <Route
                  path="sales-referral"
                  element={
                    <SalesReferral />
                  }
                />
                <Route
                  path="user-referral"
                  element={
                    <UserRefferal />
                  }
                />
                <Route
                  path="list-pengajuan-kpr"
                  element={
                    <ListPengajuanKpr userStatus={getUserStatus.userType} email={getUserStatus.email} />
                  }
                />
                <Route
                  path="wishlist-developer"
                  element={<WishlistDeveloper />}
                />
              </Route>

            ) : (
              <Route
                path="profile-user"
                element={<Navigate to="/" replace />}
              />
            )}
            {decryptStr(getUserStatus.userType) === "visitor" || decryptStr(getUserStatus.userType) === "developer" ? (
              <>
                <Route path="sell-property" element={<OutletIndex />}>
                  <Route
                    index
                    element={
                      <SellProperty
                        userStatus={getUserStatus.userType}
                        email={getUserStatus.email}
                        editMode={false}
                      />
                    }
                  />
                  <Route path="v2/upload-project" element={<OutletIndex />}>
                    <Route
                      index element={<UploadProyek userStatus={getUserStatus.userType} email={getUserStatus.email} editMode={false} />}
                    />
                    <Route
                      path="edit-project/:id" element={<UploadProyek userStatus={getUserStatus.userType} email={getUserStatus.email} editMode={true} />}
                    />
                    <Route
                      path="detail-unit" element={<DetailUnitProp userStatus={getUserStatus.userType} email={getUserStatus.email} editMode={false} />}
                    />
                    <Route
                      path="edit-unit/:id" element={<DetailUnitProp userStatus={getUserStatus.userType} email={getUserStatus.email} editMode={false} />}
                    />
                    <Route
                      path="detail-cluster" element={<DetailCluster userStatus={getUserStatus.userType} email={getUserStatus.email} editMode={false} />}
                    />
                    <Route
                      path="edit-cluster/:id" element={<DetailCluster userStatus={getUserStatus.userType} email={getUserStatus.email} editMode={false} />}
                    />
                    <Route
                      path="edit-property/:id" element={<TypeUnitEdit userStatus={getUserStatus.userType} email={getUserStatus.email} editMode={true} />}
                    />
                  </Route>
                </Route>
                <Route path="property" element={<OutletIndex />}>
                  <Route
                    path="edit/:id"
                    element={
                      <SellProperty
                        userStatus={getUserStatus.userType}
                        email={getUserStatus.email}
                        editMode={true}
                      />
                    }
                  />
                </Route>
              </>
            ) : (
              <Route path="" element={<Navigate to="/" replace />} />
            )}
            <Route path="user/activate" element={<OutletIndex />}>
              <Route
                path=":id"
                element={<Activation />}
              />
              <Route
                path="done"
                element={
                  <ForgotPasswordDoneChange action="activate" user="user" />
                }
              />
            </Route>
            <Route path="profile-user/update" element={<OutletIndex />}>
              <Route
                path=":id"
                element={<EditIdentitas />}
              />
            </Route>
            <Route path="visitor/activate" element={<OutletIndex />}>
              <Route
                path=":id"
                element={<Activation />}
              />
              <Route
                path="done"
                element={
                  <ForgotPasswordDoneChange action="activate" user="visitor" />
                }
              />
              <Route
                path="preference"
                element={
                  <PreferenceVisitor user="visitor" />
                }
              />
            </Route>
            <Route path="sales/activate" element={<OutletIndex />}>
              <Route
                path=":id"
                element={<ActivationSales />}
              />
              <Route
                path="done"
                element={
                  <ForgotPasswordDoneChange action="activate" user="user" />
                }
              />
            </Route>
            <Route path="developer" element={<OutletIndex />}>
              {/* <Route index element={<DeveloperProfile />} /> */}
              <Route
                path=":id"
                element={
                  <DeveloperPage />
                }
              />
            </Route>
            <Route path="test" element={<OutletIndex />}>
              <Route index element={<ChatExample />} />
            </Route>
            <Route path="maintenance" element={<OutletIndex />}>
              <Route index element={<Maintenance />} />
            </Route>
            {/* <Route path="*" element={<Navigate to ="/" />}/> */}
            {decryptStr(getUserStatus.userType) === "AdminCabang" ? (
              <Route path="admin-cabang" element={<OutletIndex />}>
                <Route
                  path="setting"
                  element={
                    <ProfileAdminCabang
                        userStatus={getUserStatus.userType}
                        email={getUserStatus.email}
                    />
                  }
                />
                <Route
                  path="list-kjpp"
                  element={
                    <ListKjpp
                      userStatus={getUserStatus.userType}
                      email={getUserStatus.email}
                    />
                  }
                />
                <Route
                  path="list-properti"
                  element={
                    <ListPropertiSecondary
                      userStatus={getUserStatus.userType}
                      email={getUserStatus.email}
                    />
                  }
                />
                <Route path="properti-secondary" element={<OutletIndex />}>
                  <Route
                    index element={
                      <AddPropertiSecondary 
                        userStatus={getUserStatus.userType}
                        email={getUserStatus.email}
                      />
                    }
                  />
                  <Route
                    path="ringkasan-properti"
                    element={<Ringkasan />} 
                  />
                  <Route 
                    path="edit-properti/:id"
                    element={
                      <AddPropertiSecondary 
                        userStatus={getUserStatus.userType}
                        email={getUserStatus.email}
                      />
                    }
                  />
                  {/* <Route 
                    path="edit-properti/:id"
                    element={
                      <EditPropertiSecondary 
                        userStatus={getUserStatus.userType}
                        email={getUserStatus.email}
                        isViewMode={false}
                      />
                    }
                  /> */}
                  <Route 
                    path="view-properti/:id"
                    element={
                      <EditPropertiSecondary 
                        userStatus={getUserStatus.userType}
                        email={getUserStatus.email}
                        isViewMode={true}
                      />
                    }
                  />
                </Route>
                {/* Route Test */}
                <Route path="test" element={<OutletIndex />}>
                  <Route path="detail-properti" element={<DetailProperti />} />
                  <Route path="informasi-properti" element={<InformasiProperti />} />
                  <Route path="kelengkapan-rumah" element={<KelengkapanRumah />} />
                  <Route path="foto" element={<Foto />} />
                  <Route path="ringkasan" element={<Ringkasan />} />
                </Route>
                {/* End Route Test */}
              </Route>
            ) : (
              <Route path="" element={<Navigate to="/" replace />} />
            )}
            {decryptStr(getUserStatus.userType) === "CustomerService" ? (
              <Route path="customer-service" element={<OutletIndex />}> 
                <Route
                  path="setting"
                  element={
                    <ProfileCustomerService
                        userStatus={getUserStatus.userType}
                        email={getUserStatus.email}
                    />     
                  }
                />
                <Route
                  path="list-pengajuan"
                  element={
                    <ListPengajuanCustomerService
                        userStatus={getUserStatus.userType}
                    />     
                  }
                />
                <Route
                  path="approvalCS"
                  element={
                    <PengajuanCS/>     
                  }
                />
                <Route
                  path="detail-pengajuan-cs/:id"
                  element={
                    <DetailPengajuanCS
                        email={getUserStatus.email}
                    />     
                  }
                />
              </Route>) : (
                <Route path="" element={<Navigate to="/" replace />} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
