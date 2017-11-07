/**
 * @file PubComps.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Font from 'font';
import { Row, Col, Button, Icon } from 'antd';
import { addComponent } from '../../pages/editor/App';
import './pubComps.scss';

class PubComps extends PureComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="ec-editor-pub-comps ec-editor-layout-fixed">
                <div className="ec-editor-layout-fixed-title">通用组件</div>
                <Row className="ec-editor-layout-fixed-main">
                    <Col span={12}>
                        <div
                            data-name="layer"
                            onClick={addComponent}
                            className="ec-editor-pub-comps-items"
                        >
                            <Font type="layers" />
                            <br />
                            <span>布局</span>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div
                            data-name="fix"
                            onClick={addComponent}
                            className="ec-editor-pub-comps-items"
                        >
                            <Font type="ribbon" />
                            <br />
                            <span>悬停</span>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div
                            data-name="tabs"
                            onClick={addComponent}
                            className="ec-editor-pub-comps-items"
                        >
                            <Font type="grid" />
                            <br />
                            <span>Tab</span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PubComps;
