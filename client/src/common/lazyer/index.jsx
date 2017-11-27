/**
 * @file index.jsx
 * @author denglingbo
 *
 * 此处为了自动给 Lazyer 添加上 loader 这个属性
 * Lazyer 不默认添加的原因是，build 各个端的时候需要通过 loader 来区分开
 */
import React from 'react';
import Lazyer from './Lazyer';
import loader from '../loader/loader';

const App = (props) => (
    <Lazyer
        { ...props }
        loader={loader}
    />
)

export default App;
