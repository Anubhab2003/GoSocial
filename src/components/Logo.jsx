import React from 'react';


function Logo({ width = '100px', height = '50px' }) {
  return (
    <img
      src="/target.png"
      alt="Company Logo"
      style={{ width }}
    />
  );
}

export default Logo;
