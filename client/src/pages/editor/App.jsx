/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { fromJS, is } from 'immutable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { message, Modal, Input, Icon, Form, Button } from 'antd';
import mitt from 'mitt';
import { getRect, createChildren, getDisplayName } from '../../common/util/util';
import module from '../../common/module';
import { addPage, editPage, push } from '../../services';
import { setRect } from '../../actions/pub';
import { Editor, Panel, TopMenu, LayerCake, Follow, PubComps, Editable } from '../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as FileUpload from 'react-fileupload';
import { getUser } from '../../actions/user';
import { setActiveInfo } from '../../actions/pub';
import { setPageTileData, setPageTitle, setPageContent } from '../../actions/page';
import icon from '../../images/icon-svg/icon.svg';
import loader from '../../common/loader/loader';
import Guide from '../../components/guide';
import { Continue } from '../../components/guide/App';
import { updateBasicProps } from '../../propEdit/basic';
import { getToken, getStyle } from '../../utils';
import Dragger from '../../components/dragger';
const url = require('../../images/list-placeholder.png');
import './app.scss';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const emitter = mitt();

@connect(
    state => ({
        user: state.toJS().user.data,
        page: state.toJS().page,
    }),
    dispatch => bindActionCreators({
        getUser,
        setRect,
        setPageTileData,
        setPageTitle,
        setPageContent,
    }, dispatch)
)
class App extends PureComponent {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
        pageData: PropTypes.objectOf(PropTypes.any),
        title: PropTypes.string,
    }

    static defaultProps = {
        data: [],
    }

    constructor(props) {
        super(props);

        this.state = {
            /**
             * 组件的所在区域
             */
            rect: null,

            /**
             * 激活的 组件 id
             */
            activeId: null,

            hoverId: null,

            /**
             * 编辑面板 展示状态
             */
            panelVisible: false,

            /**
             * 已添加组件 展示状态
             */
            layerCakeVisible: false,

            /**
             * 左下角菜单 展示状态
             */
            menuVisible: false,

            /**
             * 后端返回的原始数据
             * 该数据包含层级关系，components.App module config 等数据 不包含在此
             */
            data: props.data,

            /**
             * 复制数据
             */
            copyData: null,

            /**
             * 默认新建页面标题
             */
            title: '我的新页面' || props.pageData.title,
            /**
             * 是否是编辑
             */
            isEdit: !!props.pageData,
            /**
             * 保存弹出框
             */
            saveVisible: false
        };

        this.$oldData = fromJS(props.data);
        this.clearTimer = null;

        emitter.on('delete', this.mittDelete);
        emitter.on('copy', this.mittCopy);
        emitter.on('paste', this.mittPaste);
        emitter.on('move', this.mittMove);
        emitter.on('add', this.mittAdd);
        emitter.on('save', this.mittSave);
        emitter.on('edit', this.mittEdit);
        emitter.on('modify', this.mittModify);
        emitter.on('sort', this.mittSort);
        emitter.on('active', this.mittActive);
        emitter.on('viewer', this.mittViewer);
        emitter.on('push', this.mittPush);
        emitter.on('clearActive', this.mittClearActive);
    }

    componentDidMount() {
        const { pageData = {} } = this.props;
        // let $oldData = fromJS(this.state.data);
        // this.props.user(12312312).then(data => {

        // })
        // // 定时保存每分钟保存一次
        // // this.timer = Observable.interval(60000).subscribe(() => {
        // //     const $newData = fromJS(this.state.data);
        // //
        // //     // 数据修改了才保存
        // //     if (!is($oldData, $newData)) {
        // //         this.mittSave('定时保存成功！');
        // //         $oldData = $newData;
        // //     }
        // // })
        this.canvas.addEventListener('click', this.handleActive, false);
        this.canvas.addEventListener('mouseover', this.handleHover);
        // this.canvas.addEventListener('mouseout', this.handleOut);
    }

    componentWillUnmount() {
        emitter.off('delete', this.mittDelete);
        emitter.off('add', this.mittAdd);
        emitter.off('save', this.mittSave);
        emitter.off('edit', this.mittEdit);
        emitter.off('active', this.mittActive);
        emitter.off('viewer', this.mittViewer);
        emitter.off('push', this.mittPush);
        emitter.off('clearActive', this.mittClearActive)

        clearTimeout(this.clearTimer)

        // this.timer.unsubscribe();

        this.canvas.removeEventListener('click', this.handleActive);
        this.canvas.removeEventListener('mouseover', this.handleHover);
        // this.canvas.removeEventListener('mouseout', this.handleOut);
    }

    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(nextProps.data), fromJS(this.props.data))) {
            this.setState({
                data: nextProps.data,
            }, () => {
                this.$oldData = fromJS(nextProps.data);
            })
        }

        if (!is(fromJS(nextProps.pageData), fromJS(this.props.pageData))) {
            this.setState({
                title: nextProps.pageData.title,
                thumbnail: nextProps.pageData.thumbnail
            });
        }
    }

    /**
     * 激活事件
     * @param event
     */
    handleActive = (event) => {
        // guid 作为 id 被添加到组件上
        const target = event.target;
        const guid = target.getAttribute('id');
        const module = target.getAttribute('data-module');

        // 点击在提示可编辑的控制层上, 不进行激活操作
        if (module === 'control') {
            return;
        }

        this.mittActive({
            guid,
            target,
            // rect: getRect(target),
        });
    }

    /**
     * 用于提示可编辑的事件
     * @param event
     */
    handleHover = (event) => {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const target = event.target;
        const guid = target.getAttribute('id');
        const module = target.getAttribute('data-module');

        // 移动端的画布有特殊设置
        const parent = params.type === 'mobile' ? this.canvasInner : null;
        const rect = guid && target ? getRect(target, parent) : null;

        if (module && guid && rect) {
            this.setState({
                hoverId: guid,
                hoverRect: rect,
            });
        } else {
            this.setState({
                hoverId: null,
                hoverRect: null,
            });
        }
    }

    /**
     * 复制组件
     * @param guid
     */
    mittCopy = (guid) => {
        const data = module.copy(guid, this.state.data);

        message.success('复制成功');

        this.setState({
            copyData: data
        })
    }

    /**
     * 粘贴组件
     * @param guid
     */
    mittPaste = (guid) => {
        const { data, copyData } = this.state;

        if (!copyData) {
            message.error('并无数据被复制');
            return;
        }

        const result = module.paste(guid, data, copyData);

        message.success('粘贴成功');

        this.setState({
            data: result,
        })
    }

    /**
     * 移动组件
     * @param startId
     * @param endId
     */
    mittMove = ({ startId, endId }) => {
        const { data } = this.state;
        const result = module.move(data, startId, endId);

        if (!result) {
            message.success('暂时只支持同级元素拖动');
            return;
        }

        this.setState({
            data: result,
        })
    }

    /**
     * 更新附带 组件属性的数据内容
     * @param data
     * @param callback
     */
    setTileData(data = [], callback) {
        // 平铺的绑定了 App 的数据
        const tileData = {};
        const result = this.data2Tile(data);

        Promise.all(result).then(values => {
            values.forEach(v => {
                tileData[v.guid] = {...v};
            });

            this.props.setPageTileData(tileData);
        });
    }

    /**
     * 设置 state.data & state.tileData
     * 将数据平铺
     * @param data
     * @param arr
     * @return {Array}
     */
    data2Tile(d) {
        const { params } = this.props.match;
        let arr = [];

        const looper = (data, topWrappedModule) => {
            data.forEach(item => {
                arr = arr.concat(module.get(item, topWrappedModule));

                if (item.children) {
                    looper(item.children, item.name);
                }
            });
        }

        looper(d);

        return arr;
    }

    /**
     * 添加模块
     * @param cname
     * @param guid
     */
    mittAdd = ({ cname, guid }) => {
        const { page } = this.props;
        const mod = module.create(cname);
        const arr = page.content;

        const data = guid ?
            createChildren(arr, guid, mod) :
            arr.concat(mod);

        this.props.setPageContent(data);
        this.setTileData(data);

        this.setState({
            // 当添加一个组件的时候，自动激活编辑面板
            autoActiveId: mod.guid,
        }, () => {
            /**
             * TODO:
             * 问题描述： 新加组件，组件进入视图，
             *           当前组件为激活组建，后面修改其他，也会选中这个组件
             * 暂时解决方法：(x)ms 秒钟后将activeid置空
             */
            this.clearTimer = setTimeout(() => {
                this.setState({
                    autoActiveId: null
                })
            }, 800);
        });
    }

    /**
     * 通过 guid 进行数据修改
     * @param guid
     * @param key
     * @param value
     */
    mittModify = ({ guid, keys, value }) => {
        const data = module.modify(guid, this.props.page.content, keys, value);

        this.props.setPageContent(data);
        this.setTileData(data);

        // this.setState({
        //     data,
        // }, () => {
        //     setTimeout(() => {
        //         // <TODO> 黑科技
        //         // 后续优化，这里先暂时用这样的方式来改变 rect 的位置，componentDidUpdate 再触发 click 会导致死循环
        //         const el = document.getElementById(this.state.activeId);
        //         if (el) {
        //             el.click();
        //         }
        //     }, 100);
        // });
    }

    /**
     * 删除模块
     * @param guid
     */
    mittDelete = (guid) => {
        const data = module.remove(guid, this.props.page.content);

        message.success('删除成功');

        this.props.setPageContent(data);
        this.setTileData(data);

        this.setState({
            // data,
            activeId: null,
            rect: null,
            activeRect: null,
            panelVisible: false,
        });
    }

    /**
     * 激活组件
     * @param guid
     * @param target
     */
    mittActive = ({ guid, target }) => {
        const { match = {} } = this.props;
        const { params = {} } = match;
        // 移动端的画布有特殊设置
        const parent = params.type === 'mobile' ? this.canvasInner : null;
        const rect = guid && target ? getRect(target, parent) : null;

        this.setState({
            activeId: guid,
            activeRect: rect,
            rect,
            // 有激活的组件，并且已添加组件栏未展开
            layerCakeVisible: !!guid,
            // 设置panel 编辑面板的显示状态
            panelVisible: !!guid,
            menuVisible: false,
        });
    }

    /**
     * 清除active
     */
    mittClearActive = () => {
        this.setState({
            autoActiveId: null
        })
    }

    /**
     * TODO 将弃用
     * 编辑组件属性
     * @param guid 组件id
     * @param attr 修改属性
     * @param target 目标元素
     * @param value 修改后值
     * @param type 修改后值
     */
    mittEdit = ({ guid, attr, target, value, type }) => {
        // const data = module.edit(guid, this.state.data, target, attr, value, type);
        //
        // this.setState({
        //     data,
        // }, () => {
        //     // 通知 Control 组件修改自身的宽度
        //     const expr = /width|height|margin/.exec(attr);
        //     if (expr) {
        //         const controlAttr = expr[0];
        //         const controlRect = {
        //             ...(this.state.activeRect)
        //         };
        //
        //         controlRect[controlAttr] = parseFloat(value);
        //
        //         this.setState({
        //             rect: controlRect,
        //             activeRect: controlRect,
        //         });
        //     }
        // });
    }

    mittSort = (data) => {
        this.setState({
            data,
        });
    }

    /**
     * 在弹框中设置页面标题
     * @param e
     */
    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    /**
     * 弹出保存弹出框
     */
    mittSave = (text) => {
        this.setState({
            saveVisible: true
        })
    }

    /**
     * 关闭弹出框
     */
    handleSaveCancel = () => {
        this.setState({
            saveVisible: false
        });
    }

    /**
     * 保存数据
     */
    handleSaveOk = () => {
        const { location = '', match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;

        if (!this.state.data.length) {
            message.error('页面不能为空');
            return;
        }


        const { title } = this.state;

        if (!title) {
            message.error('请输入标题');
            return;
        }

        if (!id || id === 'new') {
            addPage({
                title,
                pageType: params.type,
                content: this.state.data,
                thumbnail: this.state.thumbnail
            }).then((res) => {
                message.success('保存成功')
                this.$oldData = fromJS(this.state.data);
                this.handleSaveCancel();
                this.props.history.replace(`/mobile/edit/${res.data.id}${location.hash}`)
            })
        }
        else {
            editPage({
                id,
                page: {
                    content: this.state.data,
                    title: title,
                    thumbnail: this.state.thumbnail
                }
            }).then(() => {
                this.$oldData = fromJS(this.state.data);
                message.success('保存成功')
                this.handleSaveCancel();
            })
        }
    }

    mittPush = () => {
        const { pageData = {} } = this.props;
        const { $oldData } = this;
        const $now = fromJS(this.state.data);
        if (is($oldData, $now)) {
            confirm({
                title: '确认推送页面？',
                content: '',
                onOk: () => {
                    push({
                        id: pageData._id,
                        uploadUserId: 123123123,
                        zipId: pageData.pushId,
                        activityName: pageData.title
                    })
                        .then(() => {
                            message.success('推送成功');
                        })
                        .catch(() => { })
                },
                onCancel() { },
            });

            return false;
        }
        Modal.warning({
            title: '请先保存当前修改',
            content: '',
        });
    }

    mittViewer = () => {
        this.props.history.push(`/view/${this.props.match.params.id}`)
    }

    /**
     * 关闭 panel
     */
    handleClosePanel = () => {
        this.setState({
            panelVisible: false,
            activeId: null,
            rect: null,
            activeRect: null,
        });
    }

    /**
     * 显示/关闭 已添加组件
     */
    handleShow = () => {
        const { layerCakeVisible } = this.state;

        this.setState({
            layerCakeVisible: !layerCakeVisible,
        });
    }
    /**
     * 显示 menu
     */
    handleShowMenu = () => {
        const { menuVisible } = this.state;

        this.setState({
            menuVisible: !menuVisible,
        });
    }

    render() {
        const {
            rect,
            hoverRect,
            layerCakeVisible,
            menuVisible,
            activeId,
            hoverId,
            autoActiveId,
        } = this.state;
        const { history, match, page } = this.props;
        const data = page.content;

        if (!data) {
            return null;
        }

        const { getFieldDecorator } = this.props.form;
        const cls = classNames('layercake-show', {
            'layercake-hide': layerCakeVisible,
        });
        const options = {
            baseUrl: `${config.api}/commonUploadFile/uploadImageFiles`,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'file',
            uploadSuccess: (props) => {
                const img = props.data[0];

                this.setState({
                    thumbnail: `${img.imageDomain}/${img.suffixUrl}`
                }, () => {
                    message.success('上传成功，请保存！');
                })
            }
        }

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

        const wrapCls = classNames(`ec-editor-${match.params.type}`);
        const dpi = match.params.type === 'mobile' ? 2 : 1;

        const activeInfo = page.tile[this.state.activeId];
        // 获取拖拽的配置信息
        const draggable = activeInfo && activeInfo.config && activeInfo.config.draggable ?
                        activeInfo.config.draggable :
                        null;

        const activeTarget = document.getElementById(activeId);
        const parentArea = activeTarget && activeTarget.parentNode ? activeTarget.parentNode : null;

        return (
            <div className={wrapCls}>
                <PubComps />
                {/* Top Menu */}
                <TopMenu
                    history={history}
                    visible={menuVisible}
                />

                {/* 左侧工具面板 */}
                <div
                    className="ec-editor-left-panel ec-editor-layout-fixed"
                >
                    <PubComps />

                    {/* 已经添加的组件列表 */}
                    <LayerCake
                        activeId={activeId}
                        active={this.state.layerCakeVisible}
                        outerEl={this.canvasInner}
                        data={data}
                    />
                </div>

                {/* 右侧的控制面板 */}
                <Panel
                    activeId={activeId}
                    onClose={this.handleClosePanel}
                    visible={this.state.panelVisible}
                />

                {/* 菜单导航栏 */}
                <div
                    className="menu-button guide-steps-handler"
                    data-guide={'{"step": 3, "tip": "此处点击后会打开操作按钮", "nextStep": 4, "delay": 600}'}
                    onClick={this.handleShowMenu}
                >
                    <img src={icon} alt="" />
                </div>

                {/* 模块 */}
                <div
                    ref={ref => { this.canvas = ref }}
                    className="ec-editor-canvas"
                >
                    <div
                        className="ec-editor-canvas-inner"
                        ref={ref => { this.canvasInner = ref }}
                    >
                        {/* 操作提示节点 */}
                        <Dragger
                            parentArea={parentArea}
                            // parentArea={null}
                            disabled={!draggable}
                            position={draggable && draggable.position}
                            rect={rect}
                            dpi={dpi}
                            onChange={info => this.props.setRect(info)}
                            onChangeEnd={(info, msg) => {
                                let style = {};
                                if (activeInfo.componentProps && activeInfo.componentProps.style) {
                                    style = activeInfo.componentProps.style;
                                }

                                const id = this.state.activeId;
                                const prevDom = activeTarget.previousElementSibling;
                                const parentNodeInfo = {};

                                if (parentArea) {
                                    const style = getStyle(parentArea, null);

                                    parentNodeInfo.position = style.getPropertyValue('position');
                                    parentNodeInfo.left = parentArea.offsetLeft;
                                    parentNodeInfo.top = parentArea.offsetTop;
                                }

                                // 修改 Basic 的信息
                                updateBasicProps(id, info, style, {
                                    parentNodeInfo,
                                    scrollTop: this.canvasInner.scrollTop,
                                    scrollLeft: this.canvasInner.scrollLeft,
                                    offsetTop: activeTarget.offsetTop,
                                    offsetLeft: activeTarget.offsetLeft,
                                    prevDomTop: prevDom ? prevDom.offsetTop + prevDom.offsetHeight : 0,
                                });
                            }}
                        >
                            {/* control bar */}
                            <Editable.activePanel />
                        </Dragger>

                        <Editable.tips
                            isVisible={hoverId && activeId !== hoverId}
                            rect={hoverRect}
                            name={getDisplayName(page.tile[hoverId])}
                        />

                        {/* 实际的可编辑组件列表 */}
                        <Editor
                            data={data}
                            outerEl={this.canvasInner}
                            autoActiveId={autoActiveId}
                        />
                    </div>
                </div>

                {/* guide */}
                <Guide guide="guide-new-page" />

                {/* save modal */}

                <Modal
                    title="保存设置"
                    visible={this.state.saveVisible}
                    onOk={this.handleSaveOk}
                    onCancel={this.handleSaveCancel}
                >
                    <div>
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="页面标题"
                            >
                                {getFieldDecorator('title', {
                                    rules: [{
                                        required: true, message: '请输入页面标题！',
                                    }],
                                    initialValue: this.state.title
                                })(
                                    <Input
                                        className="guide-steps-handler"
                                        data-guide='{"step": 5, "tip": "修改标题，保存页面", "done": true}'
                                        onChange={this.handleChange}
                                    />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="封面图片"
                            >
                                {getFieldDecorator('title', {
                                    rules: [{}],
                                })(
                                    <FileUpload
                                        className="ec-edit-setting-thumbnail ec-edit-setting-thumbnail-right"
                                        options={options}
                                    >
                                        <Button ref="chooseAndUpload">上传图片</Button>
                                    </FileUpload>
                                    )}
                            </FormItem>
                            <FormItem>
                                <div
                                    style={{
                                        height: '196px',
                                        overflow: 'hidden',
                                        textAlign: 'center'
                                    }}
                                >
                                    <img
                                        style={{width: '287px'}}
                                        src={this.state.thumbnail || url} />
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}

/**
 * 移除组件
 * @param event
 */
export const deleteComponent = (guid) => {
    emitter.emit('delete', guid);
}

/**
 * 复制组件
 * @param event
 */
export const copyComponent = (guid) => {
    emitter.emit('copy', guid);
}

/**
 * 粘贴数据
 */
export const pasteComponent = (guid) => {
    emitter.emit('paste', guid);
}

/**
 * 添加组件
 * @param event
 */
export const addComponent = (event) => {
    const guid = event.currentTarget.getAttribute('data-guid');
    const cname = event.currentTarget.getAttribute('data-name');

    emitter.emit('add', {
        cname,
        guid,
    });
}

export const moveComponent = (startId, endId) => {
    emitter.emit('move', {
        startId,
        endId
    })
}

/**
 *
 * @param {Object} event 事件对象
 * @param {string|undefined} type 编辑的属性
 */
export const editComponent = (event, type) => {
    const guid = event.currentTarget.getAttribute('data-guid');
    const attr = event.currentTarget.getAttribute('data-attr');
    const target = event.currentTarget.getAttribute('data-target');
    const value = event.currentTarget.value;

    emitter.emit('edit', {
        guid,
        attr,
        target,
        value,
        type,
    })
}

export const editComponentByGuid = (guid, keys, value) => {
    emitter.emit('modify', {
        guid,
        keys,
        value,
    })
}

/**
 * 编辑的属性
 * @param option 传递
 * @param type 编辑的属性
 */
export const editComponentByType = (option, type) => {
    const { guid, attr, target, value } = option;

    emitter.emit('edit', {
        guid,
        attr,
        target,
        value,
        type,
    })
}

export const activeComponent = (guid, target) => {
    emitter.emit('active', {
        guid,
        target,
    });
}

export const sortComponent = (data) => {
    emitter.emit('sort', data);
}

/**
 * 储存数据
 */
export const saveData = () => {
    emitter.emit('save');
}

/**
 * 发布数据
 */
export const handlePush = () => {
    emitter.emit('push');
}

/**
 * 预览页面
 */
export const viewer = () => {
    emitter.emit('viewer')
}

/**
 * 清除激活
 */
export const clearActive = () => {
    emitter.emit('clearActive')
}

export default Form.create()(withRouter(App));
