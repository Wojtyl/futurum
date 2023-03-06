import React from "react";
import { useNavigate } from "react-router-dom";
import { SlPlus } from "react-icons/sl";

import classes from "./Header.module.css";

const Header = (props) => {
  const nav = useNavigate();
  return (
    <React.Fragment>
      <div className={classes.header}>
        <div className={classes.title}>
          <p onClick={() => nav("/")}>Campaign CRUD App</p>
        </div>
        <div className={classes.balance}>
          <div className={classes["balance-content"]}>
            <p className={classes["balance-text"]}>Balance</p>
            <p>{props.balance}$</p>
          </div>
          <SlPlus
            onClick={() => nav("/balance")}
            className={classes["add-balance"]}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
