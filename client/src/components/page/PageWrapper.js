/**
 * Created by uzysjung on 2016. 10. 20..
 */
import React, { PropTypes } from 'react'
import Radium from 'radium'
const propTypes = {
    children: PropTypes.node,
};

const style = {
    minHeight: '100%',
    backgroundColor: '#fafafa',
    zIndex: 800
};

const pageWrapper = function ( { children } ) {
    return (
        <div style={style}>
            { children }
        </div>
    );
}

pageWrapper.propTypes = propTypes;

export default Radium(pageWrapper);