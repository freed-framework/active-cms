/**
 * @file Buttons.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { deleteComponent, addComponent } from '../../../editor/App';
import { findComponents } from '../../../components/index';
import './controller.scss';

class Buttons {
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
     * 渲染组件
     * @param guid
     * @param menus
     * @return {Array}
     */
    static getList({ guid, menus }) {
        const nodes = [];

        findComponents(menus, (module) => {
            nodes.push(
                <div
                    key={module.id}
                    data-guid={guid}
                    data-name={module.name}
                    onClick={addComponent}
                >
                    {module.file}
                </div>
            )
        });

        return nodes;
    }
}

export default Buttons;
