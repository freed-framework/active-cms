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
export const px2rem = (px, rootFontSize = 100) => (
    px.replace(/(\d+)px/gi, (match, word) => (
        `${Number(word) / rootFontSize}rem`
    ))
)

/**
 * 直接将数字(string number)转换为 rem
 * @param px
 * @param rootFontSize
 */
export const num2rem = (px, rootFontSize = 100) => (
    px.toString().replace(/(\d+)$/gi, (match, word) => (
        `${Number(word) / rootFontSize}rem`
    ))
)

/**
 * 转换数据
 * @param data
 */
export const transPx = (data) => {
    const transExpr = /^(width|height|padding|margin)$/;
    const trans = JSON.parse(JSON.stringify(data));

    Object.keys(trans).forEach(k => {
        const item = trans[k];

        Object.keys(item).forEach(key => {
            if (transExpr.test(key)) {
                item[key] = num2rem(item[key]);
            }
        })
    });

    return trans;
}
