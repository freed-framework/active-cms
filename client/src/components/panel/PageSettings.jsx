/**
 * @file PageSettings.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setPageTitle } from '../../actions/page';
import { bindActionCreators } from 'redux';

@connect(
    state => ({
        page: state.toJS().page,
    }),
    dispatch => bindActionCreators({
        setPageTitle,
    }, dispatch)
)
class PageSettings extends PureComponent {
    handleChangePageName = (event) => {
        const value = event.currentTarget.value;

        this.props.setPageTitle(value);
    }

    render() {
        const { page } = this.props;

        return (
            <div>
                <div>页面配置</div>
                <div>
                    标题
                    <input
                        type="text"
                        value={page.title}
                        onChange={this.handleChangePageName}
                    />
                </div>
                <div>截图 <input type="button" /></div>
            </div>
        )
    }
}

export default PageSettings;
