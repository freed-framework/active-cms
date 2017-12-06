/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent, dangerouslySetInnerHTML } from 'react';
import Immutable from 'immutable';
import { Upload, Modal, Icon, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import * as FileUpload from 'react-fileupload';
import Panel from '../panel';
import Render from '../../common/render/Render';

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
        // if (!Immutable.is(nextProps.tileData, this.props.tileData)) {
        //     this.setState({
        //         tileData: nextProps.tileData,
        //     });
        // }

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

    render() {
        const { params } = this.props.match;

        return (
            <div>
                <Render
                    data={this.props.data}
                    pageType={params.type}
                    isEdit={true}
                />
            </div>
        );
    }
}

export default withRouter(Editor);
