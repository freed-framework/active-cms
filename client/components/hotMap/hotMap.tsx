import * as React from 'react';

export interface AppProps {
    children: React.ReactNode
    attrs?: {style?: any, href?: string}
}

class hotMap extends React.Component<AppProps, any> {
    render() {
        console.log(this.props)
        const { attrs = {} } = this.props;
        const { style = {} } = attrs;
        return (
            <a
                className="position_absolute"
                href={attrs.href}
                style={{...style.layout}}
                target="_blank"
            >
                {this.props.children}
            </a>
        );
    }
}

export default hotMap;
