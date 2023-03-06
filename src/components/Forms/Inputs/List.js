import React from "react";

const List = (props) => {
  let key = 0;

  return (
    <datalist id={props.id}>
      {props.data.map((town) => (
        <option value={town} key={key++} />
      ))}
    </datalist>
  );
};

export default List;
