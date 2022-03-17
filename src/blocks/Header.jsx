// import Time from "/src/components/demo-async-hook";
import logo from "/src/logo.svg";
import React from "react";
import proxyState from "/src/state";
import {useSnapshot} from "valtio";

export  function Header(){
    const snap = useSnapshot(proxyState);
    const dayStart = snap.dayStartName
    const dayEnd = snap.dayEndName

    return (  <header className="App-header">
        {/*<Time/>*/}
        <img src={logo} className="App-logo" alt="logo"/>
        <p>Hello Tree Measurements {dayStart} to {dayEnd}</p>

    </header>)
}

export default Header