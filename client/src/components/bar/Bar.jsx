/**
 * @file Bar.jsx
 * @author denglingbo
 *
 * Des
 */
import React  from 'react';
import { deleteComponent, addComponent, copyComponent, pasteComponent } from '../../pages/editor/App';
import { Button, Radio } from 'antd';

import PropsEdit from '../propEdit/PropsEdit';

class Bar {
    static handleSizeChange(value) {
        console.log(value)
    }
    /**
     * 删除按钮组件
     * @param guid
     * @return {XML}
     */
    static delete(guid) {
        return (
            <div
                key="ec-edit-bar-button"
                className="ec-edit-bar-button"
            >
                <Button.Group size={'small'}>
                    <Button type="small" onClick={() => deleteComponent(guid)}>
                        删除
                    </Button>
                    <Button type="small" onClick={() => copyComponent(guid)}>
                        复制
                    </Button>
                    <Button type="small" onClick={() => pasteComponent(guid)}>
                        粘贴
                    </Button>
                </Button.Group>
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
                            const { label = '', component = '', data = [], ...props } = attr;

                            return <div
                                key={`${key}-${attr}-${index}`}
                            >
                                {/* 加载指定的编辑组件 */}
                                <PropsEdit
                                    {...props}
                                    label={label}
                                    compKey={component}
                                    guid={guid}
                                    target={key}
                                    data={data}
                                    attribute={attribute}
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
        if (!menus || menus.length === 0) {
            return null;
        }

        return (
            <Button.Group size={'small'}>
                {menus.map((item, i) => (
                    <Button
                        key={i}
                        data-guid={guid}
                        data-name={item}
                        onClick={addComponent}
                    >
                        {item}
                    </Button>
                ))}
            </Button.Group>
        );
    }
}

export default Bar;
