import React from 'react';
import TabPane from './TabPane';

class TabsTitle extends React.Component<TabsTitleProps, any> {
    constructor(props: TabsTitleProps) {
        super(props);
    }

    handleClick = (event: React.MouseEvent<any>) => {
        const key = event.currentTarget.getAttribute('data-key');
        this.props.onActive(key);
    }

    renderTitle() {
        const { children } = this.props;

        return React.Children.map(children, (child: any) => {

            if (child && child.type === TabPane) {
                return (
                    <div
                        className="ac-tabs-title-items"
                        data-key={child.key}
                        onClick={this.handleClick}
                    >
                        {child.props.tab}
                    </div>
                );
            } else {
                return child;
            }
        });
    }

    render() {
        return (
            <div className="ac-tabs-title">{this.renderTitle()}</div>
        )
    }
}

export default TabsTitle;
