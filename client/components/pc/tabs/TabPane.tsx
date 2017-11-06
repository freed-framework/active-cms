import React from 'react';

class TabPane extends React.Component<TabPaneProps, any> {
    public render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export default TabPane;
