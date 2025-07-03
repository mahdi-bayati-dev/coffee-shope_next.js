import React from "react";

const MoreInfoes = ({product}) => {
  return (
    <div>
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>وزن</p>
          <p>{product.weight} گرم</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>مناسب برای:</p>
          <p>{product.SuitableFor}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
