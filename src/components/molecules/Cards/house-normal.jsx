import _ from 'lodash-contrib';
import { CategoryProp, PropFacility } from "..";
import { toTitleCase } from "../../../helpers/string";
import { Button } from "../../atoms";
const convertRupiah = require("rupiah-format");

const HouseCardNormal = ({ index, data, isVirtual }) => {
  const filteredImg = data?.imagesProperti?.filter?.(function(value){ 
    return !String(value.imageName)?.includes("BrosurProyek");
  });
  return (
    <div onClick={() => window.location.href = `/project-details/${data?.project?.id}`} key={index} className="landing-page hc__norm-wrap">
      {isVirtual ? (
        <div className="landing-page hc__img-v360-wrap">
          <img
            className="landing-page hc__img"
            src={filteredImg[0]?.sharedUrl}
            alt="img"
          />
          <div className="landing-page hc__v360-btn">
            <Button buttonColor="blueLight" textColor="blue">
              Virtual 360
            </Button>
          </div>
        </div>
      ) : (
        <img
          className="landing-page hc__noVirtual--img"
          src={filteredImg[0]?.sharedUrl}
          alt="img"
        />
      )}
      <div>
        <div>
          <div className="flex">
            <CategoryProp
              tipeProperti={data?.project?.tipeProperti ? toTitleCase?.(data?.project?.tipeProperti) : ""}
            />
            <CategoryProp
              tipeProperti={`Tipe ${data?.detailProperti?.lb}`}
            />
          </div>
          <h3 className="landing-page hc__prop-name">
            {data?.detailProperti?.namaProperti}
          </h3>

          <p className="landing-page hc__location">
            {_.isJSON(data?.project?.alamatProperti?.alamat) ? `${JSON.parse(data?.project?.alamatProperti?.alamat).kecamatan}, ${JSON.parse(data?.project?.alamatProperti?.alamat).provinsi}` : data?.project?.alamatProperti?.alamat}
          </p>
        </div>
        <div>
          <p className="landing-page hc__price">
            {convertRupiah.convert(data?.detailProperti?.hargaProperti)}
          </p>
          <div className="landing-page hc__facility-wrap">
            <PropFacility
              facIcons="/icons/small-icons/Bedroom.svg"
              facName={`${data?.detailProperti?.jmlKmrTidur} Kamar`}
            />
            <PropFacility
              facIcons="/icons/small-icons/Bathroom.svg"
              facName={`${data?.detailProperti?.jmlKmrMandi} Kamar Mandi`}
            />
            {data?.detailProperti?.parkirMobil && (
              <PropFacility
                facIcons="/icons/small-icons/Garage-Car.svg"
                facName="Parkir Mobil"
              />
            )}
            <PropFacility
              facIcons="/icons/small-icons/LB.svg"
              facName={`${data?.detailProperti?.lb} m²`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCardNormal;
