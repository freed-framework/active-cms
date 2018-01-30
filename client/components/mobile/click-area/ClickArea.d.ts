/// <reference path="../../props.d.ts" />

interface ClickAreaProps extends DefaultProps {
    url?: string;
    componentProps?: any;
}

declare function escape(message: string): any;
declare function unescape(message: string): any;
