import React, { useState } from "react";
import "./style.css";

function Navigation() {
  return (
    <div id="navigation">
      <div className="content-box">
        <h2 className="logo">canis</h2>

        <div className="menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 9H22" stroke="white" strokeWidth={.8}/>
<path d="M3 15H22" stroke="white" strokeWidth={.8}/>
</svg>

        </div>
      </div>
    </div>
  );
}

export default Navigation;
