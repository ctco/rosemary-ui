import React, {Component} from 'react';
import {Popup} from '../../../src';


export default class MyEvent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Popup on="click" attachment="bottom center">
                <div>{this.props.title}</div>
                bottom center
            </Popup>
        );
    }
}

