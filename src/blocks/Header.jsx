// import Time from "/src/components/demo-async-hook";
import logo from "/src/logo.svg";
import React from "react";
import proxyState from "/src/state";
import {useSnapshot} from "valtio";

export  function Header(){
    const snap = useSnapshot(proxyState);
    const day = snap.dayName

    return (  <header className="App-header">
        {/*<Time/>*/}
        <img src={logo} className="App-logo" alt="logo"/>
        <p>Hello Tree Measurements day {day}</p>
    </header>)
}

export default Header