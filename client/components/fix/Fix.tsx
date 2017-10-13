/**
 * @file Fix.tsx
 * @author denglingbo
 *
 * Des
 */
/// <reference path="../../declaration.d.ts" />
/// <reference path="./fix.d.ts" />
import * as React from 'react';
// import Style from './index.scss';

class Fix extends React.Component<Props, States> {
    /**
     * scroll 时间
     */
    scroll?: any

    /**
     * state 对象
     */
    // state?: any

    constructor(props: Props) {
        super(props)
        
        this.state = {
            isShow: true
        }
    }

    componentDidMount() {
        this.scroll = window.addEventListener('scroll', (e?: any) => {
            const { scrollTop } = e.target.body;
            // this.setState({
            //     isShow: scrollTop > 750
            // })
            
        })
    }

    parseStyle = (attrs: Attrs) => {
        const { target = 'body', position = 'left', horizontal = {key: 'left', value: 0}, vertical = {key: 'top', value: 0}, style = {} } = attrs;
        if (target === 'body') {
           return getBodyStyle(position, horizontal, vertical);
        } else if (target === 'parent') {
            return getParentStyle(position, horizontal, vertical, style.layout);
        }

    }

    render() {
        const { isShow } = this.state;
        const { attrs = {}, id } = this.props;
        const { style = {} } = attrs;
        const sty = {};
        Object.assign(sty, style.layout, this.parseStyle(attrs));
        if (!isShow) {
            return null;
        }

        return (
            <div
                id={id}
                className='as-fix'
                style={{
                    ...sty
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

interface Attrs {
    target?: any,
    position?: any,
    horizontal?: any,
    vertical?: any,
    style?: any
}

function tf(str: string) {
    const arr = str.split("-");
    for (let i = 1; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
    }
    return arr.join("");
};

function getBodyStyle(po: string, horizontal: any, vertical: any) {

    const sty: any = {};
    if (horizontal) {
        const { key, value } = horizontal;
        sty[key] = value;
    }
    if(vertical) {
        const { key, value } = vertical;
        sty[key] = value;
    }
    sty.zIndex = 1000
    return sty;
}

function getParentStyle (po: string, horizontal: any, vertical: any, style?: any) {
    const { width = '0' } = style;
    const sty: any = {}
    
    if (horizontal) {
        const { key, value } = horizontal;
        const margin = parseInt(width, 10) + parseInt(value, 10);
        let attr = tf(`margin-${key}`);
        sty[attr] = -margin;
    }
    if(vertical) {
        const { key, value } = vertical;
        sty[key] = value;
    }
    sty.zIndex = 1000
    return sty;
}

export default Fix;
