/**
 * @file Bar.jsx
 * @author denglingbo
 *
 * Des
 */
import React  from 'react';
import { deleteComponent, addComponent, copyComponent, pasteComponent } from '../../pages/editor/App';
import { Button, Radio } from 'antd';
import Lazyer from '../../common/lazyer';
// import PropsEdit from '../propEdit/PropsEdit';
import EditAttr from '../propEdit';

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
            <span
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
            </span>
        )
    }

    /**
     * 编辑
     * @return {XML}
     */
    static edit(props) {
        if (!props.editable) {
            return null;
        }

        return (
            <div>
                <div className="div-title">组件属性编辑:</div>
                <EditAttr
                    {...props}
                />
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
            <div>
                <div>可添加子组件:</div>
                <Button.Group size={'small'}>
                    {menus.map((name, i) => {
                        if (name === '') {
                            return null;
                        }

                        return (
                            <Lazyer
                                key={i}
                                item={{ name }}
                            >
                                {mod => (
                                    <Button
                                        data-guid={guid}
                                        data-name={mod.module.config.name}
                                        onClick={addComponent}
                                    >
                                        {mod.module.config.displayName}
                                    </Button>
                                )}
                            </Lazyer>
                        )
                    })}
                </Button.Group>
            </div>
        );
    }
}

export default Bar;
