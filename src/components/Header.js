import React from 'react';
import { Link } from 'gatsby';
import { FaGithub, FaTwitter } from 'react-icons/fa';

import Container from 'components/Container';

import logo from 'assets/images/gats-bs-logo.png';

const Header = () => {
  return (
    <header className="header">
      <Container type="content">
        <p className="header-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
            Gats B's
          </Link>
        </p>
        <ul className="header-links">
          <li>
            <a href="http://github.com/colbyfayock/gats-bs">
              <span className="visually-hide">View on Github</span>
              <FaGithub />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/colbyfayock">
              <span className="visually-hide">View on Twitter</span>
              <FaTwitter />
            </a>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
