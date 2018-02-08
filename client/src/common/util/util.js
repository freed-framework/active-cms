/**
 * @file util.js
 * @author denglingbo
 *
 */
import { fromJS } from 'immutable';
import utils from '../../../components/util/util';

/**
 * 创建子数据
 * @param data
 * @param guid
 * @param value
 * @return {any|*}
 */
export const createChildren = (data, guid, value) => {
    let $new = fromJS({});
    const $data = fromJS(data);

    utils.find($data, guid, ($finder, deep) => {
        if ($finder) {
            $new = $data.updateIn(deep, ($v) => {
                let $child = [];

                if (!$v.get('children')) {
                    $child = [value];
                } else {
                    $child = $v.get('children').push(value);
                }

                return $v.set('children', $child);
            });
        }
    }, {
        findBy: 'guid',
    });

    return $new.toJS();
}

/**
 * 获取元素的基本信息
 * 如果传入 parent 则表示为 mobile 编辑模式， mobile 使用了缩放，故此处有特殊处理
 * @param target click target
 * @param parent canvas-inner
 * @return {{width: Number, height: Number, left: number, top: number}}
 */
export const getRect = (target, parent = null) => {
    const rect = target.getBoundingClientRect();
    const parentRect = parent ? parent.getBoundingClientRect() : {
        left: 0,
        top: 0,
    };
    const scrollLeft = parent ? parent.scrollLeft : 0;
    const scrollTop = parent ? parent.scrollTop : 0;
    const scale = parent ? 2 : 1;

    return {
        width: rect.width * scale,
        height: rect.height * scale,
        left: (rect.left - parentRect.left) * scale + scrollLeft + window.scrollX,
        top: (rect.top - parentRect.top) * scale + scrollTop + window.scrollY,
    }
}

/**
 * 滚动某元素
 * @param outerEl
 * @param target
 * @param scale
 */
export const scrollDom = (outerEl, target, scale = 1) => {
    const st = outerEl.scrollTop / scale;
    const outerRect = outerEl.getBoundingClientRect();
    const rect = target.getBoundingClientRect();

    outerEl.scrollTop = (st + rect.top - outerRect.top) * scale;
}

/**
 * 将 px 转换为 rem
 * @param {string} px
 * @param {number} rootFontSize
 */
// export const px2rem = (px) => {
//     const fontSize = window.document.documentElement.style.fontSize || '100px';
//     const num = Number(fontSize.replace('px', ''));
//
//     return px.replace(/(\d+)px/gi, (match, word) => (
//         `${Number(word) / num}rem`
//     ))
// };

/**
 * 直接将数字(string number)转换为 rem
 * @param px
 */
export const num2rem = (px, rootFontSize) => {
    // 获取当前 fontSize
    const fontSize = '100px';
    const num = Number(fontSize.replace('px', ''));
    let str = px;

    if (typeof str === 'number') {
        str = parseInt(str, 10);
    }

    const r = str.toString().replace(/(\d+)[px]*/gi, (match, word) => {
        return `${Number(word) / num}rem`;
    });

    return r;
}

/**
 * 
 * @param {*} number 
 * @param {*} precision 保留几位小数
 */
function toFixed(number, precision) {
    let multiplier = Math.pow(10, precision + 1);
    let wholeNumber = Math.floor(number * multiplier);

    return Math.round(wholeNumber / 10) * 10 / multiplier;
}

const pxReg = /(\d+(\.\d+)?)[px]*/gi;

/**
 * 将px 转换为视角单位
 * @param {*} px 
 */
const px2viewport = (px) => (
    px.toString().replace(pxReg, (match, word) => {
        const pixel = parseFloat(word);

        if (pixel === 0) {
            return pixel;
        }
        
        return `${toFixed(pixel / 750 * 100, 5)}vw`;
    })
);

const transExpr = /^(width|.*height|left|top|right|bottom|padding.*|margin.*|border.*)/;

/**
 * 转换数据
 * @param data
 */
export const transPx = (data) => {
    const trans = JSON.parse(JSON.stringify(data));

    Object.keys(trans).forEach(k => {
        const item = trans[k];

        if (item) {
            Object.keys(item).forEach(key => {
                const expr = transExpr.exec(key);

                if (expr) {
                    item[key] = px2viewport(item[key]);
                }
            });
        }
    });

    return trans;
}

/**
 * 获取组件展示名
 * @param data
 * @return {*}
 */
export const getDisplayName = (data = {}) => {
    if (data.displayName) {
        return data.displayName;
    }

    if (data.config && data.config.displayName) {
        return data.config.displayName;
    }

    return null;
}
