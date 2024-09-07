import cookie from "hs-cookie";
import _ from "lodash-contrib";
import { useEffect, useState } from "react";
import InitialsAvatar from "react-initials-avatar";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "../../components/atoms";
import { DetailsCard, Footer } from "../../components/molecules";
import { ProjectList } from "../../components/molecules/";
import { CarouselDeveloper } from "../../components/organisms";
import { decryptStr, encryptStr } from "../../helpers/encryptDecrypt";
import { openLink } from "../../helpers/newTab";
import { trimStr } from "../../helpers/string";
import { inquiryDeveloper } from "../../store/actions/fetchData/inquiryDeveloper";

function DeveloperPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [dataDev, setDataDev] = useState(null);
  const [dataImage, setDataImage] = useState(null);
  const [countProject, setCountProject] = useState(null);
  let joinAllImg = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id && cookie.get("morgateCookie")) {
      dispatch(
        inquiryDeveloper(
          encryptStr(decryptStr(decodeURIComponent(id))),
          JSON.parse(cookie.get("morgateCookie"))?.email,
          setData,
          setDataDev,
          setCountProject,
          setDataImage
        )
      );
    } else {
      dispatch(
        inquiryDeveloper(
          encryptStr(decryptStr(decodeURIComponent(id))),
          "",
          setData,
          setDataDev,
          setCountProject,
          setDataImage
        )
      );
    }
  }, []);

  const mapImg = !_.isEmpty(dataImage) ? Object?.values?.(dataImage) : [];

  mapImg?.map((parent) => {
    return parent.map((child) => {
      return joinAllImg.push({
        imageName: child?.imageName,
        sharedUrl: child?.sharedUrl,
      });
    });
  });
  return (
    <>
      <div class="md:shrink-0">
        <CarouselDeveloper images={joinAllImg || []} />
      </div>
      <div className="prod-detail__bodyWrapper">
        <div className="prod-detail__pages__wrapper">
          <DetailsCard title="Developer">
            <div className="prod-detail__pages__property__detailBuying__left__dev-info__wrapper">
              <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                <InitialsAvatar
                  className="prod-detail__pages__property__detailBuying__left__dev-info__profile-pic"
                  name={_.isJSON(data?.metadataUser) ? JSON.parse(data?.metadataUser)?.name : "-"}
                />
                <div className="prod-detail__pages__property__detailBuying__left__dev-info__name w-[90%]">
                  <p>{_.isJSON(data?.metadataUser) ? JSON.parse(data?.metadataUser)?.name : "-"}</p>
                  <p className="prod-detail__pages__property__detailBuying__left__dev-info__location">
                    <p>
                      {_.isJSON(data?.metadataUser) &&
                      JSON.parse(JSON.parse(data?.metadataUser)?.address)
                        ? JSON.parse(JSON.parse(data?.metadataUser)?.address)?.alamat
                        : "-"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                <div className="prod-detail__pages__property__detailBuying__left__dev-info__wa-btn ml-12">
                  <Button
                    buttonColor="greenWA"
                    textColor="white"
                    fullWidth={false}
                    paddingSize={"padding-0"}
                    onClick={() =>
                      openLink(
                        `https://api.whatsapp.com/send?phone=${decryptStr(data?.mobileNo)
                          ?.replace("|", "")
                          .replace("+", "")
                          .replace(/^0/g, "62")}`,
                        true
                      )
                    }
                  >
                    <div className="flex flex-row gap-2 justify-center">
                      <img src="/icons/small-icons/whatsapp.svg" alt="wa-icon" />
                      <p>WhatsApp</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </DetailsCard>

          {/* <DetailsCard class="mb-4" >
            <div className="prod-detail__pages__property__detailBuying__left__dev-info__wrapper">
              <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                <div class="md:shrink-0">
                  <InitialsAvatar
                    className="prod-detail__pages__property__detailBuying__left__dev-info__profile-pic"
                    name="Merapi Arsita Graha"
                  />
                </div>
                <div className="prod-detail__pages__property__detailBuying__left__dev-info__name">
                  <p>{_.isJSON(data?.metadataUser) ? JSON.parse(data?.metadataUser)?.name : "-"}</p>
                  <p className="prod-detail__pages__property__detailBuying__left__dev-info__location">
                    <p>{_.isJSON(data?.metadataUser) && JSON.parse(JSON.parse(data?.metadataUser)?.address) ? JSON.parse(JSON.parse(data?.metadataUser)?.address)?.alamat : "-"}</p>
                    <p>{_.isJSON(data?.metadataUser) ? console.log("[DEBUG] data?.metadataUser : ", JSON.parse(data?.metadataUser)) : "-"}</p>
                  </p>
                </div>
              </div>
              <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                <div className="prod-detail__pages__property__detailBuying__left__dev-info__wa-btn">
                  <div class="flex justify-between items-center">
                    <Button buttonColor="greenWA" textColor="white" fullWidth={false} paddingSize={"padding-0"} onClick={() => openLink(`https://api.whatsapp.com/send?phone=${data?.mobileNo?.replace("|", "").replace("+", "").replace(/^0/g, "62")}`, true)}>
                      <div className="flex flex-row gap-2">
                        <img src="/icons/small-icons/whatsapp.svg" alt="wa-icon" />
                        <p>WhatsApp</p>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DetailsCard> */}
          <h2 class="mt-6 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            Tentang Pengembang
          </h2>
          <p class="mb-4 mt-2 text-gray-500">
            {_.isJSON(data?.metadataUser) ? JSON.parse(data?.metadataUser)?.description : "-"}
          </p>
          <p className="text-[1rem] text-[#00529C] font-bold;">Proyek ({countProject})</p>
          <hr class="mb-4" />
          <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4">
              {data && dataImage ? (
                data?.projectDeveloper?.map((project) => {
                  return <ProjectList projectData={project} image={dataImage} />;
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DeveloperPage;
