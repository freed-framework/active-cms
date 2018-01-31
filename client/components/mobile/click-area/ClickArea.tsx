import * as React from 'react';
import config from './config';
import redirect from '../../../node_modules/freed-multi/lib/native/redirect';
import componentPropsHoc from '../../common/hoc/componentPropsHoc';
import { ClickAreaProps } from './interface';
import Explain from './Explain';
import './clickArea.scss';

@componentPropsHoc({
    config,
})
class ClickArea extends React.PureComponent<ClickAreaProps, any> {
    constructor(props: ClickAreaProps) {
        super(props);

        this.state = {
            showExplain: props.showExplain,
        }
    }

    handleClick = () => {
        const { hasModal } = this.props;
        if (hasModal) {
            this.setState({
                showExplain: true
            })
        } else {
            redirect(this.props.url, {});
        }
    }

    handleClose = () => {
        this.setState({
            showExplain: false
        })
    }

    toTag = (value: string) => {
        const arr: string[] = escape(value).split('%0A');
        return unescape(arr.join('<br/>'));
    }

    render() {
        const {
            id, style, className, dataTable, hasModal = false,
            modalBtn = '确认', modalContent = '暂无内容...', modalTitle = '说明',
            modalTop = '100', modalWidth = '90%'
        } = this.props;

        return (
            <div
                id={id}
                className={className}
                data-url={this.props.url}
                {...(dataTable && { ...dataTable })}
                style={{
                    ...(style && { ...style.layout })
                }}
                onClick={this.handleClick}
            >
                {this.props.children}
                {this.state.showExplain && hasModal &&
                    <Explain
                        maskClosable
                        title={modalTitle}
                        okText={modalBtn}
                        onClose={this.handleClose}
                        top={modalTop}
                        width={modalWidth}
                    >
                        <div dangerouslySetInnerHTML={{__html: this.toTag(modalContent)}}></div>
                    </Explain>
                }
            </div>
        )
    }
}

export default ClickArea;
