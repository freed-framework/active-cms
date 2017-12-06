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
