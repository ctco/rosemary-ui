import React from 'react';
import { storiesOf } from '@storybook/react/dist/client/preview/index';

import FeedbackManager from './FeedbackManager/FeedbackManager';
import type from './types';
import Button from '../Button';
import ButtonGroup from '../Button/ButtonGroup';

class FBState extends React.Component {
    state = {
        messages: []
    };

    createFeedbackCard = () => {
        const id = Date.now() + '' + Math.random() + '';
        const keys = Object.keys(type);
        const msgType = type[keys[Math.floor(Math.random() * keys.length)]];
        this.setState({
            messages: [
                {
                    id,
                    text: 'Message width id:' + id + ' has been created',
                    type: msgType
                },
                ...this.state.messages
            ]
        });
    };

    clearCards = () => {
        this.setState({
            messages: []
        });
    };

    onCloseMessage = id => {
        this.setState({
            messages: this.state.messages.filter(m => m.id !== id)
        });
    };

    render() {
        return (
            <div>
                <Button onClick={this.createFeedbackCard} className="btn--primary">
                    Generate Feedback card!
                </Button>
                <Button onClick={this.clearCards} className="btn--success">
                    Clear Cards
                </Button>
                <FeedbackManager messages={this.state.messages} onCloseMessage={this.onCloseMessage} />
            </div>
        );
    }
}

storiesOf('FeedbackManager', module).add('default', () => <FBState />);
