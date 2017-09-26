/// <reference path="./tabs.d.ts" />
import React from 'react';
import classNames from 'classnames';
import './tab.scss';

class Tabs extends React.Component<TabsProps, TabsState> {
    constructor(props: TabsProps) {
        super(props);

        this.state = {
            data: [
                {
                    id: 'aasd1-12313',
                    title: 'Tab 1',
                    content: 'Content 1',
                },
                {
                    id: 'bbssa-12313',
                    title: 'Tab 2',
                    content: 'Content 2',
                },
            ],
            activeId: 'aasd1-12313',
        }

        this.handleActive = this.handleActive.bind(this);
    }

    handleActive(event: React.MouseEvent<any>) {
        const activeId = event.currentTarget.getAttribute('data-id');

        this.setState({
            activeId,
        })
    }

    public render(): JSX.Element {
        const { style } = this.props;
        const { data, activeId } = this.state;

        return (
            <div
                className="ac-tabs"
                style={{
                    ...(style && {...style.layout})
                }}
            >
                {this.props.children}
                <div
                    className="ac-tabs-menu"
                    style={{
                        ...(style && {...style.title})
                    }}
                >
                    {data.map(item => (
                        <div
                            key={item.id}
                            data-id={item.id}
                            className="ac-tabs-menu-items"
                            onClick={this.handleActive}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
                <div
                    className="ac-tabs-main"
                    style={{
                        ...(style && {...style.main})
                    }}
                >
                    {data.map(item => (
                        <div
                            key={item.id}
                            className={classNames('ac-tabs-main-items', {
                                'ac-tabs-main-items-hide': activeId !== item.id
                            })}
                        >
                            {item.content}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Tabs;
