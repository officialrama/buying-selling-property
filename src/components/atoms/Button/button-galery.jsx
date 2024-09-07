import classNames from "classnames";

function ButtonGalery({ setClass, onClick, type }) {

  const icon = {
    like: {
      link: "/icons/small-icons/Love_gallery.svg"
    },
    liked:{
      link: "/icons/small-icons/Love_liked.svg"
    },
    compare: {
      link: "/icons/small-icons/Compare_gallery.svg"
    },
    share: {
      link: "/icons/small-icons/Share_gallery.svg"
    },
    v360: {
      link: "/icons/small-icons/3D-blue.svg"
    },
    download: {
      link: "/icons/small-icons/button_download.svg"
    }
  }  



  return (
    <div className={`mt-2 flex justify-center items-center border border-solid border-[#1078CA] rounded-md bg-white shadow-lg ${setClass ? setClass : ""}`}>
        <button className="px-1 py-2  w-[48px] h-[48px]" onClick={onClick}>
            <img className="mx-auto" src={icon[type].link} alt="3D" />
        </button>
    </div>
  )
}

export default ButtonGalery;