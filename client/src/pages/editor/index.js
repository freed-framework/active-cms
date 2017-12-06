/**
 * @file index.js
 * @author denglingbo
 *
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { getPage } from '../../services';
import App from './App';
import { calc, resizeEvt } from '../../common/mobileMock';

class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;

        if (params.type === 'mobile') {
            calc(750);
            window.addEventListener(resizeEvt, calc, false);
        }

        if (params.id) {
            getPage(params.id)
                .then((res) => {
                    const { data } = res;
                    document.title = data.title;

                    this.setState({
                        data: data.content,
                        pageData: data
                    })
                })
        }

        if (this.props.isMock) {
            this.setState({
                data: [
                    {
                        "guid": "ec-module-addbed91-6089-4d04-8224-4fc09138f71d",
                        "name": "mobile/layer",
                        "displayName": "哈哈哈",
                        "children": [
                            {
                                "guid": "ec-module-1bcbcd12-aeb2-450d-83be-83a2bb4c2b02",
                                "name": "mobile/img",
                                "componentProps": {
                                    "src": "http://xcscapp.yatang.com.cn/images/beijing/beijing_03.jpg"
                                }
                            }
                        ],
                        "componentProps": {
                            "style": {
                                "layout": {
                                    "padding": "10",
                                    // "height": "800",
                                }
                            }
                        }
                    },
                    {
                        "guid": "ec-module-a40cabe9-20f5-4354-a973-390679b86191",
                        "name": "mobile/list",
                        "children": [
                            {
                                "guid": "ec-module-ce995704-f115-4a9f-b124-92d2c6f8e000",
                                "name": "mobile/img",
                                "componentProps": {
                                    "src": "http://xcscapp.yatang.com.cn/images/beijing/beijing_05.jpg",
                                    "url": "baidu.com"
                                }
                            },
                            {
                                "guid": "ec-module-77d41d96-4112-421d-99e6-931549b9b1ca",
                                "name": "mobile/img",
                                "componentProps": {
                                    "src": "http://xcscapp.yatang.com.cn/images/beijing/beijing_05.jpg"
                                }
                            }
                        ],
                        "componentProps": {
                            "cols": 2,
                            "style": {
                                "layout": {
                                    "padding": "10",
                                    "backgroundColor": "rgba(106, 94, 170, 1)"
                                }
                            },
                            "extendsProps": {
                                "style": {
                                    "layout": {
                                        "padding": "10"
                                    }
                                }
                            }
                        }
                    }
                ],
            })
        }
    }

    componentWillUnmount() {
        const { match = {} } = this.props;
        const { params = {} } = match;

        if (params.type === 'mobile') {
            window.removeEventListener(resizeEvt, calc, false);
        }
    }

    render() {
        const { data, pageData } = this.state;

        return (
            <App
                data={data}
                pageData={pageData}
            />
        )
    }
}

export default withRouter(Editor);
