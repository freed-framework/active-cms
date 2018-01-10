/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is, fromJS } from 'immutable';
import classNames from 'classnames';
import './dragger.scss';

const TYPE = {
    DRAG: 'DRAG',
    RESIZE: 'RESIZE',
};

class Dragger extends PureComponent {
    static defaultProps = {
        disabled: false,
        minWidth: 20,
        minHeight: 20,
        /**
         * x: 允许在 x 上移动
         * y: 允许在 y 上移动
         * width: 允许改变宽度
         * height: 允许改变高度
         */
        position: {
            x: true,
            y: true,
            width: true,
            height: true,
        },
        onClick: () => {},
        onChangeStart: () => {},
        onChange: () => {},
        onChangeEnd: () => {},
    }

    constructor(props) {
        super(props);

        this.state = {
            rect: null,
        };

        this.disabled = props.disabled;

        this.position = props.position;

        // 是否拖拽控制在父级容器内
        this.setArea(props.parentArea);

        // 是否允许操作
        this.doing = false;

        // ...TYPE
        this.type = null;

        // 储存每次操作的初始值
        this.start = null;
        // 初始操作点击位置
        this.click = null;

        // 鼠标按下的时间戳
        this.startTime = null;
    }

    componentDidMount() {
        document.body.addEventListener('mousedown', this.handleStart);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        // document.body.addEventListener('mouseleave', this.handleWindowLeave);
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousedown', this.handleStart);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

     componentWillReceiveProps(nextProps) {
         if (this.props.disabled !== nextProps.disabled) {
             this.disabled = nextProps.disabled;
         }

         if (!is(fromJS(this.props.position), fromJS(nextProps.position))) {
             this.position = nextProps.position;
         }

         if (!is(fromJS(this.props.parentArea), fromJS(nextProps.parentArea))) {
             this.setArea(nextProps.parentArea);
         }

         if (!is(fromJS(this.props.rect), fromJS(nextProps.rect))) {
             this.setState({
                 rect: nextProps.rect,
             });
         }
    }

     componentDidUpdate() {
        // Do
    }

    /**
     * 判断是否允许在该属性上操作
     * @param rect { x, y, width, height }
     */
    filterRect(rect) {
        const info = {
            ...((this.position.x && rect.left) && {
                left: rect.left,
            }),
            ...((this.position.y && rect.top) && {
                top: rect.top,
            }),
            ...((this.position.width && rect.width) && {
                width: rect.width,
            }),
            ...((this.position.height && rect.height) && {
                height: rect.height,
            }),
        }

        return info;
    }

    setArea(parentArea) {
        this.parentArea = parentArea;

        if (this.parentArea) {
            this.area = {
                xMin: this.parentArea.offsetLeft,
                yMin: this.parentArea.offsetTop,
                xMax: this.parentArea.offsetLeft + this.parentArea.offsetWidth,
                yMax: this.parentArea.offsetTop + this.parentArea.offsetHeight,
            };
        } else {
            this.area = null;
        }
    }

    /**
     * 修正改变大小的值
     * @param step
     */
    fixResizeStep(step) {
        const { minWidth, minHeight } = this.props;
        const data = { ...step };

        if (this.area) {
            if (data.width > this.area.xMax) {
                data.width = this.area.xMax;
            }

            if (data.width <= minWidth) {
                data.width = minWidth;
            }

            if (data.height <= minHeight) {
                data.height = minHeight;
            }
        }

        return data;
    }

    /**
     * 修正拖拽的位置的值
     * @param step
     */
    fixDragStep(step) {
        const { rect } = this.state;
        const data = { ...step };

        if (this.area) {
            const { xMin, yMin, xMax, yMax } = this.area;

            if (data.left < xMin) {
                data.left = xMin;
            }

            if (data.top < yMin) {
                data.top = yMin;
            }

            if (data.left + rect.width >= xMax) {
                data.left = xMax - rect.width;
            }
        }

        return data;
    }

     /**
     * 通过操作类型获取相应的数据
     * @param x
     * @param y
     * @return {*}
     */
    getInfoByType(x, y) {
        const { dpi } = this.props;
        const { rect } = this.state;
        const step = {};

        // 返回的数据
        const data = {
            start: {},
            step: {},
        };

        // 改变大小
        if (this.type === TYPE.RESIZE) {
            if (x && y) {
                step.width = this.position.width ?
                    (x - this.click.x) * dpi + this.start.width :
                    this.start.width;

                step.height = this.position.height ?
                    (y - this.click.y) * dpi + this.start.height :
                    this.start.height;
            }

            data.start = {
                width: rect.width,
                height: rect.height,
            };

            data.step = this.fixResizeStep(step);
        }

        // 改变位置
        if (this.type === TYPE.DRAG) {
            if (x && y) {
                step.left = this.position.x ?
                    (x - this.click.x) * dpi + this.start.x :
                    this.start.x;

                step.top = this.position.y ?
                    (y - this.click.y) * dpi + this.start.y :
                    this.start.y;
            }

            data.start = {
                x: rect.left,
                y: rect.top,
            };

            data.step = this.fixDragStep(step);
        }

        return data;
    }

    handleStart = (event) => {
        if (this.disabled) {
            return;
        }

        // 如果正在动画中，触发了右键，则直接触发结束
        if (event.button === 2) {
            return this.handleMouseUp();
        }

        this.startTime = +new Date();

        setTimeout(() => {
            this.handleMouseDown(event);
        });
    }

    /**
     * mouse down 仅记录点击信息
     * 实际判断是否可以操作，由 isThreshold 进行判定
     * @param event
     */
    handleMouseDown = (event) => {
        if (!this.type || this.disabled) {
            return;
        }

        const { start } = this.getInfoByType();

        /**
         * 当前的元素 即将被操作的信息
         */
        this.start = {
            ...start,
        };

        /**
         * 操作开始位置
         * @type {{x: (*), y: (*)}}
         */
        this.click = {
            x: event.pageX,
            y: event.pageY,
        };

        this.props.onChangeStart(this.start);
    }

    reset() {
        this.type = null;
        this.doing = false;
        this.start = null;
        this.click = null;
    }

    /**
     * 是否达到阈值
     * @param x
     * @param y
     * @return {Promise}
     */
    isThreshold(x, y) {
        return new Promise(reslove => {
            if (!this.click || this.disabled) {
                return reslove(null);
            }

            const threshold = Math.max(
                Math.abs(x - this.click.x),
                Math.abs(y - this.click.y)
            );

            // 在未操作的情况下，判断是否达到阈值
            if (!this.doing && threshold > 3) {
                // 允许拖拽
                this.doing = true;

                return reslove(true);
            }

            // 拖拽中
            if (this.doing) {
                return reslove(true);
            }

            reslove(false);
        })
    }

    /**
     * 停止操作
     * @param event
     */
    handleMouseUp = () => {
        if (this.doing) {
            this.props.onChangeEnd(this.state.rect, {
                area: this.area,
                start: this.start,
                click: this.click,
            });
        }

        this.reset();
    }

    /**
     * 拖拽操作
     * @param event
     */
    handleMouseMove = (event) => {
        this.isThreshold(event.pageX, event.pageY).then(todo => {
            if (todo) {
                const { step } = this.getInfoByType(event.pageX, event.pageY);

                this.update(step);
            }
        });
    }

    handleDragStart = () => {
        this.type = TYPE.DRAG;
    }

    handleResizeStart = () => {
        this.type = TYPE.RESIZE;
    }

    /**
     * 更新状态
     * @param data
     */
    update(data) {
        const rect = {
            ...this.state.rect,
            ...data,
        };

        this.setState({
            rect,
        }, () => {
            this.props.onChange(this.filterRect(rect));
        });
    }

    render() {
        const { rect } = this.state;
        const dragCls = classNames('dragger', {
            [`dragger-${this.type}-doing`]: this.doing && this.type,
        });

        return (
            <div
                style={{
                    ...rect
                }}
                ref={ref => { this.dragger = ref }}
                className={dragCls}
                data-module="control"
            >
                <div
                    className="dragger-content"
                    data-module="control"
                >
                    {this.props.children}
                </div>

                {!this.disabled &&
                    <div
                        ref={ref => {
                            this.handle = ref
                        }}
                        className="dragger-drag"
                        data-module="control"
                        onMouseDown={this.handleDragStart}
                    />
                }

                {!this.disabled &&
                    <div
                        ref={ref => { this.handle = ref }}
                        className="dragger-resize"
                        data-module="control"
                        onMouseDown={this.handleResizeStart}
                    />
                }
            </div>
        );
    }
}

export default Dragger;
