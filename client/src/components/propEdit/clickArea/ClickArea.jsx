/**
 * @file ClickArea.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';

class ClickArea extends PureComponent {
    handleChange = () => {

    }

    render() {
        const {target, guid} = this.props;

        return (
            <div>
                <div>{target}</div>
                <div>
                    <label htmlFor="">链接</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="width"
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="">图片</label>
                </div>
            </div>
        );
    }
}

export default ClickArea;
