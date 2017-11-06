/// <reference path="./text.d.ts" />
import React from 'react';
import classNames from 'classnames';

class Text extends React.Component<TextProps, any> {
    constructor(props: TextProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { id, content } = this.props;

        return (
            <div id={id}>
                {content}
            </div>
        )
    }
}

export default Text;
