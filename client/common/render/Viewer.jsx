/**
 * @file Viewer.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import Lazyer from '../Lazyer';

class Viewer extends PureComponent {
    loop(data) {
        return data.map(item => (
            <div
                key={item.guid}
            >
                <Lazyer item={item}>
                    {mod => (
                        <mod.App style={item.style}>
                            {item.children && this.loop(item.children)}
                        </mod.App>
                    )}
                </Lazyer>
            </div>
        ));
    }

    render() {
        const { data } = this.props;

        if (!data) {
            return null;
        }

        return (
            <div>
                {this.loop(data)}
            </div>
        );
    }
}

export default Viewer;
