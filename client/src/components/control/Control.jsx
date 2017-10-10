
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './control.scss';

class Control extends PureComponent {
    constructor(props) {
        super(props);


    }

    componentDidMount() {
        this.top.addEventListener('mouseover', this.lineHover);
    }

    lineHover() {

    }

    renderLine(arr) {
        return arr.map(k => {
            const cls = classNames(`ec-edit-control-line ec-edit-control-${k}`);

            return (
                <div
                    key={k}
                    ref={ref => { this[k] = ref }}
                    className={cls}
                />
            )
        })
    }

    render() {
        return (
            <div
                className="ec-edit-control"
            >
                {this.renderLine(['top', 'right', 'bottom', 'left'])}
            </div>
        );
    }
}

export default Control;
