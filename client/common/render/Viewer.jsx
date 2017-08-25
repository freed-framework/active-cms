/**
 * @file Viewer.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';

class Viewer extends PureComponent {

    render() {
        const { data } = this.props;

        if (!data || !data.Viewer) {
            return null;
        }

        return <data.Viewer />;
    }
}

export default Viewer;
