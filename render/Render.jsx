/**
 * @file Render.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import { Button } from 'antd';
import WrapperEditor from './container/WrapperEditor';

class Render {

    /**
     * 渲染编辑容器
     * @param props
     * @constructor
     */
    static Editor(props) {
        const { data, removeComponent } = props;

        if (!data || !data.component) {
            return null;
        }

        return (
            <WrapperEditor
                guid={data.guid}
                onRemoveComponent={removeComponent}
            >
                <data.component />
            </WrapperEditor>
        )
    }

    /**
     * 渲染顶部容器
     * @param props
     * @return {XML}
     * @constructor
     */
    static TopController(props) {
        return (
            <div>
                <Button
                    data-cid="3"
                    data-type="floor"
                    onClick={props.addComponent}
                >
                    添加楼层
                </Button>
                <Button
                    onClick={props.saveData}
                >
                    保存
                </Button>
            </div>
        )
    }
}

export default Render;
