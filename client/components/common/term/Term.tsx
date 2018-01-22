import * as React from 'react';
import TimeLimit from './timeLimit';

class TermProps {
    range: number[];
}

class Term extends React.PureComponent<TermProps, any> {
    private timeLimit: TimeLimit;

    constructor(props: TermProps) {
        super(props);

        this.state = {
            inRange: true,
        };
    }

    componentDidMount() {
        let inRange = this.state.inRange;
        const that = this;
        const range = this.props.range;
        const start = range[0];
        const end = range[1];
        this.timeLimit = new TimeLimit(end - start);

        this.timeLimit.start(function() {
            if (this.now() >= start && this.now() <= end) {
                inRange = true;
            } else {
                inRange = false;

                this.stop();
            }

            if (that.state.inRange !== inRange) {
                that.setState({
                    inRange,
                });
            }
        });
    }

    componentWillUnmount() {
        this.timeLimit.stop();
    }

    render() {
        const range = this.props.range;
        const start = range[0];
        const end = range[1];
        const cls = `tmc-term ${!this.state.inRange ? 'tmc-term-hide' : ''}`;

        return (
            <div className={cls}>
                {this.props.children}
            </div>
        );
    }
}

export default Term;
