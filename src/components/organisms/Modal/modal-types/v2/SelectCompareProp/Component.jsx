import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCashSubmission, setKprSubmission } from '../../../../../../store/actions/changeRadioState';
import { inquiryListFavProp } from '../../../../../../store/actions/fetchData/favoriteProp';
import { HouseCardSearchResult } from '../../../../../molecules';

const Component = ({ firstPropId, secondPropId, email, closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState({
    uploadListing: false,
    uploadProyek: false
  });
  const [listProp, setListProp] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(setCashSubmission(false));
    dispatch(setKprSubmission(true));
    setSelect({ ...select, uploadProyek: true });
    dispatch(inquiryListFavProp(email, setListProp, setNotFound));
  }, []);

  return (
    <div>
      <div className="select-compare-prop__wrapper__baseModal">
        <p className="select-compare-prop__title">Pilih salah satu untuk membandingkan properti</p>
        <div className="select-compare-prop__wrapper__flexWrapper">
          {(listProp || []).map((data, idx) => {
            return(
            <HouseCardSearchResult
              index={idx}
              data={data}
              isVirtual={data?.detailProperti?.mediaProperti?.virtual360Url ? true : false}
              resSearch={true}
              onClick={() => {navigate(`/product-details/${encodeURIComponent(firstPropId)}/compare/${encodeURIComponent(data?.detailProperti?.id)}`); closeModal() }}
            />
          )})}
          {notFound && <p className="saved-prop__dnf">Data tidak ditemukan</p>}
        </div>
      </div>
    </div>
  );
};

export default Component;