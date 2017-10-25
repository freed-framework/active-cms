/// <reference path="./tabs.d.ts" />
import React from 'react';
import TabPane from './TabPane';
import TabsTitle from './TabsTitle';
import TabsContent from './TabsContent';
import './tabs.scss';

const getTabs = (props: any) => {
    return (
        <div>
            <div><TabsTitle {...props} /></div>
            <div><TabsContent {...props} /></div>
        </div>
    );
}

class Tabs extends React.Component<TabsProps, TabsState> {
    static TabPane = TabPane;

    constructor(props: TabsProps) {
        super(props);

        this.state = {
            activeKey: props.activeKey
        }
    }

    static dataTrans(result: any) {
        const { data, activeKey } = result;
        const childNodes:any[] = [];

        data.forEach((d:any) => {
            childNodes.push(
                <TabPane key={d.key} tab={d.title}>
                    {d.content}
                </TabPane>
            )
        });

        return {
            props: {
                activeKey,
            },
            childNodes,
        };
    }

    componentWillReceiveProps(nextProps: TabsProps) {
        // if (is(nextProps))
    }

    handleActive = (activeKey: string) => {
        this.setState({
            activeKey,
        })
    }

    renderTabs() {
        const p = {
            ...this.props,
            onActive: this.handleActive,
            activeKey: this.state.activeKey,
        };

        return (
            <div>
                <div><TabsTitle {...p} /></div>
                <div><TabsContent {...p} /></div>
            </div>
        );
    }

    public render(): JSX.Element {
        const { style, id } = this.props;

        return (
            <div
                id={id}
                data-module={this.props.module}
                className="ac-tabs"
                style={{
                    ...(style && {...style.layout})
                }}
            >
                {this.renderTabs()}
            </div>
        );
    }
}

export default Tabs;
