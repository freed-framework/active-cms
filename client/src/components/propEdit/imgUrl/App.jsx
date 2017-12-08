import React, { PureComponent } from 'react';
import * as FileUpload from 'react-fileupload';
import { editComponentByGuid } from '../../../pages/editor/App';
import ENV from '../../../../../conf/env';

class ImgUrl extends PureComponent {
    constructor(props) {
        super(props);
        const { componentProps } = props;

        this.state = {
            // 图片地址
            src: componentProps.src,

            // 跳转地址
            url: componentProps.url,
        }
    }

    // handleChange = (event) => {
    //     const attr = event.currentTarget.getAttribute('data-attr');
    //     const value = event.currentTarget.value;

    //     this.setState({
    //         [attr]: value,
    //     });

    //     editComponentByGuid(
    //         this.props.guid,
    //         ['componentProps', attr],
    //         value
    //     );
    // }

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
        const { guid } = this.props;

        /*set properties*/
        const options = {
            baseUrl: `${ENV.domain}/api/image`,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'file',
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
            <div>
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
                    <p>
                        <label htmlFor="">跳转</label>
                        <input
                            type="text"
                            data-guid={guid}
                            data-attr="url"
                            onKeyUp={this.handleKeyUp}
                            value={this.state.url}
                        />
                    </p>
                </div>
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
