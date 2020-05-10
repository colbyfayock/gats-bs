import React from 'react';

import logo from 'assets/images/gats-bs-logo.png';

const Header = () => {
  return (
    <span className="logo">
      <img src={logo} alt="Logo" />
      Gats B's
    </span>
  );
};

export default Header;
