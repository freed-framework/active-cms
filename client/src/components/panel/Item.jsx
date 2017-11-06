/**
 * @file Item.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import classNames from 'classnames';
import Bar from '../bar';

const Item = (props) => {
    const item = props.item;
    const { guid, module = {} } = item;
    const cls = classNames('ec-panel-item', {
        'ec-panel-item-active': props.activeId === guid,
    });

    return (
        <div
            key={guid}
            className={cls}
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
