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
import {
    getPageData,
    setPageTileData,
    setPageTitle,
    setPageContent,
    setActiveInfo,
    getActiveInfo,
    clearActiveInfo,
    setPageThumbnail,
    clearPage,
} from '../../actions/page';
import { calc, resizeEvt } from '../../common/mobileMock';
import loader from '../../common/loader/loader';
import Guide from '../../components/guide';
import { Continue } from '../../components/guide/App';
import { updateBasicProps } from '../../propEdit/basic';
import { getToken, getStyle } from '../../utils';
import Dragger from '../../components/dragger';
const url = require('../../images/list-placeholder.png');
import icon from '../../images/icon-svg/icon.svg';
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
        getPageData,
        setPageTileData,
        setPageThumbnail,
        setPageTitle,
        setPageContent,
        setActiveInfo,
        getActiveInfo,
        clearActiveInfo,
        clearPage,
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
             * TODO 转移到 redux 待删除
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
            data: [],

            /**
             * 复制数据
             */
            copyData: null,

            /**
             * 保存弹出框
             */
            saveVisible: false
        };

        this.$oldData = fromJS(props.data);
        this.clearTimer = null;
        this.prevHistory = {
            id: null,
            rect: null,
        };

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
        const { match = {} } = this.props;
        const { params = {} } = match;

        this.canvas.addEventListener('click', this.handleActive, false);
        this.canvas.addEventListener('mouseover', this.handleHover);
        // this.canvas.addEventListener('mouseout', this.handleOut);

        // 移动端模拟
        if (params.type === 'mobile') {
            calc(750);
            window.addEventListener(resizeEvt, calc, false);
        }

        // 请求页面数据
        if (params.id) {
            this.props.getPageData(params.id)
                .then(() => {
                    this.saveTileData(this.props.page.content)
                });
        }
    }

    componentWillUnmount() {
        const { match = {} } = this.props;
        const { params = {} } = match;

        emitter.off('delete', this.mittDelete);
        emitter.off('add', this.mittAdd);
        emitter.off('save', this.mittSave);
        emitter.off('edit', this.mittEdit);
        emitter.off('active', this.mittActive);
        emitter.off('viewer', this.mittViewer);
        emitter.off('push', this.mittPush);
        emitter.off('clearActive', this.mittClearActive);

        clearTimeout(this.clearTimer)

        // this.timer.unsubscribe();

        this.canvas.removeEventListener('click', this.handleActive);
        this.canvas.removeEventListener('mouseover', this.handleHover);
        // this.canvas.removeEventListener('mouseout', this.handleOut);

        this.props.clearPage();

        if (params.type === 'mobile') {
            window.removeEventListener(resizeEvt, calc, false);
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
        const scale = params.type === 'mobile' ? 2 : 1;
        // 移动端的画布有特殊设置
        const parent = params.type === 'mobile' ? this.canvasInner : null;
        const rect = guid && target ? getRect(target, parent) : null;

        if (module && guid && rect) {
            // 修正hover 图层可能会闪烁的问题
            // 外层容器高度小于内部容器高度
            const hoverParent = target.parentNode;
            if (hoverParent) {
                const hoverParentRect = hoverParent.getBoundingClientRect();

                if (rect.width > hoverParentRect.width * scale) {
                    rect.width = hoverParentRect.width * scale;
                }

                if (rect.height > hoverParentRect.height * scale) {
                    rect.height = hoverParentRect.height * scale;
                }
            }

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
    saveData(data = [], callback = () => {}) {
        const { page } = this.props;

        // 待优化
        if (is(fromJS(data), fromJS(page.content))) {
            return;
        }

        this.props.setPageContent(data).then(() => callback());

        this.saveTileData(data);
    }

    saveTileData(data = []) {
        // 平铺的绑定了 App 的数据
        const tileData = {};
        const promiseList = this.data2Tile(data);

        Promise.all(promiseList).then(values => {
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
     * 自动触发遮照层重新激活，根据当前数据，修改相应属性
     * TODO 该方法待优化
     * @param id
     */
    autoActive(id) {
        // 后期修改为判断某些属性变化的时候才重新触发激活
        setTimeout(() => {
            // 如果没有传入的 激活 id，则直接触发当前激活的
            const guid = id || this.props.page.activeId;

            this.mittActive({
                guid,
                target: document.getElementById(guid),
            });
        }, 200);
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
        const id = mod.guid || guid;

        this.saveData(data, () => this.autoActive(id));
    }

    /**
     * 通过 guid 进行数据修改
     * @param guid
     * @param key
     * @param value
     */
    mittModify = ({ guid, keys, value }) => {
        const data = module.modify(guid, this.props.page.content, keys, value);

        this.saveData(data, () => this.autoActive());
    }

    /**
     * 删除模块
     * @param guid
     */
    mittDelete = (guid) => {
        const data = module.remove(guid, this.props.page.content);

        message.success('删除成功');

        this.saveData(data);

        this.props.clearActiveInfo();

        this.setState({
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
        const { match = {}, page } = this.props;
        const { params = {} } = match;
        // 移动端的画布有特殊设置
        const parent = params.type === 'mobile' ? this.canvasInner : null;
        const rect = guid && target ? getRect(target, parent) : null;

        this.setState({
            activeRect: rect,
            rect,
            // 设置panel 编辑面板的显示状态
            panelVisible: !!guid,
            menuVisible: false,
            // 有激活的组件，并且已添加组件栏未展开
            ...(guid && !this.state.layerCakeVisible && {
                layerCakeVisible: true,
            }),
        });

        if (guid && guid !== page.activeId) {
            this.props.setActiveInfo(guid);
        }

        if (!guid && page.activeId) {
            this.props.clearActiveInfo();
        }
    }

    mittSort = (data) => {
        this.saveData(data);
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
        const { location = '', match = {}, page, form } = this.props;
        const { params = {} } = match;
        const { id } = params;

        form.validateFields((err, values) => {
            if (err) return false;
            const { title } = values;

            if (page.content.length === 0) {
                message.error('页面不能为空');
                return;
            }

            if (!title) {
                message.error('请输入标题');
                return;
            }

            if (!id || id === 'new') {
                addPage({
                    title,
                    pageType: params.type,
                    content: page.content,
                    thumbnail: page.thumbnail
                }).then((res) => {
                    message.success('保存成功')
                    this.$oldData = fromJS(page.content);
                    this.handleSaveCancel();
                    this.props.history.replace(`/mobile/edit/${res.data.id}${location.hash}`)
                })
            }
            else {
                editPage({
                    id,
                    page: {
                        content: page.content,
                        title: title,
                        thumbnail: page.thumbnail
                    }
                }).then(() => {
                    this.$oldData = fromJS(page.content);
                    message.success('保存成功')
                    this.handleSaveCancel();
                })
            }
        })


    }

    mittPush = () => {
        const { page } = this.props;
        const { $oldData } = this;
        const $now = fromJS(page.content);

        if (is($oldData, $now)) {
            confirm({
                title: '确认推送页面？',
                content: '',
                onOk: () => {
                    push({
                        id: page._id,
                        zipId: page.pushId
                    }).then(() => {
                        message.success('推送成功');
                    }).catch(() => { })
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

    /**
     * 获取激活数据
     */
    getActive() {
        const { page } = this.props;
        const { activeId } = page;

        if (!page.tile || !activeId) {
            return null;
        }

        return page.tile[activeId];
    }

    /**
     * 修改 basic 数据
     * @param info 操作的信息
     */
    updateBasic(info) {
        const { activeId } = this.props.page;

        if (!activeId) {
            return null;
        }

        let style = {};
        const curActive = this.getActive();
        if (curActive && curActive.componentProps && curActive.componentProps.style) {
            style = curActive.componentProps.style;
        }

        const activeTarget = document.getElementById(activeId);
        const parentArea = activeTarget && activeTarget.parentNode ? activeTarget.parentNode : null;
        const prevDom = activeTarget.previousElementSibling;
        const parentNodeInfo = {};

        if (parentArea) {
            const style = getStyle(parentArea, null);

            parentNodeInfo.position = style.getPropertyValue('position');
            parentNodeInfo.left = parentArea.offsetLeft;
            parentNodeInfo.top = parentArea.offsetTop;
        }

        // 修改 Basic 的信息
        updateBasicProps(activeId, info, style, {
            parentNodeInfo,
            scrollTop: this.canvasInner.scrollTop,
            scrollLeft: this.canvasInner.scrollLeft,
            offsetTop: activeTarget.offsetTop,
            offsetLeft: activeTarget.offsetLeft,
            prevDomTop: prevDom ? prevDom.offsetTop + prevDom.offsetHeight : 0,
        });
    }

    render() {
        const {
            rect,
            hoverRect,
            layerCakeVisible,
            menuVisible,
            hoverId,
        } = this.state;
        const { history, match, page } = this.props;
        // 页面源数据
        const data = page.content;

        if (!data) {
            return null;
        }

        const { activeId } = page;
        const activeInfo = this.getActive();
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

                this.props.setPageThumbnail(`${img.imageDomain}/${img.suffixUrl}`);
                message.success('上传成功，请保存！');
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
                        onClick={this.handleShow}
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
                            disabled={!draggable}
                            position={draggable && draggable.position ? draggable.position : {}}
                            rect={rect}
                            dpi={dpi}
                            onChangeStart={() => {
                                this.prevRect = rect;
                            }}
                            onChange={info => {
                                this.props.setRect(info);
                            }}
                            onChangeEnd={info => {
                                this.updateBasic(info);

                                this.prevHistory.rect = this.prevRect;
                                this.prevHistory.id = activeId;
                            }}
                        >
                            {/* Control Bar */}
                            <Editable.activePanel
                                history={this.prevHistory.rect && this.prevHistory.id === activeId}
                                onGoBack={() => {
                                    this.setState({
                                        rect: this.prevHistory.rect,
                                    }, () => {
                                        this.prevHistory.id = null;
                                        this.prevHistory.rect = null;
                                    });

                                    this.updateBasic(this.prevHistory.rect);
                                }}
                            />
                        </Dragger>

                        <Editable.tips
                            isVisible={hoverId && activeId !== hoverId}
                            rect={hoverRect}
                            {...(page.tile && {
                                name: getDisplayName(page.tile[hoverId])
                            })}
                        />

                        {/* 实际的可编辑组件列表 */}
                        <Editor
                            data={data}
                            outerEl={this.canvasInner}
                        />
                    </div>
                </div>

                {/* Guide */}
                <Guide guide="guide-new-page" />

                {/* Save Modal */}
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
                                    initialValue: page.title
                                })(
                                    <Input
                                        className="guide-steps-handler"
                                        data-guide='{"step": 5, "tip": "修改标题，保存页面", "done": true}'
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
                                        src={page.thumbnail || url} />
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
