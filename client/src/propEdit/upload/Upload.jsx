import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as FileUpload from 'react-fileupload';
import { getToken } from '../../utils';

class Upload extends Component {
    static propTypes = {

    }

    render() {
        /*set properties*/
        const options = {
            baseUrl: `${config.api}/commonUploadFile/uploadImageFiles`,
            multiple: true,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            requestHeaders: {
                Authorization: getToken()
            },
            param: {
                fid: 0
            },
            uploadSuccess: (props) => {
                console.log(props)
            },
            uploadFail: (resp) => {
                console.log(resp)
            }
        }

        return (
            <div>
                <FileUpload options={options}>
                    <button ref='chooseAndUpload'>chooseAndUpload</button>
                </FileUpload>
            </div>
        )
    }
}

export default Upload;
