import React from "react";
import List from "./List";

const InputList = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        list={props.list}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
        type="list"
      />
      <List
        data={[
          "Krakow",
          "Warszawa",
          "Katowice",
          "Gdansk",
          "Lublin",
          "Tarnow",
          "Wroclaw",
          "Lodz",
        ]}
        id={props.list}
      />
    </React.Fragment>
  );
};

export default InputList;
