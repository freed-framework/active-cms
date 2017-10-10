
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import classNames from 'classnames';
import './control.scss';

class Control extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            // 可操作的组件的基本信息
            info: {},

            // 鼠标悬停的可操作组件的 ID
            hoverId: null,
        }
    }

    componentDidMount() {
        this.top.addEventListener('mouseover', this.lineHover);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.hoverId !== nextProps.hoverId) {
            this.setState({
                hoverId: nextProps.hoverId,
                info: nextProps.info,
            })
        }
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
        const { info } = this.state;
console.log(info)
        return (
            <div
                className="ec-edit-control"
                style={{
                    ...info
                }}
            >
                {this.renderLine(['top', 'right', 'bottom', 'left'])}
            </div>
        );
    }
}

export default Control;
