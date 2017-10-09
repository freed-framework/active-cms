
interface Props {
    id: string;

    style: {
        layout: object;
        title: object;
        main: object;
    };

    children?: React.ReactNode;
}

interface State {
    data: [any];

    activeId: string,
}