import React, { useState } from "react";

const CampaignContext = React.createContext({
  allCampaigns: [
    {
      name: "Bueaty Campaign",
      bid: 737,
      town: "New York",
      status: true,
      id: 0,
    },
  ],
  onDelete: () => {},
  onEdit: () => {},
  addCampaign: () => {},
});

export default CampaignContext;
