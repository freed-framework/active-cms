/**
 * @file util.js
 * @author denglingbo
 *
 */
import { fromJS } from 'immutable';

class utils {

    /**
     * 获取 guid
     * refer to http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
    static guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 通过 val 通过父节点对应的 key 的value 进行查找
     *
     * @param $arr Immutable Array
     * @param val 要匹配的值
     * @param callback 回调函数
     *  1. finder
     *  2. deep 查找的深度
     *  3. child
     *  4. items 匹配到 options.findBy 的时候其他节点的数据
     * @param options
     *  options.childKey, 子节点 key
     *  options.findBy, 通过父节点某 key 与 val 进行匹配
     *  options.deepItemKey, 返回匹配到 findBy 的条件的要返回到 itemsDeep 中的其他匹配的数据
     * @param findDeep 查找深度
     * @param itemsDeep 匹配的节点
     * @return Callback Function
     */
    static find(
        $arr,
        val,
        callback,
        options = {},
        findDeep = [],
        itemsDeep = []
    ) {
        const opts = {
            childKey: 'children',
            findBy: 'key',
            deepItemKey: null,
        };

        Object.assign(opts, options);

        if (val == null) {
            return callback(null);
        }

        $arr.forEach((item, i) => {
            const $child = item.get(opts.childKey);
            let v = '';

            if (opts.deepItemKey != null) {
                v = item.get(opts.deepItemKey);
            }

            if (item.get(opts.findBy) === val) {
                // 储存匹配到的深度
                findDeep = findDeep.concat(i);
                itemsDeep = itemsDeep.concat(v);

                // 返回匹配值
                return callback(item, findDeep, $child, itemsDeep);
            }

            // 如果存在子节点则继续查找
            if ($child) {
                // 储存匹配到的深度
                return this.find(
                    $child,
                    val,
                    callback,
                    opts,
                    findDeep.concat([i, opts.childKey]),
                    itemsDeep.concat(v)
                );
            }

            return null;
        });
        return null;
    }

    /**
     * 通过 guid 删除数据
     * @param data
     * @param guid
     * @return {any|*}
     */
    static deleteByGuid(data, guid) {
        let $new = fromJS({});
        const $data = fromJS(data);

        this.find($data, guid, ($finder, deep) => {
            if ($finder) {
                $new = $data.deleteIn(deep);
            }
        }, {
            findBy: 'guid',
        });

        return $new.toJS();
    }
}

export default utils;
