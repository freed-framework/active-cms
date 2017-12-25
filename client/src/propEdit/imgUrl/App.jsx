/**
 * @file Link.jsx
 * @author denglingbo
 *
 * 图片配置
 */
import React, { PureComponent } from 'react';
import * as FileUpload from 'react-fileupload';
import { editComponentByGuid } from '../../pages/editor/App';
import { getToken } from '../../utils';
import Link from '../link';

class ImgUrl extends PureComponent {
    constructor(props) {
        super(props);
        const { componentProps } = props;

        this.state = {
            // 图片地址
            src: componentProps.src,

            // 跳转地址
            url: componentProps.url,

            // 跳转地址的前缀
            before: '',
        }
    }

    handleKeyUp = (event) => {
        if (event.keyCode !== 13) return false;
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;

        this.setState({
            [attr]: value,
        });

        editComponentByGuid(
            this.props.guid,
            ['componentProps', attr],
            value
        );
    }

    render() {
        const { guid, componentProps = {} } = this.props;

        /*set properties*/
        const options = {
            baseUrl: `${config.domain}/api/image`,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'file',
            requestHeaders: {
                Authorization: getToken()
            },
            uploadSuccess: (props) => {
                const { data } = props;
                const url = `${data[0].imageDomain}/${data[0].suffixUrl}`;

                this.setState({
                    src: url,
                });

                editComponentByGuid(
                    guid,
                    ['componentProps', 'src'],
                    url
                );
            }
        }

        return (
            <div className="ec-editor-basic-props ec-editor-basic-props-attr ec-editor-basic-props-img">
                <p>
                    <label htmlFor="">图片地址</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-attr="src"
                        onKeyUp={this.handleKeyUp}
                        value={this.state.src}
                    />
                    <FileUpload options={options}>
                        <button ref="chooseAndUpload">上传图片</button>
                    </FileUpload>
                </p>

                {/* 跳转 */}
                <Link
                    {...this.props}
                />
            </div>
        )
    }
}

ImgUrl.defaultProps = {
    style: {},
    componentProps: {
        src: '',
        url: '',
    }
}

export default ImgUrl;
