// import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
// import {Menu, MenuButton, MenuList, MenuItem, MenuLink} from '@reach/menu-button';
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { setLongLat } from "../store/actions/changeState";

// export default function CategoryDropdown(props) {
//     let { title } = props;
  
//     let [isOverButton, setIsOverButton] = useState(false);
//     let [isOverList, setIsOverList] = useState(false);
//     let [isOpen, setIsOpen] = useState();
//     let [isTouchInput, setIsTouchInput] = useState();
//     let [hasClicked, setHasClicked] = useState();
//     let button = useRef(null);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [menuClicked, setMenuClicked] = useState(false);
//     useEffect(() => {
//       window.document.dispatchEvent(
//         new Event("DOMContentLoaded", { bubbles: true, cancelable: true })
//       );
//     }, []);
  
//     useLayoutEffect(() => {
//       if (isOpen && !isOverButton && !isOverList && !isTouchInput) {
//         button.current.click();
//         setIsOpen(false);
//       } else if (!isOpen && (isOverButton || isOverList) && !isTouchInput) {
//         button.current.click();
//         setIsOpen(true);
//       }
//     }, [isOverButton, isOverList]);
  
//     useEffect(() => {
//       setIsTouchInput(false);
//       setHasClicked(false);
//     }, [hasClicked]);
  
//     return (
//       <Menu style={{padding: "0.1em 1em", backgroundColor: "white", border: "none", border: "2px solid #ccc", borderRadius: "5px", margin: "5px"}}>
//         <MenuButton
//           ref={button}
//           onTouchStart={() => {
//             setIsTouchInput(true);
//           }}
//           onMouseEnter={event => {
//             setIsOverButton(true);
//           }}
//           onMouseLeave={event => {
//             setIsOverButton(false);
//           }}
//           onClick={() => {
//             setHasClicked(true);
//             setIsOpen(!isOpen);
//           }}
//           onKeyDown={() => {
//             setIsOpen(!isOpen);
//           }}
//         >
//           <span>{title}</span> <span aria-hidden>▾</span>
//         </MenuButton>
//         <MenuList style={{backgroundColor: "white", borderRadius: "0 0 5px 5px", border: "2px solid #ccc", transform: "translateY(-2px)"}}
//           onMouseEnter={event => {
//             setIsOverList(true);
//           }}
//           onMouseLeave={event => {
//             setIsOverList(false);
//           }}
//         >
//             <div>
//                 <div style={{width: "100%"}}>
//                     <br />
//                     <h3 style={{padding: "0.1em 1em"}}><b>KPR</b></h3>
//                     <MenuItem
//                         onSelect={() => {
//                             navigator.geolocation.getCurrentPosition(function (position){
//                                 dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
//                                 window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
//                               });
//                         }}>
//                         Ajukan KPR
//                     </MenuItem>
//                     <MenuLink as= {Link} to="/profile-user/list-pengajuan-kpr">
//                         Lihat Status
//                     </MenuLink>
//                 </div>
//             </div>
//         </MenuList>
//       </Menu>
//     );
//   }