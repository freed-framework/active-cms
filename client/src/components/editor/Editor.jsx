/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent, dangerouslySetInnerHTML } from 'react';
import Immutable from 'immutable';
import { Upload, Modal, Icon, Button } from 'antd';
import * as FileUpload from 'react-fileupload';
import Wrap from './Wrap';
import Panel from '../panel';
import Components from '../../common/Components';

import './editor.scss';

const getChildNodes = (data) => {

}

class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            // activeId: props.activeId,

            data: props.data,

            tileData: props.tileData,

            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })



    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(nextProps.tileData, this.props.tileData)) {
            this.setState({
                tileData: nextProps.tileData,
            });
        }

        if (!Immutable.is(nextProps.data, this.props.data)) {
            this.setState({
                data: nextProps.data,
            });
        }

        /**
         * 通过点击 edit 按钮，传递的 id
         */
        // if (nextProps.activeId !== this.props.activeId) {
        //     this.setState({
        //         activeId: nextProps.activeId,
        //     });
        // }
    }

    /**
     * 原始数据
     * @param data
     */
    // loopRender(data) {
    //     const tileData = this.state.tileData;
    //
    //     return data.map(item => {
    //         // 获取App 组件
    //         const d = tileData[item.guid];
    //         const App = d.App;
    //
    //         // 获取样式
    //         let props = {
    //             style: item.style,
    //             attrs: item.attrs,
    //             guid: item.guid,
    //         };
    //
    //         // 如果存在需要组件转换情况
    //         let transData = {};
    //         if (item.dataTrans) {
    //             transData = {
    //                 ...App.dataTrans(item.dataTrans)
    //             };
    //         }
    //
    //         return (
    //             <App
    //                 id={item.guid}
    //                 key={item.guid}
    //                 // 模块名
    //                 module={item.name}
    //                 {...props}
    //                 {...transData.props}
    //             >
    //                 {/* 通过数据转换生成的组件的子组件 */}
    //                 {transData.childNodes}
    //
    //                 {/* data 数据关系下的父子组件 */}
    //                 {item.children && this.loopRender(item.children)}
    //             </App>
    //         );
    //     });
    // }

    render(){
        /*set properties*/
        const options = {
            baseUrl: 'http://172.30.40.16:3000/api/image',
            multiple: true,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            param: {
                fid: 0
            },
            uploadSuccess: (props) => {
                console.log(props)
            }
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <div>
                <FileUpload options={options}>
                    <button ref='chooseAndUpload'>chooseAndUpload</button>
                </FileUpload>
                <Components data={this.props.data} />
            </div>
        );
    }
}

export default Editor;
