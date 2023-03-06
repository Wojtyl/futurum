import React from "react";

import FormCampaign from "../Forms/Form";
import classes from "./ReadCampaigns.module.css";

const UpdateCampaign = () => {
  const campaignData = {
    status: localStorage.getItem("status"),
    name: localStorage.getItem("name"),
    keywords: localStorage.getItem("keywords"),
    bid: localStorage.getItem("bid"),
    town: localStorage.getItem("town"),
    fund: localStorage.getItem("fund"),
    radius: localStorage.getItem("radius"),
    id: localStorage.getItem("id"),
  };

  if (window.localStorage.length === 0) {
    return (
      <p className={classes["section-title"]}>
        No data! Back to main page and correctly click on edit button!
      </p>
    );
  }

  return <FormCampaign data={campaignData} type="Update" />;
};

export default UpdateCampaign;
