import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import Button from "../Buttons/Button";
import CampaignCard from "../Cards/CampaignCard";

import classes from "./ReadCampaigns.module.css";

const ReadCampaigns = (props) => {
  const [fetchedCampaigns, setFetchedCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    axios
      .get("https://6401dcb30a2a1afebef3c3de.mockapi.io/FuturumProject")
      .then((response) => {
        setIsLoading(false);
        setFetchedCampaigns(response.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const removeHandler = () => {
    getData();
  };

  const anyCampaign = fetchedCampaigns.length !== 0;

  return (
    <div className={classes["section-container"]}>
      <p className="section-title">My Campaigns</p>
      {isLoading && <BiLoader className={classes.loader} />}
      {!isLoading && !anyCampaign && <p>No campaigns found. Create one.</p>}
      {!isLoading &&
        anyCampaign &&
        fetchedCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            data={campaign}
            onRemove={removeHandler}
          ></CampaignCard>
        ))}
      <Link to="/create">
        <Button type="button">Add Campaign</Button>
      </Link>
    </div>
  );
};

export default ReadCampaigns;