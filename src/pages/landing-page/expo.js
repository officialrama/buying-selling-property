import React, {useEffect, useState} from "react";
import { Button } from "../../components/atoms";
import { Footer } from "../../components/molecules";
import { useNavigate } from "react-router-dom";
import { decryptStr, encryptStrFe } from "../../helpers/encryptDecrypt";
import Developer from "./dataDeveloper.json";
import DeveloperSemarang from "./dataDeveloperExpoSemarang.json"
import { LazyLoadImage } from "react-lazy-load-image-component";

const Expo = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSeize] = useState(window.innerWidth)

  // const handleClick = () => {
  //   {data.idDeveloper === ""
  //   navigate(`/`)}
  // }

    const handleResize = () => {
        setWindowSeize(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

  return (
    <div>
      <div className="relative">
        <img
          src={
            windowSize <= 769
              ? "/images/kpr-expo-128-_-banner-mobile-375x427.png"
              : windowSize <= 1280
              ? "/images/kpr-expo-128-_-banner-small-pc-1268x377.png"
              : "/images/kpr-expo-128-_-banner-large-pc-1908x378.png"
          }
          alt="jumbotron"
          className="w-screen object-cover"
        />
        <div className="__expo-bg absolute top-0 left-0 h-full w-screen"></div>
      </div>
      <div>
        <h1 className="my-6 text-lg text-center font-semibold tracking-tight text-gray-900 dark:text-white">
          LIST DEVELOPER
        </h1>
      </div>
      {DeveloperSemarang.length === 0 ? (
        <>
          <span>Mengambil data</span>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {DeveloperSemarang.map((data, index) => {
            return (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 items-center text-center font-bold"
              >
                <div className="mb-5 w-full h-[200px] p-4">
                  <LazyLoadImage
                    src={data.logoDeveloper}
                    alt={data.namaDeveloper}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <span className="text-center font-bold px-2 py-4 text-[0.70rem]">
                  {data.namaDeveloper}
                </span>
                <div className="px-2 mt-8">
                  <Button
                    onClick={
                      () =>
                        data.idDeveloper !== ""
                          ? (window.location.href = `https://www.homespot.id/developer/${encodeURIComponent(
                              encryptStrFe(data.idDeveloper)
                            )}`)
                          : navigate(`/`)
                      // navigate(
                      //   data.idDeveloper !== ""rr
                      //     ? `https://www.homespot.id/developer/${encodeURIComponent(
                      //         encryptStrFe(data.idDeveloper)
                      //       )}`
                      //     : "/"
                      // )
                    }
                    className="w-full px-[6px] "
                  >
                    <p className="text-xs">Lihat Detail</p>
                  </Button>
                </div>

                <br />
              </div>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Expo;