/**
 * @file Bar.jsx
 * @author denglingbo
 *
 * Des
 */
import React  from 'react';
import { deleteComponent, addComponent } from '../../App';
import { findComponents } from '../../../components/index';
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
    static edit({ guid, editable = {}, style = {} }) {
        return (
            <div>
                {Object.keys(editable).map((key, index) => {
                    const props = editable[key];

                    return (
                        <div
                            key={`${key}-${index}`}
                        >
                            <div>编辑：{key}</div>

                            {Object.keys(props).map((k, i) => {
                                if (props[k]) {
                                    return (
                                        <div
                                            key={`${k}-${i}`}
                                        >
                                            <PropsEdit
                                                guid={guid}
                                                type={k}
                                                defaultValue={style[k]}
                                            />
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    );
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
