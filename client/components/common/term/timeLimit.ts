/**
 * @file timeLimit.ts
 * @author denglingbo
 *
 * 计时器
 */
const TYPE = {
    // 还未开始
    NOTYET: -1,
    // 进行中
    PROCESS: 1,
    // 执行结束
    DONE: 2,
    // 数据异常
    ERROR: -2,
};

class Options {
    start: number;
    end: number;
    delta?: number;
}

const defaultOptions: Options = {
    start: 0,
    end: 0,
    delta: 1000,
};

class TimeLimit {
    private startTime: number;
    private endTime: number;
    private timerId: number | null;
    private delta?: number;

    constructor(options: Options) {
        const opts: Options = {
            ...defaultOptions,
            ...options,
        };

        this.timerId = null;
        // 设置开始时间
        this.startTime = opts.start;
        // 设置结束时间
        this.endTime = opts.end;
        // 间隔检查时间 ms
        this.delta = opts.delta;
    }

    static now(): number {
        return +new Date();
    }

    /**
     * 定时器
     * @param fn
     */
    private tick(fn: Function): void {
        const n = TimeLimit.now();
        const limitTime = this.endTime - n;
        const dur = this.endTime - this.startTime;

        // 如果还没达到开始时间
        if (this.startTime > n) {
            fn.call(
                this,
                n - this.startTime,
                TYPE.NOTYET,
            );
            return;
        }

        if (limitTime > 0 && limitTime < dur) {
            fn.call(this, limitTime, TYPE.PROCESS);
        } else {
            this.stop();
            fn.call(this, 0, TYPE.DONE);
        }
    }

    /**
     * 开始执行
     * @param fn
     */
    public start(fn: Function): void {
        this.stop();

        // 异常：开始时间大于结束时间
        if (this.startTime >= this.endTime) {
            fn.call(this, null, TYPE.ERROR);
            return;
        }

        this.timerId = setInterval(() => this.tick(fn), this.delta);
    }

    /**
     * 结束
     */
    public stop(): void {
        clearInterval(this.timerId);
        this.timerId = null;
    }
}

export default TimeLimit;
