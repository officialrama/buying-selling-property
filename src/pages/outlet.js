import React from 'react';
import { Outlet } from 'react-router-dom';

const OutletIndex = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default OutletIndex;