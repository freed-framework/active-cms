import * as React from 'react';

class TimeLimit {
    constructor(dur) {
        this.dur = dur;
        this.startTime = null;
        this.endTime = null;
        this.timerId = null;
        this.delta = 1000;
    }

    now() {
        return +new Date();
    }

    start(fn) {
        this.stop();

        // 设置结束时间
        this.startTime = this.now();
        this.endTime = this.now() + this.dur;

        // 未执行倒计时
        if (this.startTime >= this.endTime) {
            fn.call(this, null);
            return;
        }

        this.timerId = setInterval(() => {
            const diff = this.endTime - this.now();

            if (diff < this.dur) {
                fn.call(this, diff);
            } else {
                this.stop();
            }
        }, this.delta);
    }

    stop() {
        clearInterval(this.timerId);
    }
}

class Term extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            viewCls: 'tmc-term tmc-term-hide';
    }
    }

    componentDidMount() {
        const that = this;
        const range = this.props.range;
        const start = range[0];
        const end = range[1];
        let viewCls = '';

        const timeLimit = new TimeLimit(end - start);
        timeLimit.start(function(time) {
            console.log(this.now() >= start && this.now() <= end, time);
            if (this.now() >= start && this.now() <= end) {
                viewCls = 'tmc-term';
            } else {
                viewCls = 'tmc-term tmc-term-hide';

                this.stop();
            }

            that.setState({
                viewCls,
            })
        });
    }

    render() {
        return (
            <div className={this.state.viewCls}>
                {this.props.children}
            </div>
        );
    }
}

export default Term;
