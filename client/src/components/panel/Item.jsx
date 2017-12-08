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
    const { guid, config = {} } = item;
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
                <div><span className="ec-panel-item-name">{item.displayName || config.displayName}</span>  {Bar.delete(guid)}</div>
            </div>

            {/* 可添加子组件栏 */}
            <div>
                {Bar.menus({
                    guid,
                    menus: config ? config.menus : [],
                })}
            </div>

            {/* 属性编辑栏 */}
            <div>
                {Bar.edit({
                    ...item,
                    guid,
                    // attrs: item.attrs,
                    // childs: item.children ? item.children : [],
                    editable: config ? config.editable : {},
                })}
            </div>
        </div>
    )
}

export default Item;
