import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select, Modal } from 'antd';
import * as FileUpload from 'react-fileupload';
import { is } from 'immutable';
import defaultStyleHoc from '../../common/hoc/defaultStyleHoc';
import utils from '../../../components/util/util';
import module from '../../common/module';
import { editComponentByGuid } from '../../pages/editor/App';
import { getToken } from '../../utils';

import { Continue } from '../../components/guide/App';

const Option = Select.Option;

/**
 * 创建默认 img data 数组
 * @param {Array} data
 * @return {Array}
 */
const createImgData = (data = []) => data.map(item => ({
    ...module.create('mobile/img'),
    componentProps: {
        src: `${item.imageDomain}/${item.suffixUrl}`,
    }
}));

@defaultStyleHoc
class MobileList extends PureComponent {
    static defaultProps = {
        componentProps: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            cols: props.componentProps.cols,
            padding: props.componentProps.extendsProps.style.layout.padding,
            height: props.componentProps.extendsProps.style.layout.height,
            arr: utils.childNodes2Array(props.children) || [],
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!is(nextProps.children, this.props.children)) {
            this.setState({
                arr: utils.childNodes2Array(nextProps.children) || [],
            })
        }
    }

    /**
     * 修改输入框的值
     * @param event
     */
    handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        const attr = event.currentTarget.getAttribute('data-attr');

        this.setState({
            [attr]: value,
        });
    }

    handleKeyUp = (event) => {
        if (event.keyCode !== 13) return;

        const attr = event.currentTarget.getAttribute('data-attr');
        let keys = [];

        if (attr === 'cols') {
            keys = ['componentProps', 'cols'];
        } else {
            keys = ['componentProps', 'extendsProps', 'style', 'layout', attr];
        }

        const value = this.state[attr];

        this.changeValue(keys, value);
    }

    /**
     * 修改数据
     * @param keys 要修改的外部数据的位置
     * @param value 数据值
     */
    changeValue(keys, value) {
        editComponentByGuid(
            this.props.guid,
            keys,
            value,
        );
    }

    uploadSuccess = (res) => {
        const data = createImgData(res.data);
        this.changeData(this.state.arr.concat(data));
        Continue();
    }

    uploadFail = () => {
        console.log(this.state.arr);
    }

    changeData(arr) {
        this.setState({
            arr,
        }, () => {
            editComponentByGuid(
                this.props.guid,
                ['children'],
                this.state.arr,
            );
        });
    }

    showConfirm = () => {
        Modal.confirm({
            title: '确认全部删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => this.changeData([]),
        });
    }

    render() {
        const { guid } = this.props;

        /*set properties*/
        const options = {
            baseUrl: `${config.api}/commonUploadFile/uploadImageFiles`,
            multiple: true,
            accept: 'image/*',
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'file',
            uploadSuccess: this.uploadSuccess,
            uploadError: this.uploadFail,
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/

        return (
            <div>
                <div className="ec-editor-basic-props ec-editor-basic-props-attr">
                    <p>
                        <label htmlFor="">列数</label>
                        <input
                            type="text"
                            data-guid={guid}
                            data-attr="cols"
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            value={this.state.cols}
                        />
                    </p>
                    {/* child padding */}
                    <p>
                        <label htmlFor="">图片内边距</label>
                        <input
                            type="text"
                            data-guid={guid}
                            data-attr="padding"
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            value={this.state.padding}
                        />
                    </p>
                    {/* child height */}
                    <p>
                        <label htmlFor="">图片高度</label>
                        <input
                            type="text"
                            data-guid={guid}
                            data-attr="height"
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            value={this.state.height}
                        />
                    </p>
                    <p>
                        <button
                            onClick={this.showConfirm}
                        >
                            <span>删除所有图片</span>
                            <span>({this.state.arr.length})</span>
                        </button>
                        <FileUpload options={options}>
                            <button
                                className="guide-steps-handler"
                                data-guide={'{"step": 2, "tip": "此按钮为批量上传按钮", "nextStep": 3, "stop": true}'}
                                ref='chooseAndUpload'
                            >
                                批量上传图片
                            </button>
                        </FileUpload>
                    </p>
                    <p>

                    </p>
                </div>
            </div>
        )
    }
}

export default MobileList;
