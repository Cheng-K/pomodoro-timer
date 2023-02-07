import React from "react";
import { MdSettings, MdMenu } from "react-icons/md";

function Header() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 d-flex justify-content-start align-items-center">
          <MdMenu size="2rem" />
        </div>
        <div className="col">
          <h2 className="text-center">Stay focused</h2>
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center">
          <MdSettings size="2rem" />
        </div>
      </div>
    </div>
  );
}

export default Header;
