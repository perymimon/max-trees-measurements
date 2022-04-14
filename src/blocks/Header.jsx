// import Time from "/src/components/demo-async-hook";
import logo from "/src/logo.svg";
import React from "react";
import proxyState from "/src/state";
import {useSnapshot} from "valtio";

export  function Header(){
    const snap = useSnapshot(proxyState);
    return (  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>Hello Tree Measurements for {snap.dayName}</p>

    </header>)
}

export default Header