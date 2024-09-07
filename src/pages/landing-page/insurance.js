  import React, {useEffect, useState} from "react";
  import { Breadcrumb } from "flowbite-react";
  import { Footer } from "../../components/molecules";
  import { useNavigate } from "react-router-dom";
  import InsuranceData from "./insuranceData.json";
  import { LazyLoadImage } from "react-lazy-load-image-component";
  import { insuranceProgramList } from "../../store/actions/fetchData/insurancePremi";
  import { useDispatch } from "react-redux";

  const Asuransi = () => {
    const navigate = useNavigate();
    const [windowSize, setWindowSeize] = useState(window.innerWidth)
    const dispatch = useDispatch();
    const [dataList, setDataList]= useState();

      const handleResize = () => {
          setWindowSeize(window.innerWidth)
      }

      useEffect(() => {
          window.addEventListener('resize', handleResize)

          return () => {
              window.removeEventListener('resize', handleResize)
          }
      }, []);

      useEffect(() => {
        dispatch(insuranceProgramList(dataList, setDataList, InsuranceData))
        
      }, []);

      const getProgramIdByName = (programName) => {
        const program = dataList.find(p => {
          const adjustedProgramName = p.ProgramName === "Homespot Asri BRINS Dev" ? "Homespot Asri BRINS" : p.ProgramName;
          return adjustedProgramName === programName;
        });
        return program ? program.ProgramId : null;
      };
    
      const handleItemClick = (programName) => {
        const programId = getProgramIdByName(programName);
        if (programId !== null) {
          localStorage.setItem("selectedProgramId", programId);
        } 
      };
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div className="pl-[48px] gap-[4px] absolute z-10 top-16 left-0 mobile:absolute mobile:-left-9 mobile:top-[53px] md:-left-5">
        <Breadcrumb>
          <span className="text-[#FFFFFF] text-sm cursor-pointer mobile:text-xs" onClick={() => navigate('/') } >
            Home
            </span>
        <Breadcrumb.Item href='/insurance'>
        <span className="text-[#FFFFFF] text-sm mobile:text-xs">
            Asuransi
            </span>
        </Breadcrumb.Item>
      </Breadcrumb>
      </div>
        <div className="relative">
          <img
            src={
              windowSize <= 769
                ? "/images/Backdrop.png"
                : windowSize <= 1280
                ? "/images/Backdrop.png"
                : "/images/Backdrop.png"
            }
            alt="jumbotron"
            className="w-[100%] object-contain"
          />
          
        </div>
        <div>
          <h1 className="ml-[48px] my-6 text-lg text-start font-bold tracking-tight text-gray-900 dark:text-white">
            Jelajahi Ragam Perlindungan dan Pilih Sesuai Kebutuhan
          </h1>
        </div>

          <div className="mx-[48px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-[24px] xxl:gap-[10px] ">
          {/* {dataList?.map((data, index) => { */}
    {InsuranceData?.map((localData, index) => {
      const statusActive = localData?.status === 'active'
      const statusNonActive = localData?.status === 'nonactive'
      const cardStyle = {
        position: "relative",
      };

        return (
          <div
            key={index}
            className={`bg-white rounded-lg items-center text-center font-bold`}
            style={cardStyle}
          >
                
            <div
              className={`absolute bottom-12 largePc:right-[24px] miniPc:right-[90px] xxl:right-[130px] mobile:right-[155px] bg-[#FEEDDF] border border-[#F87304] text-[#F87304] p-2 rounded-[36px] text-sm font-bold grayscale-0 h-[36px] w-[124px] ${statusNonActive ? "cursor-not-allowed" : ""} ${statusActive ? "hidden" : ""}`}
              style={{ zIndex: 2}}
            >
              <span>Segera Hadir</span>
            </div>
              <a
              href={statusActive ? localData.linkInsurance : "#"}
              rel="noopener noreferrer"
              className={`cursor-pointer ${statusNonActive ? "cursor-not-allowed" : ""}`}
              onClick={() => handleItemClick(localData?.ProgramName)}
              >
              <div
              className={`largePc:ml-[16px] largePc:mt-[45px] xxl:ml-[16px] xxl:mt-[36px] md:ml-[16px] md:mt-[45px] tab:ml-[16px] tab:mt-[45px] mobile:ml-[16px] mobile:mt-[45px] ${statusNonActive ? "grayscale" : ""}`}
              style={{ position: "absolute", top: 0, left: 0, zIndex: 1}}>
              {localData.namaInsurance}
          </div>
              <LazyLoadImage
              className={`${statusNonActive ? "grayscale" : ""}`}
              src={localData.logoInsurance}
              alt={localData.namaInsurance}
              style={{
                width: "204px",
                height: "204px",
                objectFit: "contain",
                position: "relative",
                zIndex: 0
              }}
          />
          <div
              className={`largePc:ml-[16px] largePc:mt-[22px] xxl:ml-[16px] xxl:mt-[16px] md:ml-[16px] md:mt-[25px] tab:ml-[16px] tab:mt-[25px] mobile:ml-[16px] mobile:mt-[25px] ${statusNonActive ? "grayscale" : ""}`} 
              style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 3,
              }}
          >
                  <img
                      src={localData.briLogo}
                      className="h-5 w-auto"
                  >
                  </img>
          </div>
          </a>
          <br />
        </div>
            );
    })}
    
    {/* {dataList?.map((data, index) => {
    {InsuranceData?.map((localData, index) => {
          const isIndex0To2 = index >= 0 && index <= 2;
          const isIndex3To5 = index >= 3;
          const isIndex2 = index === 2;
          const isIndex3 = index >= 0 && index <= 1;

      // const localData = InsuranceData[index];
      const cardStyle = {
        position: "relative",
      };

      if (!isIndex2) {
        return (
          <div
            key={index}
            className={`bg-white rounded-lg items-center text-center font-bold`}
            style={cardStyle}
          >
                
            <div
              className={`absolute bottom-12 largePc:right-[24px] miniPc:right-[90px] xxl:right-[130px] mobile:right-[155px] bg-[#FEEDDF] border border-[#F87304] text-[#F87304] p-2 rounded-[36px] text-sm font-bold grayscale-0 h-[36px] w-[124px] ${isIndex3To5 ? "cursor-not-allowed" : isIndex3 ? "cursor-not-allowed " : ""} ${isIndex2 ? "hidden" : ""}`}
              style={{ zIndex: 2}}
            >
              <span>Segera Hadir</span>
            </div>
            
              <a
              href={isIndex2 ? localData.linkInsurance : "#"}
              rel="noopener noreferrer"
              className={`cursor-pointer ${isIndex3To5 ? "cursor-not-allowed" : isIndex3 ? "cursor-not-allowed" : ""}`}
              onClick={() => handleItemClick(dataList?.[0]?.ProgramId)}
              >
              <div
              className={`largePc:ml-[16px] largePc:mt-[45px] xxl:ml-[16px] xxl:mt-[36px] md:ml-[16px] md:mt-[45px] tab:ml-[16px] tab:mt-[45px] mobile:ml-[16px] mobile:mt-[45px] ${isIndex3To5 ? "grayscale" : isIndex3 ? "grayscale" : ""}`}
              style={{ position: "absolute", top: 0, left: 0, zIndex: 1}}>
              {localData.namaInsurance}
          </div>
              <LazyLoadImage
              className={`${isIndex3To5 ? "grayscale" : isIndex3 ? "grayscale" : ""}`}
              src={localData.logoInsurance}
              alt={localData.namaInsurance}
              style={{
                width: "204px",
                height: "204px",
                objectFit: "contain",
                position: "relative",
                zIndex: 0
              }}
          />
          <div
              className={`largePc:ml-[16px] largePc:mt-[22px] xxl:ml-[16px] xxl:mt-[16px] md:ml-[16px] md:mt-[25px] tab:ml-[16px] tab:mt-[25px] mobile:ml-[16px] mobile:mt-[25px] ${isIndex3To5 ? "grayscale" : isIndex3 ? "grayscale" : ""} ${isIndex0To2 ? "w-[62px] h-[20px]" : isIndex3To5 ? "largePc:w-[60%] xl:w-[60%] lg:w-[60%] largePc:h-[22px] xxl:w-[34%] md:w-[30%] tab:w-[30%] mobile:w-[30%] " : ""}`} 
              style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 3,
              }}
          >
                  <img
                      src={localData.briLogo}
                  >
                  </img>
          </div>
          </a>
          <br />
        </div>
            );
          }
      return null;
    })} */}

  </div>
  <div style={{ flex: 1 }}></div>
      <Footer />
      </div>
    );
  };
  export default Asuransi;