/**
 * @file Dot.jsx
 * @author denglingbo
 *
 * Des
 */

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

        this.timer = null;
        this.pause = false;
    }

    /**
     * 散开初始化配置
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

    /**
     * 聚拢初始化配置
     */
    polymerizeInit() {
        this.ex = this.dx;
        this.ey = this.dy;
        this.ez = this.dz;
    }

    paint() {
        const { width, height, focalLength, radius, color, data, canvas } = this.props;
        const context = canvas.getContext('2d');
        const { r, g, b, a } = color;

        try {
            context.save();
            context.beginPath();

            const f = focalLength / (focalLength + this.z);

            context.arc(
                width / 2 + (this.x - width / 2) * f,
                height / 2 + (this.y - height / 2) * f,
                radius * f,
                0,
                2 * Math.PI
            );

            context.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + f + ')';

            context.fill();
            context.restore();
        } catch (ex) {}
    }

    fix() {
        const { canvas, data } = this.props;
        const context = canvas.getContext('2d');

        this.x = this.ex;
        this.y = this.ey;
        this.z = this.ez;

        context.putImageData(data, this.x, this.y);
    }
}

export default Dot;
