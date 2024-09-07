/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BackBreadcrumbs, Footer, Image4Frame } from "../../../components/molecules";
import { LeftPageProductDetails, Modal } from '../../../components/organisms';
import { closeModalFail } from '../../../store/actions/fetchData/superAdminState';
import { inquiryCompareProp } from '../../../store/actions/fetchData/v2/compareProp';

const CompareProperty = ({ email, emailView }) => {
  const currentURL = window.location.href ;
  const [history] = currentURL.split('/').slice(-3)

  const { id, secondId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataProp1, setDataProp1] = useState(null);
  const [dataProp2, setDataProp2] = useState(null);
  const [showListPropCompare, setShowListPropCompare] = useState(false);
  useEffect(() => {
    dispatch(inquiryCompareProp({
      id1: id,
      id2: secondId,
      email: email,
      setData1: setDataProp1,
      setData2: setDataProp2
    }));
  }, [secondId]);
  const saState = useSelector((state) => state.superAdminReducer);
  return (
    <div>
      {saState.fail === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalFail());
            navigate(-1);
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      {showListPropCompare &&
        <Modal
          closeModal={() => setShowListPropCompare(false)}
          modalTypes="selectCompareProp"
          title="Properti Tersimpan"
          firstPropId={id}
          email={email}
        />
      }
      <div className="comp-prop__wrapper">
        <div className="comp-prop__header">
          <BackBreadcrumbs onClick={() => navigate(-2)} title="Perbandingan Properti" />
        </div>
        <div className="comp-prop__page">
          <div className="comp-prop__page-left">
            <Image4Frame dataImg={dataProp1?.imagesProperti} />
            <LeftPageProductDetails dataDetail={dataProp1} dataDev={dataProp1?.dataDev} dispatch={dispatch} email={email} emailView={emailView} ownedBy={dataProp1?.ownedBy} setShowListPropCompare={setShowListPropCompare} compare={true}/>
          </div>
          <div className="comp-prop__div-vertical" />
          <div className="comp-prop__page-right">
            <Image4Frame dataImg={dataProp2?.imagesProperti} />
            <LeftPageProductDetails dataDetail={dataProp2} dataDev={dataProp2?.dataDev} dispatch={dispatch} email={email} emailView={emailView} ownedBy={dataProp2?.ownedBy} setShowListPropCompare={setShowListPropCompare} compare={true}/>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CompareProperty;