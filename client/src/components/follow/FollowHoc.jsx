/**
 * @file pureFollowDecorator.jsx
 * @author denglingbo
 *
 */
import React, { PureComponent } from 'react';

const FollowHoc = WrappedComponent => class extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            top: props.offsetTop,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const st = document.scrollingElement.scrollTop;
        const top = this.props.offsetTop - st;

        this.setState({
            top: top <= 0 ? 0 : top,
        });
    }

    render() {
        return (
            <WrappedComponent {...this.props} {...this.state} />
        );
    }
}

export default FollowHoc;
