
interface LayerProps {
    id: string;

    children?: React.ReactNode;

    module?: string;

    attrs?: {
        style?: any;
        target?: any;
        position?: any;
        horizontal?: any;
    }
}
