/**
 * @file Item.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import Bar from '../bar';

const Item = (props) => {
    const item = props.item;
    const { guid, module = {} } = item;

    return (
        <div
            key={guid}
            className="ec-panel-item"
        >
            {/* 目标栏 */}
            <div>
                <div>{module.displayName} - {Bar.delete(guid)}</div>
            </div>

            {/* 可添加子组件栏 */}
            <div>
                <div>可添加子组件:</div>
                {Bar.menus({
                    guid,
                    menus: module ? module.menus : [],
                })}
            </div>

            {/* 属性编辑栏 */}
            <div>
                {Bar.edit({
                    ...item,
                    guid,
                    attrs: item.attrs,
                    childs: item.children ? item.children : [],
                    editable: module ? module.editable : {},
                })}
            </div>
        </div>
    )
}

export default Item;
