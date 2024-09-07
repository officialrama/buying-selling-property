import cookie from "hs-cookie";
import _ from 'lodash-contrib';
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { MdCompare } from "react-icons/md";
import InitialsAvatar from "react-initials-avatar";
import { decryptStr,encryptStrFe} from "../../../../helpers/encryptDecrypt";
import { openLink } from "../../../../helpers/newTab";
import { genClickToGmaps, genStaticMapsUrl } from "../../../../helpers/staticMaps";
import { formatRupiah, toTitleCase, trimStr } from "../../../../helpers/string";
import { ListFacilityType } from "../../../../static/details/list-facility/type";
import { deleteSavedProp, saveProperty } from "../../../../store/actions/fetchData/favoriteProp";
import { Button } from "../../../atoms";
import SaveLove from "../../../atoms/Button/save/save-love";
import Virtual360 from "../../../atoms/Button/virtual-360/virtual-360";
import Download from "../../../atoms/Button/download/download";
import ListFaciltyDetail from "../../../atoms/Text/details/list-facility-detail";
import PropertyInfo from "../../../atoms/Text/details/property-info";
import { DetailsCard } from "../../../molecules";
import { TextColor } from "../../../theme/text/text";
import { SET_WISHLIST } from "../../../../store/actions/types";
import classNames from "classnames";
const youtubeEmbed = require('youtube-embed')

const DetailPropsFacility = ({ icon, name }) => {
  return (
    <div className="flex mobile:mb-4">
      <img
        className="prod-detail__pages__property__detailBuying__left__facilities__icon"
        src={icon}
        alt="img"
      />
      <p className="prod-detail__pages__property__detailBuying__left__facilities__name">
        {name}
      </p>
    </div>
  )
};

const LeftPageProductDetails = ({ dataDetail, dataDev, dispatch, email, emailView, ownedBy, setShowListPropCompare, userStatus, compare }) => {
  const bodyReqSave = {
    email: email,
    propertiId: dataDetail?.detailProperti?.id
  }
  const srState = useSelector((state) => state.stateReducer);
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    dispatch({ type: SET_WISHLIST, ownedBy: encryptStrFe(ownedBy) });
  }, [ownedBy]);

  function nameDev() {
    if (dataDev?.metadata?.name) {
      return dataDev?.metadata?.name;
    } else if (dataDev?.metadata?.fullName) {
      return dataDev?.metadata?.fullName;
    }
  }
  return (
    <div>
      <div className="prod-detail__pages__property__detailBuying__left__priceLoveShare__wrapper">
        <p className="prod-detail__pages__property__detailBuying__left__priceLoveShare__price">
          {dataDetail && `${formatRupiah(dataDetail?.detailProperti?.hargaProperti)}`}
        </p>
        <div className="flex flex-row gap-3">
          {email ? dataDetail?.email !== decryptStr(emailView) &&
            <>
              {window.location.pathname.includes("/compare") &&
                <MdCompare
                  className="prod-detail__pages__property__detailBuying__left__compareIcon"
                  title="Bandingkan"
                  onClick={() => setShowListPropCompare(true)}
                />
              }
              {userStatus === "visitor" && <SaveLove
                filled={decryptStr(srState.ownedBy) === decryptStr(emailView)}
                onClick={
                  (decryptStr(srState.ownedBy) !== decryptStr(emailView) ?
                    (saveLoading ? null : () => dispatch(saveProperty(bodyReqSave, setSaveLoading,emailView))) :
                    (saveLoading ? null : () => dispatch(deleteSavedProp(email, dataDetail?.detailProperti?.id)))
                  )
                }
                loading={saveLoading}
              />}
            </>
            : ""}
        </div>
      </div>
      <div className="prod-detail__pages__property__detailBuying__left__propertyNameLocation__wrapper">
        <p className="prod-detail__pages__property__detailBuying__left__propertyNameLocation__propertyName">
          <p className="text-[0.875rem]">Proyek <br /></p>
          <p className="text-[#F87304]">{dataDetail && dataDetail?.project?.namaProyek}</p>
        </p>
        <p className="prod-detail__pages__property__detailBuying__left__propertyNameLocation__propertyName">
          <p className="text-[0.875rem]">Properti <br /></p>
          <p className="text-[#F87304]">{dataDetail && dataDetail?.detailProperti?.namaProperti}</p>
        </p>
        {/* Note : Belum ada responsenya */}
        <p className="prod-detail__pages__property__detailBuying__left__propertyNameLocation__location">
          {dataDetail &&
            `${_.isJSON(dataDetail?.project?.alamatProperti?.alamat) ? JSON.parse(dataDetail?.project?.alamatProperti?.alamat)?.kabupaten : ""}, 
          ${_.isJSON(dataDetail?.project?.alamatProperti?.alamat) ? JSON.parse(dataDetail?.project?.alamatProperti?.alamat)?.provinsi : ""}`}
        </p>
      </div>
      <div className="prod-detail__pages__property__detailBuying__left__facilities__wrapper">
        <DetailPropsFacility icon="/icons/small-icons/Bedroom.svg" name={`${dataDetail?.detailProperti?.jmlKmrTidur || ""} Kamar`} />
        <DetailPropsFacility icon="/icons/small-icons/Bathroom.svg" name={`${dataDetail?.detailProperti?.jmlKmrMandi || ""} Kamar Mandi`} />
        {dataDetail?.fasilitasProperti?.garasi && <DetailPropsFacility icon="/icons/small-icons/Garage-Car.svg" name="Garasi" />}
        <DetailPropsFacility icon="/icons/LB.svg" name={`${dataDetail?.detailProperti?.lb || ""} m²`} />
      </div>
      <div className="prod-detail__pages__property__detailBuying__left__description__wrapper">
        <p className="prod-detail__pages__property__detailBuying__left__description__titleDesc">
          Deskripsi
        </p>
        <p className="prod-detail__pages__property__detailBuying__left__description__desc">
          {dataDetail && dataDetail?.detailProperti?.deskripsiProperti}
        </p>
      </div>
      <div class="flex flex-row">
        {dataDetail && dataDetail?.detailProperti?.mediaProperti?.virtual360Url ? <Virtual360 onClick={() => openLink(dataDetail?.detailProperti?.mediaProperti?.virtual360Url, true)} /> : <></>}
        {dataDetail && dataDetail?.brosurUrl ? <Download title={"Download Brosur"} onClick={() => openLink(dataDetail?.brosurUrl, true)} /> : <></>}
      </div>
      <div className="prod-detail__pages__property__detailBuying__left__detailHouse__wrapper">
        <DetailsCard title="Kelengkapan Rumah">
          <div className="grid grid-cols-2 gap-4">
            <ListFaciltyDetail
              type={ListFacilityType.type.dapur}
              value={dataDetail ? dataDetail?.detailProperti?.kelengkapanProperti?.dapur : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.telepon}
              value={dataDetail ? dataDetail?.detailProperti?.kelengkapanProperti?.jalurTelepone : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.listrik}
              value={dataDetail ? dataDetail?.detailProperti?.kelengkapanProperti?.jalurListrik : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.ruangKeluarga}
              value={dataDetail ? dataDetail?.detailProperti?.kelengkapanProperti?.ruangKeluarga : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.pdam}
              value={dataDetail ? dataDetail?.detailProperti?.kelengkapanProperti?.jalurPDAM : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.ruangKerja}
              value={dataDetail ? dataDetail?.detailProperti?.kelengkapanProperti?.ruangKerja : false}
            />
          </div>
        </DetailsCard>
        <DetailsCard title="Akses">
        <div className="grid grid-cols-2 gap-4">
            <ListFaciltyDetail
              type={ListFacilityType.type.rumahSakit}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.rumahSakit : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.mall}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.mall : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.tol}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.jalanTol : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.stasiunKereta}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.stasiun : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.sekolah}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.sekolah : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.taman}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.taman : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.pasar}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.pasar : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.farmasi}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.farmasi : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.rumahIbadah}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.rumahIbadah : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.restoran}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.restoran : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.bar}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.bar : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.halte}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.halte : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.gymnasium}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.gymnasium : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.bioskop}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.bioskop : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.bandara}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.bioskop : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.gerbangTol}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.bioskop : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.spbu}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.bioskop : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.bankATM}
              value={dataDetail ? dataDetail?.project?.aksesProperti?.bioskop : false}
            />

          </div>
        </DetailsCard>
        <DetailsCard title="Fasilitas">
          <div className="grid grid-cols-2 gap-4">
            <ListFaciltyDetail
              type={ListFacilityType.type.kolamBerenang}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.kolamRenang : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.clubHouse}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.clubHouse : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.parkir}
              value={
                dataDetail ? dataDetail?.project?.fasilitasProperti?.tempatParkir : false
              }
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.keamanan}
              value={
                dataDetail ? dataDetail?.project?.fasilitasProperti?.keamanan24Jam : false
              }
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.penghijauan}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.penghijauan : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.lift}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.lift : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.elevator}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.elevator : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.gym}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.gym : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.jogging}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.jogingTrack : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.garasi}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.garasi : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.rowJalan}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.rowJalan12 : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.cctv}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.cctv : false}
            />
            <ListFaciltyDetail
              type={ListFacilityType.type.rumahSakit}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.rumahSakit : false}
            />
            {/* <ListFaciltyDetail
              type={ListFacilityType.type.parkirFasilitas}
              value={dataDetail ? dataDetail?.project?.fasilitasProperti?.rumahSakit : false}
            />                      */}
          </div>
        </DetailsCard>
        <DetailsCard title="Informasi Properti">
          <div className="grid grid-cols-2 gap-4">
            <PropertyInfo
              title="Tipe Properti"
              value={dataDetail ? toTitleCase(dataDetail?.project?.tipeProperti) : false}
            />
            <PropertyInfo
              title="Luas Tanah"
              value={dataDetail ? `${dataDetail?.detailProperti?.lt} m²` : false}
            />
            <PropertyInfo
              title="Luas Bangunan"
              value={dataDetail ? `${dataDetail?.detailProperti?.lb} m²` : false}
            />
            <PropertyInfo
              title="Kamar Tidur"
              value={dataDetail ? `${dataDetail?.detailProperti?.jmlKmrTidur} Kamar` : false}
            />
            <PropertyInfo
              title="Kamar Mandi"
              value={dataDetail ? `${dataDetail?.detailProperti?.jmlKmrMandi} Kamar Mandi` : false}
            />
            <PropertyInfo
              title="Sertifikat"
              value={dataDetail ? (dataDetail?.detailProperti?.informasiProperti?.sertifikat)?.toUpperCase() : false}
            />
            <PropertyInfo
              title="Jumlah Lantai"
              value={dataDetail ? `${dataDetail?.detailProperti?.informasiProperti?.jmlLantai} Lt` : false}
            />
            <PropertyInfo
              title="Kondisi Properti"
              value={dataDetail ? toTitleCase(dataDetail?.detailProperti?.informasiProperti?.kondisiProperti) : false}
            />
            <PropertyInfo
              title="Daya Listrik"
              value={dataDetail ? `${dataDetail?.detailProperti?.informasiProperti?.dayaListrik} watt` : false}
            />
            <PropertyInfo
              title="Hadap"
              value={dataDetail ? toTitleCase(dataDetail?.detailProperti?.informasiProperti?.hadapRumah) : false}
            />
            {dataDetail?.project?.fasilitasProperti?.garasi && <PropertyInfo title="Jumlah Garasi" value="1" />}
            <PropertyInfo
              title="Tahun Bangun"
              value={dataDetail ? dataDetail?.detailProperti?.informasiProperti?.tahunBangun : false}
            />
            <PropertyInfo
              title="Kamar Pembantu"
              value={dataDetail ? dataDetail?.detailProperti?.informasiProperti?.kamarPembantu : false}
            />
          </div>
        </DetailsCard>
        <DetailsCard title="Alamat">
          <div className="prod-detail__pages__property__detailBuying__left__address__colWrapper">
            <div className="prod-detail__pages__property__detailBuying__left__address__addressWrapper">
              <img
                className="prod-detail__pages__property__detailBuying__left__address__icon"
                src="/icons/small-icons/pin-drop.svg"
                alt="pin-icon"
              />
              <p className="prod-detail__pages__property__detailBuying__left__description__desc">
                {dataDetail &&
                  _.isJSON(dataDetail?.project?.alamatProperti?.alamat) ? JSON.parse(dataDetail?.project?.alamatProperti?.alamat)?.alamat : ""}
              </p>
            </div>
            {dataDetail?.project?.alamatProperti &&
              <img
                className="cursor-pointer mt-3"
                src={genStaticMapsUrl({
                  size: "600x200",
                  lat: Number(dataDetail?.project.alamatProperti.latitude),
                  lng: Number(dataDetail?.project.alamatProperti.longitude)
                })}
                alt="gmaps-product-detail"
                onClick={() => {
                  openLink(genClickToGmaps({ lat: Number(dataDetail?.project.alamatProperti.latitude), lng: Number(dataDetail?.project.alamatProperti.longitude) }), true)
                }}
              />
            }
          </div>
        </DetailsCard>
        {cookie.get("morgateCookie") &&
          (JSON.parse(cookie.get("morgateCookie"))?.userType !== "developer" ?
            <DetailsCard title="Developer">
              <div className="prod-detail__pages__property__detailBuying__left__dev-info__wrapper">
                <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                  <InitialsAvatar
                    className="prod-detail__pages__property__detailBuying__left__dev-info__profile-pic"
                    name="Sukses Maju"
                  />
                  <div className={compare === true ? "prod-detail__pages__property__detailBuying__left__dev-info__nameCompare" : "prod-detail__pages__property__detailBuying__left__dev-info__name"}>
                    <p>{trimStr({ string: nameDev(), maxLength: 50 })}</p>
                    <p className="prod-detail__pages__property__detailBuying__left__dev-info__location">
                      {_.isJSON(dataDev?.metadata?.address) ? JSON?.parse?.(dataDev?.metadata?.address)?.provinsi : dataDev?.metadata?.address}
                    </p>
                  </div>
                </div>
                <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                  <div className={compare === true ? "prod-detail__pages__property__detailBuying__left__dev-info__wa-btnCompare" : "prod-detail__pages__property__detailBuying__left__dev-info__wa-btn"}>
                    <Button buttonColor="greenWA" textColor="white" fullWidth={false} paddingSize={"padding-0"} onClick={() => openLink(`https://api.whatsapp.com/send?phone=${(decryptStr(dataDev?.mobileNo)).replace("|", "").replace("+", "").replace(/^0/g, "62")}`, true)}>
                      <div className="flex flex-row gap-2  justify-center">
                        <img src="/icons/small-icons/whatsapp.svg" alt="wa-icon" />
                        <p>WhatsApp</p>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </DetailsCard>
            :
            <></>
          )
        }
            {dataDetail?.detailProperti?.mediaProperti?.youtubeUrl && dataDetail?.detailProperti?.mediaProperti?.virtual360Url ?
            <DetailsCard title="Media">
              {dataDetail?.detailProperti?.mediaProperti?.youtubeUrl ?
              <div className="w-full my-3">
                <p className={classNames("font-semibold", "text-[0.875rem]", `text-[${TextColor.black}]`)}>Youtube</p>
                <div className="about__video my-4 ">
                      <iframe
                        className="about__iframe"
                        src={youtubeEmbed(dataDetail?.detailProperti?.mediaProperti?.youtubeUrl)}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                </div>
              </div>
               : "" }
              {dataDetail?.detailProperti?.mediaProperti?.virtual360Url ?
              <div className="w-full">
              <p className={classNames("font-semibold", "text-[0.875rem]", `text-[${TextColor.black}]`)}>360 Virtual</p>
                <div className="about__video my-4 ">
                      <iframe
                        className="about__iframe"
                        src={dataDetail?.detailProperti?.mediaProperti?.virtual360Url}
                        title="Virtual 360"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                </div>
              </div>
              : "" }
            </DetailsCard>
          : "" }
      </div>
    </div>
  );
};

export default LeftPageProductDetails;
