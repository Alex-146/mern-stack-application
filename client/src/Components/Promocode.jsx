
import React from "react";

function Promocode(props) {

  const { id, value, owner, date } = props;

  return (
    <div>
      <p>{id}</p>
      <p>{value}</p>
      <p>{owner}</p>
      <p>{date}</p>
    </div>
  );
}

export default Promocode;
