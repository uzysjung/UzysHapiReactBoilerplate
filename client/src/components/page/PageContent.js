/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { PropTypes } from 'react';

const propTypes = {
    children: PropTypes.node,
};

function PageContent({ children }) {
    return (
        <section className="content">
            {children}
        </section>
    );
}

PageContent.propTypes = propTypes;

export default PageContent;
