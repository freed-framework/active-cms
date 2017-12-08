import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as EditItem from './App';
import './propsEdit.scss';

export default class EditAttr extends PureComponent {
    static propTypes = {
        editable: PropTypes.arrayOf(PropTypes.any),
        guid: PropTypes.string,
    }

    loopRender = () => {
        const {
            guid,
            editable = [],
            componentProps = {},
            config = {},
            topWrappedModule = null,
        } = this.props;

        return editable.map((item, index) => {
            // 对应的编辑组件
            const EditComponent = EditItem[item.component];

            // 将 {component}/index.ts 的 config 中的可编辑项与需要传递到编辑组件的属性进行合并
            const props = {
                ...item,
                ...(topWrappedModule && { topWrappedModule }),
                defaultValues: {
                    ...config.defaultValues
                },
                children: this.props.children,
                componentProps,
            };

            return (
                <EditComponent
                    key={index}
                    guid={guid}
                    {...props}
                />
            );
        })
    }

    render() {
        return (
            <div>
               {this.loopRender()}
            </div>
        )
    }
}



// const comps = editable[key];

// if (key === 'component') {
//     const Component = EditItem[comps];
//
//     return (
//         <Component
//             {...this.props}
//             key={index}
//             guid={guid}
//         />
//     )
// }

// if (key === 'components') {
//     return comps.map((item, i) => {
//                     const EditComponent = EditItem[item.component];
// // console.log(item);
// // console.log(this.props)
//                     return (
//                         <EditComponent
//                             key={index}
//                             guid={guid}
//                             config={item}
//                             {...this.props}
//                         />
//                     )
// });
// }

// if (key === 'style') {
//     return Object.keys(comps).map((k, i) => {
//         // TODO: 石进华你大爷哟，我没看懂哟
//         // const attrs = comps[k];
//         // const { style = {} } = attrs;
//         const _comps = comps[k];
//         const { style = {} } = attrs;
//
//         return _comps.map(attr => {
//             const Component = EditItem[attr];
//
//             return (
//                 <div
//                     key={`${key}-${attr}-${index}`}
//                 >
//                     <Component
//                         compKey={attr}
//                         guid={guid}
//                         target={k}
//                         style={style[k]}
//                     />
//                 </div>
//             )
//         })
//     })
// } else {
//     return comps.map(attr => {
//         const { label = '', component = '', data = [], ...props } = attr;
//         const Component = EditItem[component];
//
//         return (
//             <div
//                 key={`${key}-${attr}-${index}`}
//             >
//                 <Component
//                     {...props}
//                     label={label}
//                     compKey={component}
//                     guid={guid}
//                     target={key}
//                     data={data}
//                     attrs={attrs}
//                     // src={attrs.src}
//                     childs={childs}
//                 />
//             </div>
//         )
//     })
// }
