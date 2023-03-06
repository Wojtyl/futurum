import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlPlus } from "react-icons/sl";

import classes from "./Header.module.css";

const Header = () => {
  const nav = useNavigate();
  const [balance, setBalance] = useState(5000);
  return (
    <React.Fragment>
      <div className={classes.header}>
        <div className={classes.title} onClick={() => nav("/")}>
          <p>Campaign CRUD App</p>
        </div>
        <div className={classes.balance}>
          <div className={classes["balance-content"]}>
            <p className={classes["balance-text"]}>Balance</p>
            <p>{balance}$</p>
          </div>
          <SlPlus className={classes["add-balance"]} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
