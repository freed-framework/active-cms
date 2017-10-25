
interface TabsProps {
    id: string;

    module?: string;

    activeKey?: string | null;

    style: {
        layout: object;
        title: object;
        main: object;
    };

    children?: React.ReactNode;
}

interface TabsState {
    data?: [any];

    activeKey?: string | null,
}

interface TabPaneProps {
    key?: string;

    tab?: React.ReactNode | string;

    children?: React.ReactNode;
}

interface TabsTitleProps {
    children?: React.ReactNode;
    onActive?: any;
}

interface TabsContentProps {
    children?: React.ReactNode;
    activeKey?: string;
}
