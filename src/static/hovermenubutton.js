import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Menu, MenuButton, MenuList, MenuItem} from '@reach/menu-button';
import { useDispatch } from "react-redux";
import { setLongLat } from "../store/actions/changeState";

export default function CategoryDropdown(props) {
    let { title } = props;
  
    let [isOverButton, setIsOverButton] = useState(false);
    let [isOverList, setIsOverList] = useState(false);
    let [isOpen, setIsOpen] = useState();
    let [isTouchInput, setIsTouchInput] = useState();
    let [hasClicked, setHasClicked] = useState();
    let button = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
      window.document.dispatchEvent(
        new Event("DOMContentLoaded", { bubbles: true, cancelable: true })
      );
    }, []);
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
      <Menu style={{padding: "0.75em 1em", backgroundColor: "white", border: "none", border: "2px solid #ccc", borderRadius: "5px", margin: "5px"}}>
        <MenuButton
          ref={button}
          onTouchStart={() => {
            setIsTouchInput(true);
          }}
          onMouseEnter={event => {
            setIsOverButton(true);
          }}
          onMouseLeave={event => {
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
        <MenuList style={{backgroundColor: "white", width: "500px", borderRadius: "0 0 5px 5px", border: "2px solid #ccc", transform: "translateY(-2px)"}}
          onMouseEnter={event => {
            setIsOverList(true);
          }}
          onMouseLeave={event => {
            setIsOverList(false);
          }}
        >
            <div style={{width: "100%", display: "flex"}}>
                <div style={{width: "100%"}}>
                    <br />
                    <h3 style={{padding: "0.1em 1em"}}><b>Program</b></h3>
                    <MenuItem
                        onSelect={() => {
                          navigator.geolocation.getCurrentPosition(function (position){
                              dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                              window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}&jenisPropeti=Subsidi`;
                            });
                      }}>
                        Subsidi
                    </MenuItem>
                    <MenuItem
                        onSelect={() => {
                          navigator.geolocation.getCurrentPosition(function (position){
                              dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                              window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                            });
                      }}>
                        Non Subsidi
                    </MenuItem>
                </div>

                <div style={{width: "100%"}}>
                    <br />
                    <h3 style={{padding: "0.1em 1em"}}><b>Pilih Tipe</b></h3>
                    <MenuItem
                        onSelect={() => {
                          navigator.geolocation.getCurrentPosition(function (position){
                              dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                              window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                            });
                      }}>
                        Rumah
                    </MenuItem>
                    <MenuItem
                        onSelect={() => {
                          navigator.geolocation.getCurrentPosition(function (position){
                              dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                              window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                            });
                      }}>
                        Apartemen
                    </MenuItem>
                    <MenuItem
                        onSelect={() => {
                          navigator.geolocation.getCurrentPosition(function (position){
                              dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                              window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                            });
                      }}>
                        Villa
                    </MenuItem>
                    <MenuItem
                        onSelect={() => {
                          navigator.geolocation.getCurrentPosition(function (position){
                              dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                              window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                            });
                      }}>
                        Ruko
                    </MenuItem>                    
                </div>

                <div style={{width: "100%"}}>
                    <br />
                    <h3 style={{padding: "0.1em 1em"}}><b>Kondisi Properti</b></h3>
                    <MenuItem
                        onSelect={() => {
                          navigator.geolocation.getCurrentPosition(function (position){
                              dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                              window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                            });
                      }}>
                        Properti Baru
                    </MenuItem>
                    <MenuItem
                        onSelect={() => {
                          navigator.geolocation.getCurrentPosition(function (position){
                              dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
                              window.location.href = `/v2/search?type=nearby&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
                            });
                      }}>
                        Properti Lama
                    </MenuItem>
                </div>
            </div>
        </MenuList>
      </Menu>
    );
  }