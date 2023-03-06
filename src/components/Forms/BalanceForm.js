import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../Buttons/Button";

import classes from "./Form.module.css";
import Input from "./Inputs/Input";

const BalanceForm = (props) => {
  const [deposit, setDeposit] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();

  const depositHandler = async () => {
    setIsLoading(true);
    const currBalance = await axios.get(
      "https://6401dcb30a2a1afebef3c3de.mockapi.io/balance/1"
    );

    const newBalance = parseInt(deposit) + currBalance.data.balance;

    axios
      .put("https://6401dcb30a2a1afebef3c3de.mockapi.io/balance/1", {
        balance: newBalance,
      })
      .then(() => {
        setIsLoading(false);
        nav("/");
        props.onUpdate();
      });
  };

  return (
    <div className={classes["form-container"]}>
      <form className={classes.form}>
        <Input
          label="Deposit Amount ($)"
          type="number"
          id="balance"
          name="balance"
          value={deposit}
          onChange={(e) => {
            setDeposit(e.target.value);
          }}
        />
        <Button type="button" onClick={depositHandler}>
          {!isLoading && "Deposit"}
          {isLoading && "Loading..."}
        </Button>
      </form>
    </div>
  );
};

export default BalanceForm;
