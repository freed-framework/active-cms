
interface Props {
    id: string;
    children?: React.ReactNode,
    attrs?: {
        /**
         * 样式
         */
        style?: any,
        /**
         * 相对于那定位 body|parent
         */
        target?: any,
        /**
         * 固定位置 left | top | right | bottom
         */
        position?: any,
        /**
         * 定位距离
         */
        horizontal?: any
    }
}

interface States {
    isShow?: boolean;
}
