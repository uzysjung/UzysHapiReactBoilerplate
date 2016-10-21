/**
 * Created by uzysjung on 2016. 10. 20..
 * Presentational Footer Component
 */

import React from 'react'
import Pkg from '../../../../package.json'
import Radium from 'radium'
const style = {
    background: '#fff',
    padding: '15px',
    color: '#444',
    borderTop: '1px solid #d2d6de'
};

const Footer = function() {
    return (
        <footer style={style}>
            <div className="pull-right hidden-xs">
                <b>Version</b> {Pkg.version}
            </div>
            <strong>
                <span>Copyright &copy; 2016 </span>
                <a href="https://github.com/uzysjung">Uzysjung</a>.
            </strong> All rights reserved.
        </footer>
    );
};

export default Radium(Footer);

