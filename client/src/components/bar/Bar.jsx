/**
 * @file Bar.jsx
 * @author denglingbo
 *
 * Des
 */
import React  from 'react';
import { deleteComponent, addComponent, copyComponent, pasteComponent } from '../../pages/editor/App';
import { Button, Radio } from 'antd';

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
     * @return {XML}
     */
    static edit(props) {

        return (
            <div>
                <div>组件属性编辑:</div>
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
