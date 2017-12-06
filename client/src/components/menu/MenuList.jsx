import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Font from 'font';
import { Row, Col, Button, Icon, Input, Select } from 'antd';
import { addComponent, saveData, viewer } from '../../pages/editor/App';

const Search = Input.Search;
const Option = Select.Option;

const routes = {
    pulish: '/lists/publish',
    my: '/lists/my',
    share: '/lists/share'
}

export default class TopMenu extends PureComponent {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
        onSearch: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            current: 'my'
        }
    }

    componentDidMount() {
        this.setCurrent()
    }

    setCurrent = () => {
        const { match } = this.props;
        const { params } = match;
        const { type = '' } = params;

        switch (type) {
            case 'publish':
                this.setState({
                    current: 'pulish'
                })
                break;
            case 'my':
            case '':
                this.setState({
                    current: 'my'
                })
                break;
            case 'share':
                this.setState({
                    current: 'share'
                })
                break;
            default:
                break;
        }
    }

    handleAdd = () => {
        this.props.history.push('/mobile/new')
    }

    handleSearch = (value) => {
        this.props.onSearch(value)
    }

    handleChange = (value) => {
        this.setState({
            current: value
        }, () => {
            this.props.history.push(routes[value])
        })
    }

    render() {
        const { current } = this.state;

        return (
            <div
                className="ec-editor-banner ec-banner-list"
            >
                <Row>
                    <Col span={4} className="ec-editor-banner-left">
                        <span>Static</span>
                    </Col>
                    <Col span={8} className="ec-editor-banner-center">
                    </Col>
                    <Col span={12} className="ec-editor-banner-right">
                        <Search
                            style={current === 'share' ? {width: 200, 'display': 'none'} : {width: 200}}
                            placeholder="搜索标题"
                            onSearch={this.handleSearch}
                        />
                        <Select
                            style={{ width: 120, marginLeft: '10px' }}
                            placeholder="请选择"
                            value={current}
                            onChange={this.handleChange}
                        >
                            <Option key="my">我的页面</Option>
                            <Option key="pulish">所有公开页面</Option>
                            <Option key="share">分享给我的页面</Option>
                        </Select>
                        <Button
                            className="ec-editor-btn"
                            size="small"
                            onClick={this.handleAdd}
                        >
                            新建
                        </Button>
                        <Button
                            className="ec-editor-btn ec-editor-btn-red"
                            size="small"
                        >
                            退出
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
