/**
 * @file Bar.jsx
 * @author denglingbo
 *
 * Des
 */
import React  from 'react';
import { deleteComponent, addComponent } from '../../pages/editor/App';
import { findComponents } from '../../../components/__index';
import { Button } from 'antd';
import PropsEdit from '../propEdit/PropsEdit';

class Bar {
    /**
     * 删除按钮组件
     * @param guid
     * @return {XML}
     */
    static delete(guid) {
        return (
            <div
                key="button-delete"
            >
                {guid}
                <span
                    data-guid={guid}
                    onClick={deleteComponent}
                >
                    Remove
                </span>
            </div>
        )
    }

    /**
     * 编辑
     * @param guid
     * @param editable
     * @param style
     * @return {XML}
     */
    static edit({ guid, editable = {}, attribute = {} }) {
        
        return (
            <div>
                <div>组件属性编辑:</div>
                
                {Object.keys(editable).map((key, index) => {
                    const comps = editable[key];
                    if (key === 'style') {
                        return Object.keys(comps).map((k, i) => {
                            const attrs = comps[k];
                            const { style = {} } = attribute;
                            return attrs.map(attr => {
                                {/* const { style = {} } = attrs; */}
                                return <div
                                    key={`${key}-${attr}-${index}`}
                                >
                                    {/* 加载指定的编辑组件 */}
                                    <PropsEdit
                                        compKey={attr}
                                        guid={guid}
                                        target={k}
                                        style={style[k]}
                                    />
                                </div>
                            })
                        })
                    }
                    else {
                        return comps.map(attr => {
                            return <div
                                key={`${key}-${attr}-${index}`}
                            >
                                {/* 加载指定的编辑组件 */}
                                <PropsEdit
                                    compKey={attr}
                                    guid={guid}
                                    target={key}
                                    src={attribute.src}
                                />
                            </div>
                        })
                    }
                })}
            </div>
        )
    }

    /**
     * 渲染组件
     * @param guid
     * @param menus
     * @return {Array}
     */
    static menus({ guid, menus }) {
        const nodes = [];

        findComponents(menus, (module) => {
            nodes.push(
                <Button
                    key={module.id}
                    data-guid={guid}
                    data-name={module.name}
                    onClick={addComponent}
                >
                    {module.file}
                </Button>
            )
        });

        return nodes;
    }
}

export default Bar;
