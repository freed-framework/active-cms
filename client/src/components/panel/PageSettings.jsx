/**
 * @file PageSettings.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as FileUpload from 'react-fileupload';
import { message } from 'antd';
import { setPageTitle, setPageThumbnail } from '../../actions/page';
import { bindActionCreators } from 'redux';
import { getToken } from '../../utils';

@connect(
    state => ({
        title: state.toJS().page.title,
    }),
    dispatch => bindActionCreators({
        setPageTitle,
        setPageThumbnail
    }, dispatch)
)
class PageSettings extends PureComponent {
    handleChangePageName = (event) => {
        const value = event.currentTarget.value;

        this.props.setPageTitle(value);
    }

    render() {
        const { title } = this.props;

        const options = {
            baseUrl: `${config.api}/commonUploadFile/uploadImageFiles`,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'file',
            requestHeaders: {
                Authorization: getToken()
            },
            uploadSuccess: (props) => {
                const { data } = props;
                const img = data[0];

                message.success('上传成功，请保存！');
                this.props.setPageThumbnail(`${img.imageDomain}/${img.suffixUrl}`);
            }
        }

        return (
            <div>
                {/* <div className="ec-edit-setting">页面配置</div> */}
                {/* <div className="ec-edit-setting-title">
                    标题
                    <input
                        type="text"
                        value={title}
                        onChange={this.handleChangePageName}
                    />
                </div>
                <div>
                    <div className="ec-edit-setting-thumbnail ec-edit-setting-thumbnail-left">封面图片：</div>
                    <FileUpload
                        className="ec-edit-setting-thumbnail ec-edit-setting-thumbnail-right"
                        options={options}
                    >
                        <button ref="chooseAndUpload">上传图片</button>
                    </FileUpload>
                </div> */}
            </div>
        )
    }
}

export default PageSettings;
