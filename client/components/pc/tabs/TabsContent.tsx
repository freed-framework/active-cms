import React from 'react';
import classNames from 'classnames';
import TabPane from './TabPane';

class TabsContent extends React.Component<TabsContentProps, any> {
    constructor(props: TabsContentProps) {
        super(props);
    }

    renderTitle() {
        const { children, activeKey } = this.props;

        return React.Children.map(children, (child: any) => {
            if (child && child.type === TabPane) {
                const cls = classNames('ac-tabs-content-items', {
                    'ac-tabs-content-items-active': activeKey === child.key
                });

                return (
                    <div className={cls}>{child}</div>
                );
            } else {
                return child;
            }
        });
    }

    render() {
        return (
            <div className="ac-tabs-content">
                { this.renderTitle() }
            </div>
        )
    }
}

export default TabsContent;
