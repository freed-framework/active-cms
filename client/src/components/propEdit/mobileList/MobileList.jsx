import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select, Modal } from 'antd';
import * as FileUpload from 'react-fileupload';
import defaultStyleHoc from '../../../common/hoc/defaultStyleHoc';
import utils from '../../../../components/util/util';
import module from '../../../common/module';
import { editComponentByGuid } from '../../../pages/editor/App';

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
        }

        this.arr = utils.childNodes2Array(props.children) || [];
    }

    /**
     * 修改输入框的值
     * @param event
     */
    handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        if (name === 'cols') {
            this.changeValue(
                ['componentProps', 'cols'],
                'cols',
                value
            );
        }

        if (name === 'childPadding') {
            this.changeValue(
                ['componentProps', 'extendsProps', 'style', 'layout','padding'],
                'padding',
                value
            );
        }

        if (name === 'childHeight') {
            this.changeValue(
                ['componentProps', 'extendsProps', 'style', 'layout','height'],
                'height',
                value
            );
        }
    }

    /**
     * 修改数据
     * @param keys 要修改的外部数据的位置
     * @param k 当前 state 的key
     * @param value 数据值
     */
    changeValue(keys, k, value) {
        this.setState({
            [k]: value,
        });

        editComponentByGuid(
            this.props.guid,
            keys,
            value,
        );
    }

    uploadSuccess = (res) => {
        const data = createImgData(res.data);

        this.changeData(this.arr.concat(data));
    }

    changeData(data) {
        this.arr = data;

        editComponentByGuid(
            this.props.guid,
            ['children'],
            data,
        );
    }

    showConfirm = () => {
        Modal.confirm({
            title: 'Are you sure delete All Image?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.changeData([]);
            },
        });
    }

    render() {
        const { guid } = this.props;

        /*set properties*/
        const options = {
            baseUrl: 'http://172.30.40.16:3000/api/image',
            multiple: true,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'file',
            uploadSuccess: this.uploadSuccess
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
                            name="cols"
                            onChange={this.handleChange}
                            value={this.state.cols}
                        />
                    </p>
                    <p>
                        <label htmlFor="">图片内边距</label>
                        <input
                            type="text"
                            data-guid={guid}
                            name="childPadding"
                            onChange={this.handleChange}
                            value={this.state.padding}
                        />
                    </p>
                    <p>
                        <label htmlFor="">图片高度</label>
                        <input
                            type="text"
                            data-guid={guid}
                            name="childHeight"
                            onChange={this.handleChange}
                            value={this.state.height}
                        />
                    </p>
                    <p>
                        <button
                            onClick={this.showConfirm}
                        >
                            删除所有图片
                        </button>
                        <FileUpload options={options}>
                            <button ref='chooseAndUpload'>chooseAndUpload</button>
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
