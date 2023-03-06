import React, { useReducer } from "react";

import CampaignContext from "./CampaignsContext";

const defaultCampaing = {
  allCampaigns: [
    {
      name: "Bueaty Campaign",
      bid: 737,
      town: "New York",
      status: true,
      id: 0,
    },
  ],
  companyFunds: 10000,
};

const campaignReducer = (state, action) => {
  if (action.type === "REMOVE") {
    const updatedCampaigns = state.allCampaigns.filter(
      (item) => item.id !== action.id
    );

    return { allCampaigns: updatedCampaigns };
  } else if (action.type === "ADD") {
    console.log("ADD: ", action.campaign);
    const updatedCampaigns = state.allCampaigns.concat(action.data);

    return { allCampaigns: updatedCampaigns };
  } else if (action.type === "EDIT") {
    const itemIndex = state.allCampaigns.findIndex((el) => el.id === action.id);
    const updatingItem = state.allCampaigns[itemIndex];

    return { allCampaigns: state.allCampaigns };
  }
};
const CampaignProvider = (props) => {
  const [campaignState, dispatchCampaignAction] = useReducer(
    campaignReducer,
    defaultCampaing
  );

  const removeCampaignHandler = (id) => {
    dispatchCampaignAction({ type: "REMOVE", id: id });
  };

  const addCampaignHandler = (campaign) => {
    dispatchCampaignAction({ type: "ADD", data: campaign });
  };

  const editCampaignHandler = (id) => {
    dispatchCampaignAction({ type: "EDIT", id: id });
  };

  const campaignContext = {
    allCampaigns: campaignState.allCampaigns,
    onDelete: removeCampaignHandler,
    onEdit: editCampaignHandler,
    addCampaign: addCampaignHandler,
  };

  return (
    <CampaignContext.Provider value={campaignContext}>
      {props.children}
    </CampaignContext.Provider>
  );
};

export default CampaignProvider;
