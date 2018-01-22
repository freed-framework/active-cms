class TimeLimit {
    private dur: number;
    private startTime: number | null;
    private endTime: number | null;
    private timerId: number | null;
    private delta: number;

    constructor(dur: number) {
        this.dur = dur;
        this.startTime = null;
        this.endTime = null;
        this.timerId = null;
        this.delta = 1000;
    }

    public now(): number {
        return +new Date();
    }

    public start(fn: Function): void {
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

    public stop(): void {
        clearInterval(this.timerId);
    }
}

export default TimeLimit;
