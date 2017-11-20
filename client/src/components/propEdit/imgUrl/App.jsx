import React, { PureComponent } from 'react';
import * as FileUpload from 'react-fileupload';
import { editComponentByGuid } from '../../../pages/editor/App';

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

    handleChange = (event) => {
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
        // const options = {
        //     baseUrl: 'http://172.30.40.16:3000/api/image',
        //     chooseAndUpload: true,
        //     dataType: 'multipart/form-data',
        //     fileFieldName: 'file',
        //     uploadSuccess: (props) => {
        //         const { data } = props;
        //         const url = `${data[0].imageDomain}/${data[0].suffixUrl}`;

        //         this.setState({
        //             src: url,
        //         });

        //         editComponentByGuid(
        //             guid,
        //             ['componentProps', 'src'],
        //             url
        //         );

        //     },
        // }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        const options = {
            baseUrl: 'http://172.30.40.16:3000/api/publish/zip',
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'file',
            paramAddToField: {
                "uploadUserId": 123123
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

            },
        }
        return (
            <div>
                <div className="ec-editor-basic-props ec-editor-basic-props-attr">
                    <p>
                        <label htmlFor="">图片地址</label>
                        <input
                            type="text"
                            data-guid={guid}
                            data-attr="src"
                            onChange={this.handleChange}
                            value={this.state.src}
                        />
                        <FileUpload options={options}>
                            <button ref='chooseAndUpload'>上传图片</button>
                        </FileUpload>
                    </p>
                    <p>
                        <label htmlFor="">跳转</label>
                        <input
                            type="text"
                            data-guid={guid}
                            data-attr="url"
                            onChange={this.handleChange}
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
