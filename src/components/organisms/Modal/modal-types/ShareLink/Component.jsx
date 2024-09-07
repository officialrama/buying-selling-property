/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import useWindowDimensions from '../../../../../utils/dimensions';
import { Button } from '../../../../atoms';
import { Textbox } from '../../../../molecules';
import { salesReferralProject } from '../../../../../store/actions/fetchData/salesReferral';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';


const ShareLink = () => {
  // const [setReferralCode ,referralCode] = useState([]);
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  useEffect(() => {
    dispatch(salesReferralProject(setItem));
   
}, []);
  const url = window.location.href+`?referral=${item?.responseData[0]?.referralCode}` ;
  
  return (
      <>
          
          
              <div className="ml-3 text-sm font-normal ">
              <span className='fontweight__semibold'>Mulai tawarkan properti dengan link kamu</span>
               
                  <Textbox value={url} ></Textbox>
                  <br></br>
                   <CopyToClipboard text={url}>
          <Button buttonColor="blue" textColor="white">
                  {width >= 770 ? "Salin" : "Salin"}
                </Button>
               </CopyToClipboard>
               
              </div>
              <div className="ml-3 text-sm font-normal "> 
              <br></br>
              <FacebookShareButton url={url}>
                <FacebookIcon size={30}>
  {shareCount => (
    <span className="ml-3 text-sm font-normal">{shareCount}</span>
  )}
  </FacebookIcon>
</FacebookShareButton>
<WhatsappShareButton url={url}>
                <WhatsappIcon size={30}>
  {shareCount => (
    <span className="ml-3 text-sm font-normal">{shareCount}</span>
  )}
  </WhatsappIcon>
</WhatsappShareButton>
<EmailShareButton url={url}>
                <EmailIcon size={30}>
  {shareCount => (
    <span className="ml-3 text-sm font-normal">{shareCount}</span>
  )}
  </EmailIcon>
</EmailShareButton>

</div>
            
      

          {/* <div className="flex flex-row gap-3">
              <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}>
                  Terapkan Filter
              </Button>
              <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}>
                  Reset Filter
              </Button>
          </div> */}
      </>
  )
}

export default ShareLink;
