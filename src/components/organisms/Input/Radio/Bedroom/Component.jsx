import React from 'react';

const Component = () => {

  const Card = () => {
    let rows = [];
    for (let i = 1; i <= 8 ; i++) {
      rows.push(
        <div key={i} className="sellprops__cardSelect__card">
          <p className="sellprops__cardSelect__orange-txt">{i}</p>
          <p>Kamar Tidur</p>
        </div>
      );
    }
    return rows;
  }

  return (
    <div className="sellprops__cardSelect__wrapper">
      <Card />
    </div>
  );
};

export default Component;