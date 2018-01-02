/**
 * @file Editable.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import classNames from 'classnames';
import Tips from './Tips';
import ActivePanel from './ActivePanel';
import './editable.scss';

class Editable {
    static tips = Tips;

    static activePanel = ActivePanel;
}

export default Editable;
