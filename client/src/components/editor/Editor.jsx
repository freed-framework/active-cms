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
import PlaceHolder from '../placeholder';
import './editor.scss';

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
        const { match, data, outerEl } = this.props;
        const { params } = match;

        return (
            <div>
                {
                    data.length === 0
                    ? <PlaceHolder
                        name="请添加内容"
                        iconType="def"
                    />
                    : <Render
                        data={data}
                        pageType={params.type}
                        outerEl={outerEl}
                        isEdit
                    />
                }
            </div>

        );
    }
}

export default withRouter(Editor);
