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
            lib: null,
            keys: [],
        }
    }

    componentDidMount() {
        const { match } = this.props;
        import(`../../../components/${match.params.type}/index`)
            .then(mod => {
                const keys = [];

                Object.keys(mod).forEach(k => {
                    keys.push(k);
                    console.log(k)
                });

                this.setState({
                    lib: mod,
                    keys,
                })
            })

    }

    render() {
        const { match } = this.props;
        const { lib, keys } = this.state;
        const type = match.params.type;

        return (
            <div className="ec-editor-pub-comps ec-editor-layout-fixed">
                {/* <div className="ec-editor-layout-fixed-title">通用组件</div> */}
                <Row className="ec-editor-layout-fixed-main">
                    {keys.map((k, index) => {
                        const conf = lib[k].config;

                        if (conf && conf.isCommon) {
                            return (
                                <Col
                                    span={24}
                                    key={index}
                                >
                                    <div
                                        data-name={conf.name}
                                        onClick={addComponent}
                                        className="ec-editor-pub-comps-items"
                                    >
                                        <Font type={conf.iconType} />
                                        <span>{conf.displayName}</span>
                                    </div>
                                </Col>
                            );
                        }

                        return null;
                    })}
                </Row>
            </div>
        )
    }
}

export default withRouter(PubComps);
