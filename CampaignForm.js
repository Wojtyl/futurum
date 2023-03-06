import React, { useReducer, useState, useContext } from "react";
import Button from "../Buttons/Button";
import List from "./Inputs/List";
import CampaignContext from "../../context/CampaignsContext";
import Input from "./Inputs/Input";
import InputList from "./Inputs/InputList";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import classes from "./CampaignForm.module.css";
import InputCheckbox from "./Inputs/InputCheckbox";

const CampaignForm = (props) => {
  const [data, setData] = useState({ status: false });
  const navigate = useNavigate();
  const updateData = (e) => {
    if (e.target.name === "status") {
      setData({
        ...data,
        status: e.target.checked,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitHandler = () => {
    axios
      .post("https://6401dcb30a2a1afebef3c3de.mockapi.io/FuturumProject", data)
      .then(() => {
        navigate("/");
        navigate(0);
      });
    console.log(data);
  };

  return (
    <div className={classes["form-container"]}>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label="Campaign Name"
          type="text"
          id="campaign-name"
          name="name"
          onChange={updateData}
        />
        <Input
          label="Campaign Keywords"
          type="text"
          id="campaign-keywords"
          name="keywords"
          onChange={updateData}
        />
        <Input
          label="Bid Amount"
          type="number"
          id="campaign-bid"
          name="bid"
          onChange={updateData}
        />
        <InputList
          label="Town"
          list="towns"
          id="campaign-town"
          name="town"
          onChange={updateData}
        />

        {/* <label htmlFor="campaign-town">Town</label>
      <input list="campaign-town" name="town" onChange={updateData} /> */}
        <Input
          label="Campaign fund"
          type="number"
          id="campaign-fund"
          name="fund"
          onChange={updateData}
        />

        <Input
          label="Radius"
          type="number"
          id="campaign-radius"
          name="radius"
          onChange={updateData}
        />
        <InputCheckbox
          label="Campaign status"
          type="checkbox"
          id="campaign-status"
          name="status"
          onChange={updateData}
        />
        <Button onClick={submitHandler} type="button">
          Add campaign
        </Button>
      </form>
    </div>
  );
};

export default CampaignForm;
