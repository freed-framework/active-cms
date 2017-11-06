import * as React from 'react';

export interface goodsImageItemProps {
    style?: React.CSSProperties
}

export default class goodsImageItem extends React.PureComponent<goodsImageItemProps, any> {
    render() {
        const { style } = this.props;

        return (
            <div className="as-layer-goods"
                style={style}
            >
                    <img src="https://img14.360buyimg.com/cms/jfs/t4405/299/3446803520/85003/621aff74/5922ea46N7a8e115d.jpg" alt="" className="as-layer-goods-img" />
            </div>
        );
    }
}
