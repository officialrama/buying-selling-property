import React,{useState} from "react";
import { staticConst } from "./staticConst";
import './dropdown.css';
import { Link, useNavigate } from "react-router-dom";
import { setLongLat } from "../store/actions/changeState";
import { useDispatch } from "react-redux";

function DropdownKpr(){
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return(
        <>
            <ul style={{zIndex:'20'}}
                onClick={handleClick}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                {(staticConst.navigationKpr).map((nav, idx) => {
                    return(
                        <li key={idx}>
                            <p 
                                className={nav.cName}
                                onClick={() => {
                                    if(nav.title === "Ajukan KPR"){
                                        navigator.geolocation.getCurrentPosition(function (position) {
                                            dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                                            window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                                        }, (err => {
                                            // default surabaya
                                            dispatch(setLongLat(112.768845, -7.250445));
                                            window.location.href = `/v2/search?type=nearby&lat=${-7.250445}&lng=${112.768845}`;
                                        }));
                                    } else {
                                        navigate(nav.path)
                                    }
                                }}
                            >
                                {nav.title}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const DropdownKprNested = ({ handleClick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <ul onClick={handleClick} className='dropdown-list__listWrap'>
            {(staticConst.navigationKpr).map((nav, idx) => {
                    return(
                        <li key={idx} className='dropdown-list__list'>
                            <p 
                                // className={nav.cName}
                                onClick={() => {
                                    if(nav.title === "Ajukan KPR"){
                                        navigator.geolocation.getCurrentPosition(function (position) {
                                            dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                                            window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                                        }, (err => {
                                            // default surabaya
                                            dispatch(setLongLat(112.768845, -7.250445));
                                            window.location.href = `/v2/search?type=nearby&lat=${-7.250445}&lng=${112.768845}`;
                                        }));
                                    } else {
                                        navigate(nav.path)
                                    }
                                }}
                            >
                                {nav.title}
                            </p>
                        </li>
                    )
                })}
        </ul>
    )
}

export default DropdownKpr;
export { DropdownKprNested };