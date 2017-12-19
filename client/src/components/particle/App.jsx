/**
 * @file App.jsx
 * @author denglingbo
 *
 *
 * 对于 ImageData 对象中的每个像素，都存在着四方面的信息，即 RGBA 值：

 R - 红色 (0-255)
 G - 绿色 (0-255)
 B - 蓝色 (0-255)
 A - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)

 red = imgData.data[0];
 green = imgData.data[1];
 blue = imgData.data[2];
 alpha = imgData.data[3];

 TODO 容我慢慢优化吧

 */
import React, { PureComponent } from 'react';
import { setHiDPICanvas } from './dpi';
import classNames from 'classnames';
import Dot from './Dot';
import './app.scss';

function throttle(fn, delta, context) {
    return function() {
        var args = arguments;
        var then = 0;

        function repeat(now) {
            requestAnimationFrame(repeat);
            if (now - then >= delta) {
                then = now;
                fn.call(context, args);
            }
        }

        requestAnimationFrame(repeat);
    }
}

/**
 * 动画函数
 * @param t 当前时间 startTime - currentTime
 * @param b 初始值
 * @param c 变化量
 * @param d 持续时间
 * @return {*}
 */
const cubicEaseIn = (t, b, c, d) => {
    return c * (t /= d) * t * t + b;
}

let pause = false;
let derection = true;
let lastTime;
let timer = null;

class Particle extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            animateEnd: true,
        }
    }

    componentDidMount() {
        this.loadImage();
        // setHiDPICanvas(this.canvas, this.props.width, this.props.height);
    }

    getImgData() {
        const { width, height } = this.props;
        const dots = [];
        const context = this.canvas.getContext('2d');
        const imgData = context.getImageData(0, 0, width, height);

        const radius = 1;
        const step = 3;

        for (let x = 0; x < imgData.width; x += step) {
            for (let y = 0; y < imgData.height; y += step) {
                // imagedata 读取的像素数据存储在data属性里
                // 是从上到下，从左到右的，每个像素需要占用4位数据
                // 分别是 r, g, b, alpha 透明通道
                const i = (y * imgData.width + x) * 4;

                // 将透明度大于 x 的像素点位置存入数组 dots
                if (imgData.data[i + 3] >= 100) {
                    const dot = new Dot({
                        canvas: this.canvas,
                        data: context.getImageData(x, y, 1, 1),
                        centerX: x,
                        centerY: y,
                        centerZ: 0,
                        radius,
                        width,
                        height,
                        color: {
                            r: imgData.data[i],
                            g: imgData.data[i + 1],
                            b: imgData.data[i + 2],
                            a: imgData.data[i + 3],
                        }
                    });

                    dots.push(dot);
                }
            }
        }

        return dots;
    }

    loadImage() {
        const {
            imgUrl,
            width,
            height,
        } = this.props;

        const img = new Image();

        img.src = imgUrl;
        img.onload = () => {
            const ys = img.height / height;
            const xs = img.width / width;
            const s = Math.max(xs, ys);

            this.canvas.getContext('2d').drawImage(img, 0, 0, width, height);

            this.dots = this.getImgData();
        }
    }

    animate(dots, finishCallback) {
        const canvas = this.canvas;
        const context = canvas.getContext('2d');
        const { width, height } = this.props;
        let lastTime = +new Date();
        let thisTime = +new Date();

        const start = +new Date();
        const dur = 500;

        function run() {
            context.clearRect(0, 0, width, height);
            let thisTime = +new Date();

            dots.forEach(dot => {
                // dot 动画到达终点
                if (Math.abs(dot.ex - dot.x) <= 0.1
                    && Math.abs(dot.ey - dot.y) <= 0.1
                    && Math.abs(dot.ez - dot.z) <= 0.1
                ) {
                    if (thisTime - lastTime > 300) {
                        dot.fix();
                        pause = true;
                    }

                    if (finishCallback) {
                        finishCallback();
                    }
                    return;
                } else {
                    dot.x = dot.x + (dot.ex - dot.x) * 0.1;
                    dot.y = dot.y + (dot.ey - dot.y) * 0.1;
                    dot.z = dot.z + (dot.ez - dot.z) * 0.1;
                    lastTime = +new Date();
                }

                dot.paint();
            });

            if (!pause && 'requestAnimationFrame' in window) {
                timer = requestAnimationFrame(run);
            }
        }

        clearTimeout(() => {
            pause = true;
            cancelAnimationFrame(timer);
        }, 5000);

        run();
    }

    handleEnter = () => {
        this.setState({
            animateEnd: false,
        }, () => {
            pause = false;
            window.cancelAnimationFrame(timer);
            const dots = this.dots;
            dots.forEach(dot => {
                dot.disperseInit();
            });

            this.animate(dots);
        });
    }

    handleLeave = () => {
        pause = false;
        window.cancelAnimationFrame(timer);
        const dots = this.dots;
        dots.forEach(dot => {
            dot.polymerizeInit();
        });

        this.animate(dots, () => {
            this.setState({
                animateEnd: true,
            });
        });
    }

    render() {
        const {
            width,
            height,
            imgUrl,
        } = this.props;

        const { animateEnd } = this.state;

        return (
            <div className="particle-outer">
                <canvas
                    className={classNames('particle-canvas', {
                        'particle-canvas-visible': !animateEnd,
                    })}
                    ref={ref => { this.canvas = ref }}
                    width={width}
                    height={height}
                    onMouseOver={this.handleEnter}
                    onMouseOut={this.handleLeave}
                >
                    No Canvas
                </canvas>
                <div className={classNames('particle-img', {
                    'particle-img-visible': animateEnd,
                })}>
                    <img
                        src={imgUrl}
                        height={height}
                    />
                </div>
            </div>
        );
    }
}

export default Particle;
