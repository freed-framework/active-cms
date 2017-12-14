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

 */
import React, { PureComponent } from 'react';
import { setHiDPICanvas } from './dpi';
import classNames from 'classnames';
import './app.scss';

class Dot {
    constructor(props) {
        this.props = Object.assign({
            // 默认焦距
            focalLength: 80,
        }, props);

        const {
            centerX,
            centerY,
            centerZ,
        } = this.props;

        // 默认轴 坐标
        this.dx = centerX;
        this.dy = centerY;
        this.dz = centerZ;

        // 当前轴 坐标
        this.x = centerX;
        this.y = centerY;
        this.z = centerZ;

        // 目标(终点)轴 坐标
        this.ex = 0;
        this.ey = 0;
        this.ez = 0;
    }

    fix() {
        this.x = this.ex;
        this.y = this.ey;
        this.z = this.ez;
    }

    /**
     * 散开初始化配置
     * @param canvas
     */
    disperseInit() {
        const { width, height, focalLength } = this.props;

        this.x = this.dx;
        this.y = this.dy;
        this.z = this.dz;
        this.ex = Math.random() * width;
        this.ey = Math.random() * height;
        this.ez = Math.random() * focalLength * 2 - focalLength;
    }

    polymerizeInit() {
        this.ex = this.dx;
        this.ey = this.dy;
        this.ez = this.dz;
    }

    paint(canvas) {
        const context = canvas.getContext('2d');
        const { width, height, focalLength, radius, color } = this.props;
        const { r, g, b } = color;

        context.save();
        context.beginPath();

        const a = focalLength / (focalLength + this.z);

        context.arc(
            width / 2 + (this.x - width / 2) * a,
            height / 2 + (this.y - height / 2) * a,
            radius * a,
            0,
            2 * Math.PI
        );

        context.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

        context.fill();
        context.restore();
    }
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

        this.context = this.canvas.getContext('2d');

        // setHiDPICanvas(this.canvas, this.props.width, this.props.height);
    }

    getImgData() {
        const { width, height } = this.props;
        const dots = [];
        const imgData = this.context.getImageData(0, 0, width, height);

        const radius = 1;
        // 隔 N - 1 个像素点取值
        const step = 4;

        for (let x = 0; x < imgData.width; x += step) {
            for (let y = 0; y < imgData.height; y += step) {

                // imagedata 读取的像素数据存储在data属性里
                // 是从上到下，从左到右的，每个像素需要占用4位数据
                // 分别是 r, g, b, alpha 透明通道
                const i = (y * imgData.width + x) * 4;
                // const i =

                // 将透明度大于 x 的像素点位置存入数组 dots
                // if (imgData.data[i + 3] >= 128) {
                // if (imgData.data[i] !== 0) {
                    const dot = new Dot({
                        centerX: x - radius * .5,
                        centerY: y - radius * .5,
                        centerZ: 0,
                        radius: radius,
                        width,
                        height,
                        color: {
                            r: imgData.data[i],
                            g: imgData.data[i + 1],
                            b: imgData.data[i + 2],
                        }
                    });

                    dots.push(dot);
                // }
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

            this.context.drawImage(img, 0, 0, width, height);

            this.dots = this.getImgData();
        }
    }

    animate(dots, finishCallback) {
        const canvas = this.canvas;
        const context = this.context;
        const { width, height } = this.props;

        function run() {
            context.clearRect(0, 0, width, height);

            dots.forEach(dot => {

                // dot 动画到达终点
                if (Math.abs(dot.ex - dot.x) < 0.1
                    && Math.abs(dot.ey - dot.y) < 0.1
                    && Math.abs(dot.ez - dot.z) < 0.1
                ) {
                    dot.fix();
                    pause = true;

                    if (finishCallback) {
                        finishCallback();
                    }
                } else {
                    dot.x = dot.x + (dot.ex - dot.x) * 0.1;
                    dot.y = dot.y + (dot.ey - dot.y) * 0.1;
                    dot.z = dot.z + (dot.ez - dot.z) * 0.1;
                }

                dot.paint(canvas);
            });

            if (!pause && 'requestAnimationFrame' in window) {
                timer = requestAnimationFrame(run);
            }
        }

        clearTimeout(() => {
            pause = true;
            window.cancelAnimationFrame(timer);
        }, 5000);

        run();
    }

    handleEnter = () => {
        this.setState({
            animateEnd: false,
        }, () => {
            window.cancelAnimationFrame(timer);
            pause = false;
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
            console.log('done')

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
