import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Menu, MenuButton, MenuList, MenuLink} from '@reach/menu-button';
import { Link, useNavigate } from "react-router-dom";

export default function CategoryDropdown(props) {
    let { title } = props;
  
    let navigate = useNavigate();
    let [isOverButton, setIsOverButton] = useState(false);
    let [isOverList, setIsOverList] = useState(false);
    let [isOpen, setIsOpen] = useState();
    let [isTouchInput, setIsTouchInput] = useState();
    let [hasClicked, setHasClicked] = useState();
    let button = useRef(null);

    function changeLocation(placeToGo){
      navigate(placeToGo, { replace: true });
      window.location.reload();
  }
  
    useLayoutEffect(() => {
      if (isOpen && !isOverButton && !isOverList && !isTouchInput) {
        button.current.click();
        setIsOpen(false);
      } else if (!isOpen && (isOverButton || isOverList) && !isTouchInput) {
        button.current.click();
        setIsOpen(true);
      }
    }, [isOverButton, isOverList]);
  
    useEffect(() => {
      setIsTouchInput(false);
      setHasClicked(false);
    }, [hasClicked]);
  
    return (
      <Menu>
        <MenuButton
          ref={button}
          onTouchStart={() => {
            setIsTouchInput(true);
          }}
          onMouseEnter={(event) => {
            setIsOverButton(true);
          }}
          onMouseLeave={(event) => {
            setIsOverButton(false);
          }}
          onClick={() => {
            setHasClicked(true);
            setIsOpen(!isOpen);
          }}
          onKeyDown={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>{title}</span> <span aria-hidden>▾</span>
        </MenuButton>
        <MenuList
          onMouseEnter={event => {
            setIsOverList(true);
          }}
          onMouseLeave={event => {
            setIsOverList(false);
          }}
        >
            <div>
                <div>
                    <MenuLink><b>Kota Pilihan</b></MenuLink>
                    <MenuLink as= {Link} to="/v2/search?type=city-only&cityName=Daerah%20Khusus%20Ibukota%20Jakarta" onClick={() => changeLocation('/v2/search?type=city-only&cityName=Daerah%20Khusus%20Ibukota%20Jakarta')}>
                        Jakarta
                    </MenuLink>
                    <MenuLink as={Link} to ="/v2/search?type=city-only&cityName=Surabaya" onClick={() => changeLocation('/v2/search?type=city-only&cityName=Surabaya')}>
                        Surabaya
                    </MenuLink>
                    <MenuLink as={Link} to ="/v2/search?type=city-only&cityName=Makassar" onClick={() => changeLocation('/v2/search?type=city-only&cityName=Makassar')}>
                        Makassar
                    </MenuLink>
                </div>
            </div>
        </MenuList>
      </Menu>
    );
  }