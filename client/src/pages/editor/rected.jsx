import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Rected extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        console.log(this)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

    }

    handleMenu = () => {
        
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                1231
            </div>
        )
    }
}
