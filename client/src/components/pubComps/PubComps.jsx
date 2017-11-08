/**
 * @file PubComps.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Font from 'font';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Icon } from 'antd';
import { addComponent } from '../../pages/editor/App';
import './pubComps.scss';

class PubComps extends PureComponent {
    constructor() {
        super();

        this.state = {
            comps: [],
        }
    }

    componentDidMount() {
        const { match } = this.props;
        import(`../../../components/${match.params.type}/index`)
            .then(mod => {
                const arr = [];

                // Object.keys(mod).forEach(k => {
                //     const Component = mod[k];
                //
                //     console.log(mod[k].default)
                // })

                // console.log(mod);
            })

    }

    render() {
        const { match } = this.props;
        const type = match.params.type;

        return (
            <div className="ec-editor-pub-comps ec-editor-layout-fixed">
                <div className="ec-editor-layout-fixed-title">通用组件</div>
                <Row className="ec-editor-layout-fixed-main">
                    <Col span={12}>
                        <div
                            data-name={`${type}/layer`}
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
                            data-name={`${type}/fix`}
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
                            data-name={`${type}/tabs`}
                            onClick={addComponent}
                            className="ec-editor-pub-comps-items"
                        >
                            <Font type="grid" />
                            <br />
                            <span>Tab</span>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div
                            data-name={`${type}/list`}
                            onClick={addComponent}
                            className="ec-editor-pub-comps-items"
                        >
                            <Font type="grid" />
                            <br />
                            <span>List</span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(PubComps);
