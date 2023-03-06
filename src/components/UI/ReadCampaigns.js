import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <React.Fragment>
      <p className={classes["section-title"]}>My Campaigns</p>
      <div className={classes["section-container"]}>
        {isLoading && <BiLoader className={classes.loader} />}
        <Link to="/create">
          <Button type="button">Add Campaign</Button>
        </Link>
        {!isLoading && !anyCampaign && (
          <p className={classes["section-description"]}>
            No campaigns found. Create one.
          </p>
        )}
        {!isLoading &&
          anyCampaign &&
          fetchedCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              data={campaign}
              onRemove={removeHandler}
            ></CampaignCard>
          ))}
      </div>
    </React.Fragment>
  );
};

export default ReadCampaigns;
