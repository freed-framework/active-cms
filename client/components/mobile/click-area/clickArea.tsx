/// <reference path="./clickArea.d.ts" />
import * as React from 'react';
import config from './config';
import redirect from '../../../node_modules/freed-multi/lib/native/redirect';
import componentPropsHoc from '../../common/hoc/componentPropsHoc';
import Explain from './explain';
import './clickArea.scss';

@componentPropsHoc({
    config,
})
class ClickArea extends React.PureComponent<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            showExplain: false
        }
    }

    handleClick = () => {
        const { showModal } = this.props;
        if (showModal) {
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

    toTag = (value: any) => {
        const arr = escape(value).split('%0A');
        return unescape(arr.join('<br/>'));
    }

    render() {
        const {
            id, style, className, dataTable, isEdit, showModal = false,
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
                {this.state.showExplain && showModal &&
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
