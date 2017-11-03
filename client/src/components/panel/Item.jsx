/**
 * @file Item.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import Lazyer from '../../../common/Lazyer';
import Bar from '../bar';

const Item = (props) => {
    const item = props.item;

    if (!item) {
        return null;
    }

    return (
        <div>
            <div
                key={item.guid}
                className="ec-panel-item"
            >
                {/* 目标栏 */}
                <div>
                    <Lazyer item={item}>
                        {mod => {
                            return <div>{mod.module.displayName} - {Bar.delete(item.guid)}</div>
                        }}
                    </Lazyer>
                </div>

                {/* 可添加子组件栏 */}
                <div>
                    <div>可添加子组件:</div>
                    <Lazyer item={item}>
                        {mod => Bar.menus({
                            guid: item.guid,
                            menus: mod.module ? mod.module.menus : [],
                        })}
                    </Lazyer>
                </div>

                {/* 属性编辑栏 */}
                <div>
                    <Lazyer item={item}>
                        {mod => Bar.edit({
                            ...item,
                            guid: item.guid,
                            attrs: item.attrs,
                            childs: item.children ? item.children : [],
                            editable: mod.module ? mod.module.editable : {},
                        })}
                    </Lazyer>
                </div>
            </div>
            {props.children}
        </div>
    )
}

Item.defaultProps = {
    item: null,
}

export default Item;
