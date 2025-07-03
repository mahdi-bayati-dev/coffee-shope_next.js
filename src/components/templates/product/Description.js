import React from "react";

const Description = ({ product }) => {
  return (
    <div>
      <p>توضیحات :</p>
      <hr />
      <h3>{product.name}</h3>
      <p>( South and Central America and Africa ( 100% ARABICA</p>
      <p>( NESPRESSO COMPATIBLE COFFEE CAPSULE ( GOLD</p>
      <p>{product.shortDiscretion}</p>
      <p>{product.longDiscretion}</p>
    </div>
  );
};

export default Description;
