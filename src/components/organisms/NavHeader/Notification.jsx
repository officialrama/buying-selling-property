import { React, useEffect, useState } from "react";
import { decryptStr } from "../../../helpers/encryptDecrypt";

const Notification = ({
  onClickNotif,
  dropdownNotif,
  listNotif,
  handleReadNotif,
}) => {
  const [notifNew, setNotifNew] = useState(false);

  useEffect(() => {

    listNotif?.res?.responseData?.map(notif => {
      if (notif?.isViewed === false){
        setNotifNew(true)
      } 
    })

   }, [listNotif])

  return (
    <>
      <img
        src="/icons/notification.svg"
        alt="notif"
        className="cursor-pointer mr-2"
        onClick={onClickNotif}
      />
      {notifNew && (
        <div
          style={{
            width: "14px",
            height: "14px",
            backgroundColor: "#F37021",
            position: "absolute",
            top: "1px",
            left: "-3px",
            borderRadius: "12px",
          }}
        >
          {" "}
        </div>
      )}
      <div className={`dropdown-menu ${dropdownNotif ? "block" : "hidden"}`}>
        <ul className="dropdown-list__listWrap">
          {!listNotif?.res || listNotif?.res?.responseData?.length === 0 && (
            <li className="dropdown-link">Tidak ada pemberitahuan baru</li>
          )}

          {listNotif?.res?.responseData?.map((notif) => (
            <li
              key={notif.id}
              className={`dropdown-link ${!notif.isViewed && "font-bold"}`}
              onClick={() => notif?.isViewed === false ? handleReadNotif(notif) : ""}
            >
              {decryptStr(notif.message)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Notification;
