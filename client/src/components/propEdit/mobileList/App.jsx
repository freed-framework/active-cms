import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import * as FileUpload from 'react-fileupload';
import utils from '../../../../components/util/util';
import { editComponent, editComponentByType } from '../../../pages/editor/App';

function flat(childs) {
    const result = {
        list: [],
        col: 2
    };
    for (let i = 0; i < childs.length; i++) {
        result.col = childs[i].children.length || 0;
        result.list.concat(childs[i].children);
    }
    return result;
}

function getChild(newData, col) {
    const result = [];
    const len = Math.ceil(newData.length / col);
    const item = {
        name: 'list/col',
    }

    for (let i = 0; i < len; i++) {
        const childs = newData.slice(i * col, (i + 1) * col);
        result.push({...item, children: childs, guid: `ec-module-${utils.guid()}` })
    }

    return result;
}

function parseData(data) {
    const result = [];
    const item = {
        name: 'img',
        children: []
    }

    for (let i = 0; i < data.length; i++) {
        result.push({...item, guid: `ec-module-${utils.guid()}`, attrs: {src: `${data[i].imageDomain}/${data[i].suffixUrl}`}})
    }

    return result;
}

class MobileList extends PureComponent {
    constructor(props) {
        super(props);
        const { target, attrs, childs } = props;
        const initData = flat(childs);
        this.state = {
            col: initData.col,
            data: initData.list
        }
    }

    handleChange = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');
        const { target, guid } = this.props;
        const { data } = this.state;
        const col = event.currentTarget.value;

        this.setState({
            col
        });

        const childData = getChild(data, col);

        editComponentByType({guid, attr, target, value: childData}, 'children');
    }

    uploadSuccess = (res) => {
        const { target, guid, attr } = this.props;
        const { data } = res;
        const { col } = this.state;
        const newData = parseData(data);
        const childData = getChild(newData, col);

        this.setState({
            data: childData,
        });


        editComponentByType({guid, attr, target, value: childData}, 'children');
    }

    render() {
        const { target, guid, label } = this.props;

        /*set properties*/
        const options = {
            baseUrl: 'http://172.30.40.16:3000/api/image',
            multiple: true,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'files',
            uploadSuccess: this.uploadSuccess
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/

        return (
            <div>
                <div className="ec-editor-basic-props ec-editor-basic-props-attr">
                    <label htmlFor="">{label}</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        onChange={this.handleChange}
                        value={this.state.col}
                    />
                    <FileUpload options={options}>
                        <button ref='chooseAndUpload'>chooseAndUpload</button>
                    </FileUpload>
                </div>
            </div>
        )
    }
}

MobileList.defaultProps = {
    style: {},
}

export default MobileList;
