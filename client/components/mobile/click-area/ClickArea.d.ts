/// <reference path="../../props.d.ts" />

interface ClickAreaProps extends DefaultProps {
    url?: string;
    componentProps?: any;
    modalWidth?: string | number;
    modalTop?: string | number;
    modalBtn?: string | number;
    modalContent: string | JSX.Element;
    showExplain?: boolean;
    hasModal?: boolean;
}

declare function escape(message: string): any;
declare function unescape(message: string): any;
