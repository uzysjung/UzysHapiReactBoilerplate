/**
 * Created by uzysjung on 2016. 10. 20..
 */
import React, { PropTypes } from 'react';
import './PageHeader.css';



const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
};

function PageHeader({ title, description, children }) {
    return (
        <section className="contentHeader">
            <h1>
                {title}{' '}<small>{description}</small>
            </h1>
            {children}
        </section>
    );
}

PageHeader.propTypes = propTypes;

export default PageHeader;
