import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Affix, Button } from 'antd';

export default class HanleMenu extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Affix
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    zIndex: 99
                }}
            >
                <div className="ec-edit-handle-menu">
                    <div className="ec-edit-handle-menu-item ec-edit-handle-menu-item1">1</div>
                    <div className="ec-edit-handle-menu-item ec-edit-handle-menu-item2">2</div>
                    {/* <div className="ec-edit-handle-menu-item ec-edit-handle-menu-item3">3</div> */}
                    <div className="ec-edit-handle-menu-item ec-edit-handle-menu-item4">4</div>
                </div>
            </Affix>
        )
    }
}
