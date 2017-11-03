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
 * @param target
 * @return {{width: Number, height: Number, left: number, top: number}}
 */
export const getRect = (target) => {
    const rect = target.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    }
}
