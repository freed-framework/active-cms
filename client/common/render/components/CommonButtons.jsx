/**
 * @file CommonButtons.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import { Button } from 'antd';
import { addComponent, saveData } from '../../../editor/App';

const CommonButtons = () => {
    return (
        <div>
            <Button
                data-name="floor"
                onClick={addComponent}
            >
                添加楼层
            </Button>
            <Button
                data-name="fixer"
                onClick={addComponent}
            >
                添加底部 Fixer
            </Button>
            <Button
                onClick={saveData}
            >
                保存
            </Button>
        </div>
    )
}

export default CommonButtons;
