/**
 * @file List.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is,  } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActiveInfo, clearActiveInfo } from '../../actions/pub';
import { setPageTileData } from '../../actions/page';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import module from '../../common/module';
import Item from './Item';

@connect(
    state => ({
        pub: state.toJS().pub,
        page: state.toJS().page,
    }),
    dispatch => bindActionCreators({
        setActiveInfo,
        clearActiveInfo,
        setPageTileData,
    }, dispatch)
)
class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeId: props.activeId,
        }
    }

    componentWillReceiveProps(nextProps) {
        // 处理 reducers 的 activeInfo 数据
        if (!is(this.props.activeId, nextProps.activeId)) {
            this.setState({
                activeId: nextProps.activeId,
            })
        }
    }

    render() {
        const { activeId } = this.state;
        const { page } = this.props;

        if (!page.tile || Object.values(page.tile).length === 0) {
            return null;
        }

        return (
            <div>
                {Object.keys(page.tile).map(key => (
                    <Item
                        key={key}
                        item={page.tile[key]}
                        activeId={activeId}
                    />
                ))}
            </div>
        )
    }
}

List.defaultProps = {}

List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any),
    isSub: PropTypes.bool,
}

export default withRouter(List);
