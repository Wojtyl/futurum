import React, { useState } from "react";
import Information from "./Information";

import { useNavigate } from "react-router-dom";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";

import classes from "./CampaignCard.module.css";
import axios from "axios";

const CampaignCard = (props) => {
  const data = { ...props.data };
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const campaignHandler = (campaign) => {
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("keywords", data.keywords);
    localStorage.setItem("bid", data.bid);
    localStorage.setItem("town", data.town);
    localStorage.setItem("fund", data.fund);
    localStorage.setItem("status", data.status);
    localStorage.setItem("radius", data.radius);
    nav("/update");
  };

  const deleteHandler = () => {
    setLoading(true);
    axios
      .delete(
        `https://6401dcb30a2a1afebef3c3de.mockapi.io/FuturumProject/${data.id}`
      )
      .then(() => {
        props.onRemove();
      });

    props.onRemove();
  };

  return (
    <div
      id={data.id}
      className={`${classes["campaign-card"]} ${
        data.status ? classes["active-card"] : classes["inactive-card"]
      }`}
    >
      <div className={classes["card-header"]}>{data.name}</div>
      <div className={classes["card-content"]}>
        <div className={classes["card-information"]}>
          <Information title="Town" description={data.town} />
          <Information title="Radius" description={`${data.radius} km`} />
          <Information title="Bid" description={`${data.bid} $`} />
          <Information title="Cost" description={`${data.fund} $`} />
          <Information title="Keywords" description={data.keywords} />
          <Information
            title="Status"
            description={data.status === true ? "Active" : "Not Active"}
          />
        </div>
        <div className={classes["manage-buttons"]}>
          <BsFillPencilFill
            className={classes.icon}
            onClick={campaignHandler.bind(null, data)}
          />
          {!loading && (
            <BsFillTrashFill className={classes.icon} onClick={deleteHandler} />
          )}
          {loading && (
            <BiLoader className={`${classes.icon} ${classes.load}`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
