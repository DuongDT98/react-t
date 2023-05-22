import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import "./header.css";

const Header = () => {
  const classes = classNames("main-navbar", "bg-white");

  const history = useHistory();

  return (
    <div className={classes}>
      <div className="header-container">
        <div className="header-home" onClick={() => history.push(`/`)}>
          Home
        </div>
        <div className="header-menu">
          <div className="menu-item" onClick={() => history.push(`/product`)}>
            Product
          </div>
          <div className="menu-item" onClick={() => history.push(`/customer`)}>
            Customer
          </div>
          <div className="menu-item" onClick={() => history.push(`/shop`)}>
            Shops
          </div>
          <div className="menu-item" onClick={() => history.push(`/carts`)}>
            Carts
          </div>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {
  stickyTop: true,
};

export default Header;
