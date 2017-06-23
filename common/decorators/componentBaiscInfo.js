/**
 * @file componentBaiscInfo.js
 * @author denglingbo
 *
 */
import Utils from '../util/util';

export default (name) => {
    return (target, key, descriptor) => {
        // 添加一个 组件 ID
        target.cid = Utils.guid();

        target.type = name;
    }
}
