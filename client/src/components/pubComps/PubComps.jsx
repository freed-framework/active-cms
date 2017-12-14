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
import classNames from 'classnames';
import { addComponent } from '../../pages/editor/App';
import './pubComps.scss';
import piclist2 from '../../images/icon-svg/piclist2.svg';

class PubComps extends PureComponent {
    constructor() {
        super();

        this.state = {
            lib: null,
            keys: [],
            y: 0,
            leave: true,
        }
    }

    componentDidMount() {
        const { match } = this.props;

        import(`../../../components/${match.params.type}/index`)
            .then(mod => {
                const keys = [];

                Object.keys(mod).forEach(k => {
                    keys.push(k);
                });

                this.setState({
                    lib: mod,
                    keys,
                })
            });

        const el = this.logo;
        this.rect = el.getBoundingClientRect();

    }

    handleMove = (event) => {
        const y = event.pageY;

        this.setState({
            y: y - (this.rect.height + this.rect.top),
            leave: false,
        });
    }

    handleLeave = () => {
        this.setState({
            y: 0,
            leave: true,
        });
    }

    render() {
        const { match } = this.props;
        const { lib, keys, y, leave } = this.state;
        const type = match.params.type;

        return (
            <div className="ec-editor-pub-comps ec-editor-layout-fixed">
                <div
                    className="ec-editor-layout-fixed-title"
                    onMouseMove={this.handleMove}
                    onMouseLeave={this.handleLeave}
                >
                    <span
                        ref={ref => { this.logo = ref }}
                        className={classNames('ec-editor-logo', {
                            'ec-editor-logo-leave': leave,
                        })}
                        style={{
                            transform: `translateY(${y}px)`,
                        }}
                    />
                </div>
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
                                        data-guide={`${conf.dataTable ? JSON.stringify(conf.dataTable['data-guide']) : ''}`}
                                        className={classNames("ec-editor-pub-comps-items", conf.className)}
                                    >

                                        {conf.iconType.indexOf('.svg') > -1 ? <img src={piclist2}/>: <Font type={conf.iconType} />}
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
