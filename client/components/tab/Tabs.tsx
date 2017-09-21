/**
 * @file Tab.tsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';
import './tab.scss';

interface TabsProps {
    style: {
        layout: object;
        title: object;
        main: object;
    };
}

interface TabsState {

}

class Tabs extends React.Component<TabsProps, TabsState> {
    constructor(props: TabsProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { style } = this.props;

        return (
            <div
                className="ac-tab"
                style={{
                    ...(style && {...style.layout})
                }}
            >
                {this.props.children}
                <div
                    className="ac-tab-menu"
                    style={{
                        ...(style && {...style.title})
                    }}
                >
                    <div>tab 1</div>
                    <div>tab 2</div>
                </div>
                <div
                    className="ac-tab-main"
                    style={{
                        ...(style && {...style.main})
                    }}
                >
                    <div>content 1</div>
                    <div>content 2</div>
                </div>
            </div>
        );
    }
}

export default Tabs;
