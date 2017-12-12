/**
 * @file guide.jsx
 * @author shijh
 *
 * 新手引导组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popconfirm, Popover } from 'antd';
import ReactDOM from 'react-dom';
import { getRect } from '../../utils';

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


class Guide extends Component {
    static propTypes = {
        prefixCls: 'com-guide'
    }

    constructor(props) {
        super(props);
        this.guides = [];
        this.keys = [];
        this.step = 0;
        this.steps = {};

        this.state = {
            con: {},
            guideCon: {},
            showModal: false
        }
    }

    componentDidMount() {
        this.guides = document.querySelectorAll('.anchor-for-guide');
        if (this.guides.length > 0) {
            this.setState({
                showModal: true
            }, () => {
               
                this.steps = {}
                const dom = document.querySelector('#mask-canvas');
                const { scrollWidth, scrollHeight } = document.body;
                dom.height = scrollHeight;
                dom.width = scrollWidth;
                const cnt = dom.getContext('2d');
                for (let i = 0; i < this.guides.length; i++) {
                    const guide = this.guides[i];
                    const data = guide.getAttribute('data-guide');
                    let options = {}

                    if (!data) { continue; }
        
                    try {
                        options = JSON.parse(data)
                    } catch (e) {
                        console.error(e);
                    }

                    this.steps[options.index] = {
                        ...options,
                        guide,
                        cnt
                    }
                }
        
                this.step = 0;
                this.keys = Object.keys(this.steps);
  
                this.startGuide()
            })
        }
    }

    startGuide = () => {
        const {guide, cnt, ...opt} = this.steps[this.keys[this.step]];
        const rect = getRect(guide);
        this.setState({
            con: rect,
            guideCon: opt
        }, () => {
            drawRect(cnt, rect, 'rgba(0, 0, 0, .2)');
        })
        this.step += 1;
    }

    nextStep = (e) => {
        const isLast = this.keys.length === this.step;
        if (isLast) {
            this.setState({
                showModal: false
            })
        } else {
            this.startGuide();
        }
    }

    render() {
        const { prefixCls } = this.props;
        const { con, guideCon, showModal } = this.state;
        return (
            <div>
                
                {
                    showModal && <canvas id="mask-canvas" className="com-guide" />
                }
                {
                    showModal && <Popconfirm
                        visible
                        placement="topLeft"
                        title={guideCon.tip}
                        onConfirm={this.nextStep}
                        okText={ this.keys.length === this.step ? "ok" : "下一步"}
                    >
                        <div
                            className="com-guide-rect"
                            style={{
                                top: con.top,
                                left: con.left,
                                width: con.right - con.left,
                                height: con.bottom - con.top
                            }}
                        ></div>
                    </Popconfirm>
                }
            </div>
        )
    }
}

export default Guide;
