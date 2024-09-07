import React,{useState} from "react";
import { staticConst } from "./staticConst";
import './dropdown.css';
import { Link, useNavigate } from "react-router-dom";

function Dropdown(){
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    let navigate = useNavigate();

    function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        if(window){
            window.location.reload();
        }
      }

    return(
        <>
            <ul style={{zIndex:'20'}}
                onClick={handleClick}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                {(staticConst.navigation).map((nav, idx) => {
                    return(
                        <li key={idx}>
                            <Link 
                                className={nav.cName}
                                to={nav.path}
                                onClick={() => changeLocation(nav.path)}
                            >
                                {nav.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const DropdownNested = ({ handleClick }) => {
    let navigate = useNavigate();

    const changeLocation = (placeToGo) => {
        navigate(placeToGo);
        if(window){
            window.location.reload();
        }
    }

    return (
        <ul onClick={handleClick} className='dropdown-list__listWrap'>
            {(staticConst.navigation).map((nav, idx) => {
                    return(
                        <li key={idx} className='dropdown-list__list'>
                            <Link
                                to={nav.path}
                                onClick={() => changeLocation(nav.path)}
                            >
                                {nav.title}
                            </Link>
                        </li>
                    )
                })}
        </ul>
    )
}

export default Dropdown;
export { DropdownNested };