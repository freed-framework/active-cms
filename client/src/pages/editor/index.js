/**
 * @file index.js
 * @author denglingbo
 *
 */
import React, { Component } from 'react';
import { getPage } from '../../services';
import App from './App';

/**
 * 适用于移动端
 * @type {Element}
 */
const docEl = document.documentElement;
const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
let rate;
const recalc = () => {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    rate = 100 * (750 / 750);
    docEl.style.fontSize = `${rate}px`;
};

class Editor extends Component {
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
            recalc();
            window.addEventListener(resizeEvt, recalc, false);
        }

        if (params.id) {
            getPage(params.id).then((res) => {

                const { data } = res;
                document.title = data.title;

                this.setState({
                    data: data.content,
                })
            })
        } else {
            // this.setState({
            //     data: [
            //         {
            //             "guid": "ec-module-addbed91-6089-4d04-8224-4fc09138f71d",
            //             "name": "mobile/layer",
            //             "displayName": "哈哈哈",
            //             "children": [
            //                 {
            //                     "guid": "ec-module-1bcbcd12-aeb2-450d-83be-83a2bb4c2b02",
            //                     "name": "mobile/img",
            //                     "componentProps": {
            //                         "src": "http://xcscapp.yatang.com.cn/images/beijing/beijing_03.jpg"
            //                     }
            //                 }
            //             ],
            //             "componentProps": {
            //                 "style": {
            //                     "layout": {
            //                         "padding": "10"
            //                     }
            //                 }
            //             }
            //         },
            //         {
            //             "guid": "ec-module-a40cabe9-20f5-4354-a973-390679b86191",
            //             "name": "mobile/list",
            //             "children": [
            //                 {
            //                     "guid": "ec-module-ce995704-f115-4a9f-b124-92d2c6f8e000",
            //                     "name": "mobile/img",
            //                     "componentProps": {
            //                         "src": "http://sit.image.com/group2/M00/00/2B/rB4KPFoEI5WAKGgLAAGdIG6Shk4161.png"
            //                     }
            //                 },
            //                 {
            //                     "guid": "ec-module-77d41d96-4112-421d-99e6-931549b9b1ca",
            //                     "name": "mobile/img",
            //                     "componentProps": {
            //                         "src": "http://sit.image.com/group1/M00/01/86/rB4KPVoEI5WAKwK4AAFKFa1-IG4764.png"
            //                     }
            //                 },
            //                 {
            //                     "guid": "ec-module-31d15a74-f736-4bbc-bd6d-013be5a253df",
            //                     "name": "mobile/img",
            //                     "componentProps": {
            //                         "src": "http://xcscapp.yatang.com.cn/images/beijing/beijing_05.jpg",
            //                         "url": "http://wwww.baidu.com"
            //                     }
            //                 },
            //                 {
            //                     "guid": "ec-module-61de5d61-ddbb-435b-ab8c-29dcec15cdf7",
            //                     "name": "mobile/img",
            //                     "componentProps": {
            //                         "src": "http://sit.image.com/group2/M00/00/2B/rB4KPVoEI5WANPP6AAFLLXPxl1Y065.png"
            //                     }
            //                 }
            //             ],
            //             "componentProps": {
            //                 "cols": 2,
            //                 "style": {
            //                     "layout": {
            //                         "padding": "10",
            //                         "backgroundColor": "rgba(106, 94, 170, 1)"
            //                     }
            //                 },
            //                 "extendsProps": {
            //                     "style": {
            //                         "layout": {
            //                             "padding": "10"
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     ],
            // })
        }
    }

    componentWillUnmount() {
        if (params.type === 'mobile') {
            window.removeEventListener(resizeEvt, recalc, false);
        }
    }

    render() {
        const { data } = this.state;

        return (
            <App
                data={data}
            />
        )
    }
}

export default Editor;
