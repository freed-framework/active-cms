/**
 * @file App.jsx
 * @author shijh
 *
 * 列表页面
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Pagination, BackTop, Input,
    Radio, Modal, Form, Upload,
    Icon, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reqwest from 'reqwest';
import io from 'socket.io-client';
import { getUser } from '../../actions/user';
import Card from './Card';
import LocalCard from './LocalCard';
import { listsPageByTitle, shareList, listsPage, localList } from '../../services';
import { TopMenu } from '../../components';

const Search = Input.Search;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

import './app.scss';

const socket = io(`${config.domain}`, {
    path: '/push'
});

const routes = {
    pulish: '/lists/publish',
    my: '/lists/my',
    share: '/lists/share',
    local: '/lists/local'
}

@connect(
    state => ({
        user: state.toJS().user.data,
    }),
    dispatch => bindActionCreators({
        getUser
    }, dispatch)
)
class List extends PureComponent {
    static propTypes = {
        match: PropTypes.objectOf(PropTypes.any),
        history: PropTypes.objectOf(PropTypes.any),
        getUser: PropTypes.func,
        form: PropTypes.objectOf(PropTypes.any),
        user: PropTypes.objectOf(PropTypes.any)
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            current: 'my',
            uploadModal: false,
            file: null,
            uploading: false,
            isEidt: false,
            uploadData: {}
        }

        this.params = {
            pageSize: 20,
            page: 1
        }
    }

    componentDidMount() {
        const { history } = this.props;
        this.unPage = history.listen(loc => {
            loc.pathname.replace(/\/lists\/(.*)/g, ($0, $1) => {
                this.getPageList({ ...this.params }, $1);
            })
        })

        this.getPageList({ ...this.params });
        this.setCurrent();
    }

    componentWillUnmount() {
        this.unPage();
    }

    onShowSizeChange = (page, pageSize) => {
        this.params = {
            page,
            pageSize
        }
        this.getPageList({ ...this.params })
    }

    setCurrent = () => {
        const { match } = this.props;
        const { params } = match;
        const { type = '' } = params;

        switch (type) {
            case 'publish':
                this.setState({
                    current: 'pulish'
                })
                break;
            case 'my':
            case '':
                this.setState({
                    current: 'my'
                })
                break;
            case 'share':
                this.setState({
                    current: 'share'
                })
                break;
            case 'local':
                this.setState({
                    current: 'local'
                })
                break;
            default:
                break;
        }
    }

    getPageList = (param, page) => {
        const type = page || this.props.match.params.type;
        let fetch = listsPage;

        if (type === 'share') {
            fetch = shareList;
        } else if (type === 'publish') {
            fetch = listsPageByTitle;
        } else if (type === 'local') {
            fetch = localList;
        }

        this.setState({
            current: type || 'my'
        })

        fetch(param).then((res) => {
            this.setState({
                data: res.data
            })
        })
    }

    handleFetchList = () => {
        this.getPageList({ ...this.params })
    }

    handleSearch = (value) => {
        const params = {
            page: 1,
            pageSize: this.params.pageSize,
            content: value
        }
        this.params = params;
        this.getPageList(this.params)
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            current: value
        }, () => {
            this.props.history.push(routes[value])
        })
    }

    handleUpload = ({ isEidt, uploadModal, uploadData = {} }) => {
        this.setState({
            isEidt,
            uploadModal,
            uploadData
        })
    }

    handleUploadOk = () => {
        const { validateFields } = this.props.form;
        const { uploadData, isEidt } = this.state;

        validateFields((err, values) => {
            if (err) return;
            const { upload, title } = values;
            const { file } = upload;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            if (isEidt) {
                formData.append('pushId', uploadData.pushId);
            }

            this.setState({
                uploading: true,
            });

            reqwest({
                url: `${config.domain}/api/local/zip`,
                method: 'post',
                processData: false,
                data: formData,
                headers: {
                    Authorization: `bearer ${localStorage.getItem('access_token')}`
                },
                success: (data) => {
                    this.setState({
                        fileList: [],
                        file: null,
                        uploading: false
                    });
                    this.handleUploadCancel();
                    this.handleFetchList();
                    message.success('操作成功！');
                },
                error: () => {
                    this.setState({
                        uploading: false,
                    });
                    message.error('操作失败！');
                },
            });
        })
    }

    handleUploadCancel = () => {
        this.setState({
            uploadModal: false,
            uploadData: {},
            isEidt: false
        })
    }

    render() {
        const {
            data = {}, current, uploadModal,
            uploading, isEidt, uploadData
        } = this.state;

        const { lists = [], pageSize, page, total } = data;
        const { history, match } = this.props;
        const searchReg = new RegExp(`${this.params.content}`, 'gim');
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const props = {
            accept: '.zip',
            showUploadList: true,
            dataType: 'multipart/form-data',
            onRemove: () => {
                this.setState({
                    file: null
                });
            },
            beforeUpload: (file) => {
                this.setState({
                    file
                });
                return false;
            },
            fileList: this.state.file ? [this.state.file] : []
        };

        return (
            <div>
                <TopMenu.List
                    history={history}
                    match={match}
                    onSearch={this.handleSearch}
                    uploadZip={this.handleUpload}
                />
                <div className="page-list-handleRegion">
                    <Search
                        className="page-list-handleRegion-left"
                        style={current === 'share' ? { width: 200, 'display': 'none' } : { width: 200 }}
                        placeholder="搜索标题"
                        onSearch={this.handleSearch}
                    />
                    <Radio.Group className="page-list-handleRegion-right" value={current} onChange={this.handleChange}>
                        <Radio.Button value="my">制作的页面</Radio.Button>
                        {/* <Radio.Button value="pulish">所有公开页面</Radio.Button> */}
                        <Radio.Button value="share">分享给我的页面</Radio.Button>
                        <Radio.Button value="local">上传的页面</Radio.Button>
                    </Radio.Group>
                </div>
                <div
                    className={'page-list-wrap'}
                >
                    {
                        lists.length === 0
                            ? <div className='page-list-empty'>暂无数据...</div>
                            : lists.map((item) => {
                                return (current === 'local' ? <LocalCard
                                    current={current}
                                    key={item._id}
                                    reg={searchReg}
                                    data={item.shareTime ? item.page : item}
                                    history={history}
                                    onFetchList={this.handleFetchList}
                                    socket={socket}
                                    uploadZip={this.handleUpload}
                                /> : <Card
                                    current={current}
                                    key={item._id}
                                    reg={searchReg}
                                    data={item.shareTime ? item.page : item}
                                    history={history}
                                    onFetchList={this.handleFetchList}
                                    socket={socket}
                                />)
                            })
                    }
                </div>
                {
                    lists.length === 0 && page === '1'
                        ? null
                        : <div
                            className={'page-list-pagin'}
                        >
                            <Pagination
                                showSizeChanger
                                showQuickJumper
                                onChange={this.onShowSizeChange}
                                onShowSizeChange={this.onShowSizeChange}
                                pageSize={parseInt(pageSize, 10)}
                                current={parseInt(page, 10)}
                                total={total || 0}
                            />
                        </div>
                }
                {
                    this.state.uploadModal &&
                    <Modal
                        title={isEidt ? '编辑' : '新增'}
                        visible
                        onOk={this.handleUploadOk}
                        confirmLoading={uploading}
                        onCancel={this.handleUploadCancel}
                    >
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="主题"
                            >
                                {getFieldDecorator('title', {
                                    rules: [{
                                        required: true, message: '请输入标题!',
                                    }],
                                    initialValue: uploadData.title
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="资源包"
                            >
                                {getFieldDecorator('upload', {
                                    rules: [{
                                        required: true, message: '请选择zip!',
                                    }],
                                })(
                                    <Dragger {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </p>
                                        <p className="ant-upload-text">点击或者拖拽文件上传</p>
                                        <p className="ant-upload-hint">支持zip上传</p>
                                    </Dragger>
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                }
                <BackTop />
            </div>
        )
    }
}

export default Form.create()(withRouter(List));
