import React, { useEffect, useState } from "react";

import Input from "../Forms/Inputs/Input";
import InputList from "../Forms/Inputs/InputList";
import Button from "../Buttons/Button";
import axios from "axios";
import InputCheckbox from "../Forms/Inputs/InputCheckbox";
import { useNavigate, redirect } from "react-router";

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
  const [checked, setChecked] = useState(localStorage.getItem("status"));

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setId(localStorage.getItem("id"));
    setKeywords(localStorage.getItem("keywords"));
    setBid(localStorage.getItem("bid"));
    setTown(localStorage.getItem("town"));
    setFund(localStorage.getItem("fund"));
    setRadius(localStorage.getItem("radius"));
    setChecked(localStorage.getItem("status"));
  }, []);

  console.log(checked);

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
        nav("/read");
      });
    console.log("test");
  };

  return (
    <>
      <h1>UPDATE YOUR CAMPAIGN</h1>
      <form onSubmit={submitHandler}>
        <Input
          label="Campaign Name"
          type="text"
          id="campaign-name"
          name="name"
          value={name}
          onChange={(e) => {
            console.log(name);
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

        {/* <label htmlFor="campaign-town">Town</label>
      <input list="campaign-town" name="town" onChange={updateData} /> */}
        <Input
          label="Campaign fund"
          type="number"
          id="campaign-fund"
          name="campaign-fund"
          value={fund}
          onChange={(e) => setFund(e.target.value)}
        />
        {/* <InputCheckbox
          label="Campaign status"
          id="campaign-status"
          name="status"
          status={checked}
          onChange={(e) => setChecked(!checked)}
        /> */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            setChecked(!checked);
          }}
        >
          `Status {checked}`
        </Button>
        <Input
          label="Radius"
          type="number"
          id="campaign-radius"
          name="radius"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />

        <Button onClick={submitHandler} type="button">
          Add campaign
        </Button>
      </form>
    </>
  );
};

export default UpdateCampaign;
