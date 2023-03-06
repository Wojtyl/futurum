import React, { useState, useContext } from "react";
import Button from "../src/components/Buttons/Button";
import CampaignContext from "../src/context/CampaignsContext";
import CampaignForm from "../src/components/Forms/CampaignForm";
import CampaignCard from "../src/components/Cards/CampaignCard";

import styles from "./SectionComponent.module.css";

const Section = () => {
  const ctx = useContext(CampaignContext);

  const [isAddingCampaign, setIsAddingCampaign] = useState(false);

  const click = () => {
    setIsAddingCampaign((prev) => {
      return !prev;
    });
  };

  let status;
  if (ctx.allCampaigns.length === 0) {
    status = <p>No campaigns</p>;
  } else {
    status = ctx.allCampaigns.map((campaign) => (
      <CampaignCard
        key={campaign.id}
        data={campaign}
        onRemove={ctx.onDelete.bind(null, campaign.id)}
        onEdit={ctx.onEdit.bind(null, campaign.id)}
      />
    ));
  }

  return (
    <div className={styles.section}>
      <p>Section</p>
      {!isAddingCampaign && status}
      {!isAddingCampaign && (
        <Button onClick={click} type="button">
          New Campaign
        </Button>
      )}
      {isAddingCampaign && <CampaignForm formState={click} />}
    </div>
  );
};

export default Section;
