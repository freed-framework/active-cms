import * as React from 'react';
import TimeLimit from './timeLimit';

class TermProps {
    range: number[];
}

const now = (): number => +new Date();

class Term extends React.PureComponent<TermProps, any> {
    private timeLimit: TimeLimit;

    /**
     * 判断是否在指定范围内
     * @param s 指定开始时间戳
     * @param e 指定结束时间戳
     * @return {boolean}
     */
    private isInRange(s?: number, e?: number) {
        const n = now();
        const { range } = this.props;
        const start = s || range[0];
        const end = e || range[1];

        return n >= start && n <= end;
    }

    constructor(props: TermProps) {
        super(props);

        this.state = {
            inRange: this.isInRange(),
        };
    }

    componentDidMount() {
        const range = this.props.range;
        const start = range[0];
        const end = range[1];
        this.timeLimit = new TimeLimit({
            start,
            end,
        });

        this.timeLimit.start((time: number, status: number) => {
            const inRange = status === 1;

            if (this.state.inRange !== inRange) {
                this.setState({
                    inRange,
                });
            }
        });
    }

    componentWillUnmount() {
        this.timeLimit.stop();
    }

    render() {
        const cls = `tmc-term ${!this.state.inRange ? 'tmc-term-hide' : ''}`;

        return (
            <div className={cls}>
                {this.props.children}
            </div>
        );
    }
}

export default Term;
