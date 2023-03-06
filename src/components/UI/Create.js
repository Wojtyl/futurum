import React from "react";
import FormCampaign from "../Forms/Form";

const Create = (props) => {
  return (
    <FormCampaign
      data={{
        status: false,
        name: "",
        keywords: "",
        bid: null,
        town: "",
        fund: null,
        radius: null,
      }}
      type="Create"
      onCreate={props.onCreate}
    />
  );
};

export default Create;
