import * as React from 'react';

export interface GoodsProps {
    style: any
}

export default class GoodsItem extends React.PureComponent<GoodsProps, any> {
    render() {
        const { style } = this.props;

        return (
            <div className="as-layer-goods"
                style={style}
            >
                <div className="as-layer-goods-img-content">
                    <img src="https://img11.360buyimg.com/n7/jfs/t7684/231/3434426846/496810/9d8bbf11/59bf78daN55911b36.jpg" alt="" className="as-layer-goods-img"/>
                </div>
                <div className="as=layer-goods-main">
                    <a className="as-layer-goods-title">
                        瓷肌深层净化黑面膜10片 收缩毛孔清洁面膜  清爽补水保湿面膜贴 25g*10片
                    </a>
                    <div className="as-layer-goods-price">
                        <span className="as-layer-goods-price-tag">￥</span>
                        <span className="as-layer-goods-price-num">169</span>
                    </div>
                </div>
                <div className="as-layer-goods-btn">
                    <a className="as-layer-goods-btn-text">立即秒杀</a>
                </div>
            </div>
        );
    }
}
