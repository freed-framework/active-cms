import * as React from 'react';
import BaiscComponent from '../../../common/hoc/baiscComponent';

export interface HotImagesProps {
    id?: string,
    module?: string,
    attrs?: {
        style?: any
    },
    parentStyle?: any
}

class HotImages extends React.PureComponent<HotImagesProps, any> {
    render() {
        const { id, attrs = {}, parentStyle } = this.props;
        const { style = {} } = attrs;
        const newSty = {};

        Object.assign(newSty, parentStyle, style.layout);

        return (
            <div
                {...this.props}
                className="as-layer-goods"
                style={{...newSty}}
            >
                {/* 1231231231 */}
            </div>
        );
    }
}

export default BaiscComponent(HotImages);
