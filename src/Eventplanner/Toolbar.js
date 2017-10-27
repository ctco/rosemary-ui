import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.view = this.view.bind(this);
        this.viewNamesGroup = this.viewNamesGroup.bind(this);
    }

    render() {
        let { messages, label } = this.props;

        messages = message(messages);

        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={this.navigate.bind(null, navigate.TODAY)}>
                        {messages.today}
                    </button>
                    <button type="button" onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
                        {messages.previous}
                    </button>
                    <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)}>
                        {messages.next}
                    </button>
                </span>

                <span className="rbc-toolbar-label">{label}</span>

                <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
            </div>
        );
    }

    navigate(action) {
        this.props.onNavigate(action);
    }

    view(view) {
        this.props.onViewChange(view);
    }

    viewNamesGroup(messages) {
        //eslint-disable-line
        let viewNames = this.props.views;
        const view = this.props.view;

        if (viewNames.length > 1) {
            return viewNames.map(name => (
                <button
                    type="button"
                    key={name}
                    className={cn({ 'rbc-active': view === name })}
                    onClick={this.view.bind(null, name)}
                >
                    {messages[name]}
                </button>
            ));
        }
    }
}

export default Toolbar;
