import React, { useEffect, useState } from "react";

import Input from "../Forms/Inputs/Input";
import InputList from "../Forms/Inputs/InputList";
import Button from "../Buttons/Button";
import axios from "axios";
import InputCheckbox from "../Forms/Inputs/InputCheckbox";
import { useNavigate } from "react-router";

import classes from "../Forms/CampaignForm.module.css";

const UpdateCampaign = () => {
  const nav = useNavigate();

  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [keywords, setKeywords] = useState("");
  const [fund, setFund] = useState("");
  const [bid, setBid] = useState("");
  const [town, setTown] = useState("");
  const [radius, setRadius] = useState("");
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setId(localStorage.getItem("id"));
    setKeywords(localStorage.getItem("keywords"));
    setBid(localStorage.getItem("bid"));
    setTown(localStorage.getItem("town"));
    setFund(localStorage.getItem("fund"));
    setRadius(localStorage.getItem("radius"));
  }, []);

  console.log("init: ", checked);

  const submitHandler = () => {
    axios
      .put(`https://6401dcb30a2a1afebef3c3de.mockapi.io/FuturumProject/${id}`, {
        name,
        keywords,
        fund,
        bid,
        town,
        radius,
        status: checked,
      })
      .then(() => {
        nav("/");
      });
    console.log("test");
  };

  const backHandler = () => {
    nav("/");
  };

  return (
    <>
      <p className="section-title">Update campaign:</p>
      <div className={classes["form-container"]}>
        <form className={classes.form} onSubmit={submitHandler}>
          <Input
            label="Campaign Name"
            type="text"
            id="campaign-name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            label="Campaign Keywords"
            type="text"
            id="campaign-keywords"
            name="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <Input
            label="Bid Amount"
            type="number"
            id="campaign-bid"
            name="bid"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
          />
          <InputList
            label="Town"
            list="towns"
            id="campaign-town"
            name="town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
          <Input
            label="Campaign fund"
            type="number"
            id="campaign-fund"
            name="campaign-fund"
            value={fund}
            onChange={(e) => setFund(e.target.value)}
          />

          <Input
            label="Radius"
            type="number"
            id="campaign-radius"
            name="radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          <InputCheckbox
            label="Campaign status"
            id="campaign-status"
            name="status"
            status={checked}
            onChange={(e) => setChecked(!checked)}
          />

          <Button onClick={submitHandler} type="button">
            Update campaign
          </Button>
          <Button onClick={submitHandler} type="button">
            My campaigns
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateCampaign;
