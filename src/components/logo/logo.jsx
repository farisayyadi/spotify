import React from "react";
import "./logo.scss";

function Logo() {
  return (
    <a className="logo" href="">
      <img src={require("../../assets/images/logo.png")} />
    </a>
  );
}

export default Logo;
