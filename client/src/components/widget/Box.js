/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';
import './Box.css'

const propTypes = {
    title: PropTypes.string,
    status: PropTypes.string,
    solid: PropTypes.bool,
    expandable: PropTypes.bool,
    removable: PropTypes.bool,
    collapsed: PropTypes.bool,
    loading: PropTypes.bool,
    children: PropTypes.node,
    customButton : PropTypes.func
};

const defaultProps = {
    status: 'default',
    solid: false,
    expandable: false,
    removable: false,
    collapsed: false,
    loading: false,
    customButton : null
};

class Box extends Component {
    getClasses() {
        return classNames(
            'box',
            `box-${this.props.status}`,
            { 'box-solid': this.props.solid },
            { 'collapsed-box': this.state.collapsed },
            {  'removed-box' : this.state.removed}
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            collapsed : false,
            removed : false
        }
    }
    renderExpandButton() {
        if (this.props.expandable) {
            return (
                <button
                    type="button"
                    className="btn btn-box-tool"
                    data-widget="collapse"
                    onClick={()=>{this.setState({collapsed:!this.state.collapsed})}}
                >
                    {this.props.collapsed
                        ? <i className="fa fa-plus" />
                        : <i className="fa fa-minus" />
                    }
                </button>
            );
        }
        return '';
    }

    renderRemoveButton() {
        if (this.props.removable) {
            return (
                <button
                    type="button"
                    className="btn btn-box-tool"
                    data-widget="remove"
                    onClick={()=>{this.setState({removed:!this.state.removed})}}
                >
                    <i className="fa fa-times" />
                </button>
            );
        }
        return '';
    }
    renderButtons() {
        if(this.props.customButton) {
            return (
                <div className="box-tools pull-right">
                    {this.props.customButton()}
                </div>
            );
        } else {
            return (
                <div className="box-tools pull-right">
                    {this.renderExpandButton()}
                    {this.renderRemoveButton()}
                </div>
            );
        }


    }
    renderLoading() {
        if (this.props.loading) {
            return (
                <div className="overlay">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                </div>
            );
        }
        return '';
    }

    render() {
        return (
            <div id='boxContainer' className={this.getClasses()}>
                <div className="box-header with-border">
                    <h3 className="box-title">{this.props.title}</h3>
                    {this.renderButtons()}
                </div>
                <div className="box-body">
                    {this.props.children}
                </div>
                {this.renderLoading()}
            </div>
        );
    }

}

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
