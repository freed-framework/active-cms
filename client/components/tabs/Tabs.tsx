/// <reference path="./tabs.d.ts" />
import React from 'react';
import TabPane from './TabPane';
import TabsTitle from './TabsTitle';
import TabsContent from './TabsContent';
import './tabs.scss';

class Tabs extends React.Component<TabsProps, TabsState> {
    static TabPane = TabPane;

    constructor(props: TabsProps) {
        super(props);

        this.state = {
            activeKey: props.activeKey
        }
    }

    /**
     * 将原始数据组装成组件需要的数据格式
     * @param result
     * @return {{props: {activeKey}, childNodes: any[]}}
     */
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

    handleActive = (activeKey: string) => {
        this.setState({
            activeKey,
        })
    }

    public render(): JSX.Element {
        const props = {
            ...this.props,
            onActive: this.handleActive,
            activeKey: this.state.activeKey,
        };

        return (
            <div
                id={props.id}
                data-module={this.props.module}
                className="ac-tabs"
                style={{
                    ...(props.style && {...props.style.layout})
                }}
            >
                <TabsTitle {...props} />
                <TabsContent {...props} />
            </div>
        );
    }
}

export default Tabs;
