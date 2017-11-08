import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import * as FileUpload from 'react-fileupload';
import { editComponent, editComponentByType } from '../../../pages/editor/App';

class ImgUrl extends PureComponent {
    constructor(props) {
        super(props);
        const { target, attrs } = props;

        this.state = {
            [target]: attrs[target]
        }
    }

    handleChange = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');
        const {target} = this.props;

        this.setState({
            [target]: event.currentTarget.value,
        });

        editComponent(event, 'attr');
    }

    render() {
        const { target, guid, label } = this.props;

        /*set properties*/
        const options = {
            baseUrl: 'http://172.30.40.16:3000/api/image',
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'files',
            uploadSuccess: (props) => {
                const { target, guid, attr } = this.props;
                const { data } = props;
                const url = `${data[0].imageDomain}/${data[0].suffixUrl}`;
                this.setState({
                    [target]: url
                })

                editComponentByType({guid, attr, target, value: url}, 'attr');
            },
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
                        value={this.state[target]}
                    />
                    <FileUpload options={options}>
                        <button ref='chooseAndUpload'>chooseAndUpload</button>
                    </FileUpload>
                </div>
            </div>
        )
    }
}

ImgUrl.defaultProps = {
    style: {},
}

export default ImgUrl;
