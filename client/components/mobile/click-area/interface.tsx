export interface ClickAreaProps extends DefaultProps {
    url?: string;
    componentProps?: any;
    modalWidth?: string | number;
    modalTop?: string | number;
    modalBtn?: string | number;
    modalContent: string;
    modalTitle?: string;
    showExplain?: boolean;
    hasModal?: boolean;
}

export declare function escape(message: string): any;
export declare function unescape(message: string): any;
