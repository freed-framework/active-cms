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
     * 向指定位置插入值
     * @param {Array} data 目标数组 
     * @param {Array} path 需要追加的位置 
     * @param {Object} value 需要插入的值
     */
    static appendChild(data, path, last, value) {
        const delength = path.length;

        let re = data.toJS();

        for (let i = 0; i < delength; i++) {
            re = re[path[i]];
            if (i === delength - 1) {
                re.splice(last, 0, value.toJS());
            }
        }

        return re;
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

    /**
     * 通过 guid 复制内容
     * @param data
     * @param guid
     * @return {any|*}
     */
    static copyByGuid(data, guid) {
        let $new = fromJS({});
        const $data = fromJS(data);

        this.find($data, guid, ($finder, deep) => {
            $new = $finder;
        }, {
            findBy: 'guid',
        });

        return $new.toJS();
    }

    /**
     * 通过 guid 粘贴内容
     * @param data
     * @param guid
     * @param copyData
     * @return {any|*}
     */
    static pasteByGuid(data, guid, copyData) {
        let $new = fromJS({});
        const $data = fromJS(data);

        this.find($data, guid, ($finder, deep) => {
            const setBy = deep.concat(['children']);
            const child = $finder.toJS().children || [];

            // 防止guid重复
            child.push(this.changeGuid([copyData])[0])

            const $child = fromJS(child);

            $new = $data.setIn(setBy, $child);
        }, {
            findBy: 'guid',
        });

        return $new.toJS();
    }

    /**
     * 移动组件
     * @param {Array} data 页面数据
     * @param {string} startId 组件id
     * @param {string} endId 组件id
     */
    static move(data, startId, endId) {
        const $data = fromJS(data);
        let $new = fromJS([]);

        let startData = fromJS({});
        let startDeep = [];
        let endData = fromJS({});
        let endDeep = [];

        // 获取开始元素的内容与路径
        this.find($data, startId, ($finder, deep) => {
            startData = $finder;
            startDeep = deep;
        }, { findBy: 'guid' })

        // 获取结束位置的内容与路径
        this.find($data, endId, ($finder, deep) => {
            endData = $finder;
            endDeep = deep;
        }, { findBy: 'guid' })

        const endDeepLength = endDeep.length;
        const newEndDeep = endDeep.slice(0, endDeepLength - 1);
        const startDeepLength = startDeep.length;

        // 暂时只支持同级元素之间的移动
        if (startDeep.slice(0, startDeep.length - 1).join(',') !== newEndDeep.join(',')) {
            $new = false;
            return;
        }

        const startLast = startDeep[startDeepLength - 1];
        const endLast = endDeep[endDeepLength - 1];
        const last = startLast > endLast ? endLast : endLast - 1;

        // 删除开始元素
        $new = $data.deleteIn(startDeep);

        if (endDeepLength === 1) {
            $new = $new.toJS();
            $new.splice(endLast, 0, startData.toJS());
        } else {
            const targetChild = this.appendChild($new, newEndDeep, endLast, startData);
            $new = $new.setIn(newEndDeep, targetChild).toJS();
        }

        return $new;
    }

    /**
     * 复制后修改guid
     * @param {Array} arr 
     */
    static changeGuid(arr) {
        return arr.map((item) => {

            if (item.guid) {
                item.guid = `ec-module-${this.guid()}`;
            }

            if (item.children && item.children.length) {
                this.changeGuid(item.children)
            }

            return item;
        })
    }
}

export default utils;
