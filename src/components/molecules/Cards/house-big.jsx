import _ from 'lodash-contrib';
import { Link, useNavigate } from "react-router-dom";
import { CarouselThumbImage } from "..";
import { openLink } from "../../../helpers/newTab";
import { formatRupiahWord, trimStr } from "../../../helpers/string";
import { Button } from "../../atoms";
const convertRupiah = require("rupiah-format");

const HouseCardBig = ({ index, data }) => {
  const navigate = useNavigate();
  const filteredImg = data?.imagesProperti?.filter?.(function (value) {
    return !String(value.imageName)?.includes("BrosurProyek");
  });
  return (
    <div /* onClick={() => navigate(`/project-details/${data?.project?.id}`)} */ className="landing-page hc__big-wrap">
      <div className="landing-page hc__img-v360-wrap">
            <CarouselThumbImage
              imgSrc={data?.imagesProject}
              isVirtual={data?.project?.mediaProject?.virtual360Url.indexOf('http') === -1 ? false : true}
              imgClassName="h-64 mobile:h-32"
              v360Link={() => openLink(data?.project?.mediaProject?.virtual360Url, true)}
            />
      </div>
      <div>
        <div>
          <div className="my-4" />
          {/* <div className="flex">
            <CategoryProp tipeProperti={data?.project?.tipeProperti ? toTitleCase?.(data?.project?.tipeProperti) : ""} />
            <CategoryProp tipeProperti={"Tipe " + data?.detailProperti?.lb} />
          </div> */}
          <h3 className="landing-page hc__prop-name">{data?.project?.namaProyek}</h3>
          <p className="landing-page hc__location">{_.isJSON(data?.project?.alamatProperti?.alamat) ? `${(JSON.parse(data?.project?.alamatProperti?.alamat))?.kabupaten}, ${JSON.parse(data?.project?.alamatProperti?.alamat)?.provinsi}` : ""} </p>
        </div>
        <div>
          <p className="landing-page hc__price">{formatRupiahWord(data?.project?.kisaranHarga?.split(",")[0]) + "-" + formatRupiahWord(data?.project?.kisaranHarga?.split(",")[1])}</p>
          {/* <div className="landing-page hc__facility-wrap">
            <PropFacility facIcons="/icons/small-icons/Bedroom.svg" facName={data?.detailProperti?.jmlKmrTidur + " Kamar"} />
            <PropFacility facIcons="/icons/small-icons/Bathroom.svg" facName={data?.detailProperti?.jmlKmrMandi + " Kamar Mandi"} />
            {data?.detailProperti?.parkirMobil === true ? <PropFacility facIcons="/icons/small-icons/Garage-Car.svg" facName="Parkir Mobil" /> : ""}
            <PropFacility facIcons="/icons/small-icons/LB.svg" facName={data?.detailProperti?.lb + " m²"} />
          </div> */}
          <div className="hs-search-rslt__dev-wrap">
            <div>
              <p className="hs-search-rslt__dev-field">Pengembang &nbsp;</p>
              <p className="hs-search-rslt__dev-value">
                <Link to={`/developer/${data?.id}`}> {trimStr({ string: _.isJSON(data?.metadataDeveloper) ? JSON?.parse?.(data?.metadataDeveloper)?.name : "-", maxLength: 25 })} </Link>
              </p>
            </div>
            <div>
              <Button buttonColor="blueLight" textColor="blue" className="text-xs" onClick={() => window.location.href = `/project-details/${encodeURIComponent(data?.project?.id)}`}>
                Lihat Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCardBig;
