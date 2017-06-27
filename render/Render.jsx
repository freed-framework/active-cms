/**
 * @file Render.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import { Button } from 'antd';
import WrapperEditor from './container/Editor';

class Render {

    /**
     * 渲染编辑容器
     * @param props
     * @constructor
     */
    static Editor(props) {
        const { data, removeComponent } = props;

        if (!data || !data.Editor) {
            return null;
        }

        const Comp = data.Editor;

        return (
            <Comp>
                <WrapperEditor
                    guid={data.guid}
                    onRemoveComponent={removeComponent}
                />
            </Comp>
        )
    }

    /**
     * 渲染浏览者模式
     * @param props
     * @constructor
     */
    static Viewer(props) {
        const { data, removeComponent } = props;

        if (!data || !data.Viewer) {
            return null;
        }

        const Comp = data.Viewer;

        return (
            <Comp>
                <WrapperEditor
                    guid={data.guid}
                    onRemoveComponent={removeComponent}
                />
            </Comp>
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
                    data-cid="2"
                    data-type="fixer"
                    onClick={props.addComponent}
                >
                    添加底部 Fixer
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
