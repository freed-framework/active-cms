/**
 * @file componentPropsHoc.ts
 * @author denglingbo
 *
 * 高阶组件
 */
/// <reference path="../../typings/interface.d.ts" />
import * as React from 'react';

/**
 * 处理 data-*
 * @param obj
 * @param defObj
 * @return {{}&U&V}
 */
const dataTableParse = (obj: any, defObj: any) => {
    const newObj: any = {};

    if (!obj) {
        return defObj;
    }

    Object.keys(obj).forEach((key: string) => {
        try {
            const val: any = obj[key];
            let str: string = '';

            if (typeof val === 'string' || typeof val === 'number') {
                str = val.toString();
            } else {
                str = JSON.stringify(obj[key]);
            }

            newObj[key] = str;
        } catch (ex) {
            // Do nothing
        }
    });

    return Object.assign({}, newObj, defObj);
}

/**
 * 获取 classNames
 * @param args
 * @return {string}
 */
const getClassNames = (...args: any[]) => {
    const arr: Array<string> = ['tmc-module'];

    args.forEach((arg: string) => {
        if (arg) {
            arr.push(arg);
        }
    });

    return arr.join(' ');
}

const componentPropsHoc = (args: any): Function => (WrappedComponent: any) => class extends React.Component<any, any> {
    /**
     * 自动给每个组件添加 config 配置
     */
    static config: any = args.config;

    constructor(props: any) {
        super(props);

        const conf = args.config;

        this.state = {
            className: getClassNames(props.className, conf.className),
            dataTable: dataTableParse(conf.dataTable, {
                'data-module': this.props.module,
            }),
        }
    }

    public render(): JSX.Element {
        return (
            <WrappedComponent
                {...this.props}
                {...this.state}
            />
        );
    }
}

export default componentPropsHoc;