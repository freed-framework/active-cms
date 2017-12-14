/**
 * @file guide.jsx
 * @author shijh
 *
 * 新手引导组件
 */

import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import classnames from 'classnames';
import mitt from 'mitt';
import { Popconfirm, Popover } from 'antd';
import ReactDOM from 'react-dom';
import { getRect } from '../../utils';
const emitter = mitt();

/**
 * canvas 填充颜色
 *
 * @param {Object} ctx canvas Element 
 * @param {number} x 起始坐标x
 * @param {number} y 起始坐标y
 * @param {number} width 矩形宽度
 * @param {number} height 矩形高度
 * @param {string} fillcorlor 填充颜色
 */
function draw(ctx, x, y, width, height, fillcorlor) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();

    ctx.fillStyle = fillcorlor;
    ctx.fill();
}

/**
 * 填充颜色位置确定
 *
 * @param {Object} ctx canvas Element 
 * @param {Object} options 目标元素位置信息 
 * @param {string} corlor 填充颜色
 * @param {number} offset 偏移量
 */
function drawRect(ctx, options, color, offset = 10) {
    const dom = document.querySelector('#mask-canvas');
    const { scrollWidth, scrollHeight } = document.body;
    dom.width = scrollWidth;
    dom.height = scrollHeight;

    const off = offset / 2; 
    const { left, right, top, bottom } = options;
    const l = left - off;
    const t = top - off;
    const b = bottom + off;
    const r = right + off;
    const width = r - l;

    draw(ctx, l, 0, width, t, color);
    draw(ctx, 0, 0, l, scrollHeight, color);
    draw(ctx, l, b, width, scrollHeight - b, color);
    draw(ctx, r, 0, scrollWidth - r, scrollHeight, color);
}

/**
 * 对目标数组进行排序
 *
 * @param {Array} arr 目标数组 
 */
function sort(arr = []) {
    return arr.sort((a, b) => {
        return a.step - b.step;
    })
}

/**
 * 获取页面上需要新手引导的点
 */
function getSteps() {
    const steps = document.querySelectorAll('.guide-steps-handler');
    const result = {
        steps: {}
    };

    for (let i = 0; i < steps.length; i++) {
        let options = {};
        const guide = steps[i];
        const data = guide.getAttribute('data-guide');

        if (!data) { continue; }
        
        try {
            options = JSON.parse(data)
        } catch (e) {
            console.error(e);
        }

        result.steps[options.step] = {
            ...options,
            guide
        }
    }

    return result;
}

class Guide extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        isGuide: PropTypes.bool,
        guide: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.guides = {
            steps: {}
        };
        this.step = 1;

        this.timer = [];

        const guide = localStorage.getItem(props.guide)

        this.state = {
            con: {},
            guideCon: {},
            hasGuid: !!guide,
            showModal: false,
            popShow: false,
            tipText: '下一步'
        }

        emitter.on('guide-continue', this.continue);
    }

    componentDidMount() {
        const { hasGuid } = this.state;
        if (!hasGuid) {
            this.setState({
                showModal: true
            }, () => {
                this.timer = setTimeout(() => {
                    this.guides = getSteps();
                    const dom = document.querySelector('#mask-canvas');
                    const { scrollWidth, scrollHeight } = document.body;
                    dom.height = scrollHeight;
                    dom.width = scrollWidth;
                    const cnt = dom.getContext('2d');

                    this.guides.cnt = cnt;
                    this.guides.dom = dom;

                    this.start()
                    this.setState({
                        popShow: true
                    })
                }, 600)
            })
        }
    }

    componentWillMount() {
        clearTimeout(this.timer);
    }

    start = () => {
        const {cnt, steps} = this.guides;
        const { guide, ...opt } = steps[this.step];
        const rect = getRect(guide);
        if (opt.done) {
            this.setState({
                tipText: '完成'
            })
        }
        this.setState({
            con: rect,
            guideCon: opt
        }, () => {
            drawRect(cnt, rect, 'rgba(0, 0, 0, .8)');
        })
        this.step = opt.step;
    }

    /**
     * 点击下一步执行逻辑
     */
    nextStep = () => {
        clearTimeout(this.timer);
        const { steps } = this.guides;
        const { guide, ...opt } = steps[this.step];
        const { nextStep, delay = 0, trigger = 'click', stop, next } = opt;
        guide[trigger]();
        if (opt.done) {
            this.setState({
                showModal: false,
                popShow: false
            }, () => {
                localStorage.setItem(this.props.guide, new Date * 1)
            })
            return false;
        }
        this.step = nextStep;
        if (stop) {
            return;
        }
        if (next) {
            const { targetElement, ...options } = next;
            const el = document.querySelector(targetElement);
            this.guides.steps[options.step] = {
                guide: el,
                ...options
            }
            this.step = options.step;
            this.start()
            return;
        }
        
        if (delay) {
            this.timer = setTimeout(() => {
                this.guides.steps = getSteps().steps;
                this.step = nextStep;
                this.start();
            }, delay)
        } else {
            this.step = nextStep;
            this.start();
        }
    }

    continue = () => {
        clearTimeout(this.timer);
        this.start();
    }

    render() {
        const { prefixCls, isGuide = true } = this.props;
        const { con, guideCon, showModal, popShow } = this.state;
        return (
            <div>
                
                {
                    showModal && <canvas id="mask-canvas" className="com-guide" />
                }
                {
                    popShow && <Popconfirm
                        visible
                        overlayClassName="pop-guide"
                        placement="bottomLeft"
                        title={guideCon.tip}
                        onConfirm={this.nextStep}
                        okText={this.state.tipText}
                    >
                        <div
                            className="com-guide-rect"
                            style={{
                                top: con.top,
                                left: con.left,
                                width: con.right - con.left,
                                height: con.bottom - con.top
                            }}
                        />
                    </Popconfirm>
                }
            </div>
        )
    }
}

export function Continue() {
    emitter.emit('guide-continue');
}

export default Guide;
