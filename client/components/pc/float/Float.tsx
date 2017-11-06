import * as React from 'react';

export interface AppProps {
    children?: React.ReactNode,
    style?: object
}

class Float extends React.Component<AppProps, any> {
    render() {
        return (
            <div
                className="as-float"
            >
                {this.props.children}
            </div>
        );
    }
}

export default Float;
