import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <React.Fragment>
    <Helmet>
      <title>Fuzzy Foodie Search</title>
      <meta name="description" content="A tasty search app" />
      <link
        rel="canonical"
        href="https://fuzzy-search-input.netlify.app
"
      />
    </Helmet>
    <div>
      <main>{children}</main>
    </div>
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
