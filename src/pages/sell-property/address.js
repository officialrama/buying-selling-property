import React, { useEffect, useState } from "react";
import { BorderLine, Radiobox } from "../../components/atoms";
import { DetailsCard, ModalGMaps } from "../../components/molecules";
import { GMapsPinBox, Location } from "../../components/organisms";
import { getLocByLatLng } from "../../helpers/getLocByLatLng";

const SellPropAddress = (props) => {
  const {
    inputs,
    handleRadioDropChange,
    dataAddress,
    setDataAddress,
    onChangeAddress,
  } = props;
  const [isModalGmaps, setModalGmaps] = useState(false);
  const [mapsState, setMapsState] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
    address: "",
    zoom: 11,
    gestureHandling: "cooperative",
  });
  const handleLoadPinLoc = () => {
    if (!!dataAddress.placeId) {
      setMapsState({
        ...mapsState,
        center: {
          lat: dataAddress.lat,
          lng: dataAddress.lng,
        },
        address: dataAddress.address,
      });
      setModalGmaps(true);
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        getLocByLatLng(position.coords.longitude, position.coords.latitude)
          .then((res) => { 
            setMapsState({
              ...mapsState,
              center: {
                ...mapsState.center,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              address: res.results[0].formatted_address,
              placeId: res.results[0].place_id,
              draggable: true,
            });
          })
          .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
          setModalGmaps(true);
      });
    }

  };
  function RedStar() {
    return <span className="sellprops__card__redstar">*</span>;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="sellprops__wrapper">
        <div className="sellprops__text-wrapper">
          <p className="sellprops__title">Alamat</p>
          <p>{dataAddress?.address ? dataAddress?.address : ""}</p>
        </div>
        <DetailsCard className="sellprops__card__wrapper">
          <div className="sellprops__card__wrapper-content">
            <p className="sellprops__card__title">Tipe Properti {RedStar()}</p>
            <div>
              <div className="sellprops__card__content-radio-grid">
                <Radiobox
                  text="Apartment"
                  checked={inputs?.tipeProperti?.value === "apartment"}
                  name="apartment"
                  onChange={(event) =>
                    handleRadioDropChange("tipeProperti", event.target.value)
                  }
                />
                <Radiobox
                  text="Rumah"
                  checked={inputs?.tipeProperti?.value === "rumah"}
                  name="rumah"
                  onChange={(event) =>
                    handleRadioDropChange("tipeProperti", event.target.value)
                  }
                />
                <Radiobox
                  text="Ruko"
                  checked={inputs?.tipeProperti?.value === "ruko"}
                  name="ruko"
                  onChange={(event) =>
                    handleRadioDropChange("tipeProperti", event.target.value)
                  }
                />
                <Radiobox
                  text="Villa"
                  checked={inputs?.tipeProperti?.value === "villa"}
                  name="villa"
                  onChange={(event) =>
                    handleRadioDropChange("tipeProperti", event.target.value)
                  }
                />
              </div>
              {!inputs?.tipeProperti?.isValid && <p className="textbox__invalidTxt mb-4">{inputs?.tipeProperti?.msgError}</p>}
            </div>
            <p className="sellprops__card__title">Jenis Properti {RedStar()}</p>
            <div>
              <div className="sellprops__card__content-radio-grid">
                <Radiobox
                  text="Subsidi"
                  checked={inputs?.jenisProperti?.value === "subsidi"}
                  name="subsidi"
                  onChange={(event) =>
                    handleRadioDropChange("jenisProperti", event.target.value)
                  }
                />
                <Radiobox
                  text="Non Subsidi"
                  checked={inputs?.jenisProperti?.value === "nonsubsidi"}
                  name="nonsubsidi"
                  onChange={(event) =>
                    handleRadioDropChange("jenisProperti", event.target.value)
                  }
                />
              </div>
              {!inputs?.jenisProperti?.isValid && <p className="textbox__invalidTxt mb-4">{inputs?.jenisProperti?.msgError}</p>}
            </div>
            <div className="sellprops__horizontal-line">
              <BorderLine />
            </div>
            <Location
              title="Lokasi Properti"
              dataAddress={dataAddress}
              onChangeText={onChangeAddress}
              setDataAddress={setDataAddress}
            />
            <div className="sellprops__card__pinloc-wrap">
              <GMapsPinBox
                title="Pin Lokasi"
                setModalGmaps={handleLoadPinLoc}
                dataAddress={dataAddress}
              />
            </div>
            <div>
              <ModalGMaps
                isModalGmaps={isModalGmaps}
                dataAddress={dataAddress}
                mapsState={mapsState}
                setMapsState={setMapsState}
                setDataAddress={setDataAddress}
                setModalGmaps={setModalGmaps}
              />
            </div>
          </div>
        </DetailsCard>
      </div>
    </div>
  );
};

export default SellPropAddress;
