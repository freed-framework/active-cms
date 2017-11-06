import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as FileUpload from 'react-fileupload';

class Upload extends Component {
    static propTypes = {

    }

    render() {
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
