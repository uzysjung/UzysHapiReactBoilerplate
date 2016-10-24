import React ,{ Component, PropTypes }from 'react';


import Header from './Header';
import Footer from './Footer';

const propTypes = {
  children: PropTypes.node
};
export default function Layout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );

};
Layout.propTypes = propTypes;

