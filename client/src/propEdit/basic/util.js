/**
 * @file util.js
 * @author denglingbo
 *
 */

class Util {
    /**
     * 将 margin 字符串转换为数组 @eg: '56px 0 0 68px'
     * @param marginString
     * @return {Array}
     */
    static marginString2Array(marginString = '0 0 0 0') {
        let arr = marginString.split(' ');

        if (arr.length !== 4) {
            return [0, 0, 0, 0];
        }

        return arr.map(v => parseFloat(v.replace(/px/, '')));
    }

    static getDomOffset() {

    }

    /**
     * 通过 dom 的 position 属性修正传入的 rect 属性
     * @param rect
     * @param style
     * @param options, { offsetLeft: x, offsetTop: x, ... }
     * @return {object}
     */
    static fixRectByPosition(rect, style = {}, options = {}) {
        const info = {...rect};
        const { position = 'static' } = style;
        const {
            offsetLeft = 0,
            offsetTop = 0,
            prevDomTop = 0,
            parentNodeInfo = {},
        } = options;
        const margin = this.marginString2Array(style.margin);

        if (position === 'static') {
            if (info.left !== undefined) {
                margin[3] = `${margin[3] + info.left - offsetLeft}px`;
                delete info.left;
            }

            if (info.top !== undefined) {
                margin[0] = `${margin[0] + info.top - offsetTop}px`;
                delete info.top;
            }

            info.margin = margin.join(' ');
        } else {
            // 判断当前元素是否需要有偏移量
            const isDomOffset =
                // 当前 DOM 是相对定位
                position === 'relative' ||
                // 当前元素是绝对定位，父级为非默认定位
                (position === 'absolute' && parentNodeInfo.position !== 'static');

            // relative 减去 距离上一个文档流的距离
            const pleft = isDomOffset ? parentNodeInfo.left : 0;
            const ptop = isDomOffset ? parentNodeInfo.top : 0;

            info.left = info.left - pleft - margin[3];
            info.top = info.top - ptop - margin[0];
        }

        return info;
    }


    /**
     * 获取 components 组件下的 exclude 配置
     * @param excludeArr, 需要排除的列表
     * @param key
     * @return {Object}
     */
    static attrExclude(excludeArr = [], key) {
        const res = {
            // 1: 排除
            // 0: 部分排除
            // -1: 不排除
            code: -1,

            // 当 code 为 0 的时候，需要被排除的子列表
            sub: null,
        };

        for (let i = 0; i < excludeArr.length; i ++) {
            const item = excludeArr[i];
            const strArr = item.split(':');
            // 对应 key
            const name = strArr[0];
            // 对应的 key 要排除的列表
            const list = strArr[1];

            if (name === key) {
                // 部分排除
                if (list) {
                    res.code = 0;
                    res.sub = list.split(',');
                } else {
                    // 完全匹配
                    res.code = 1;
                }

                return res;
            }
        }

        return res;
    }
}

export default Util;
