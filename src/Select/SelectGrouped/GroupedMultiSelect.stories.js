import React from 'react';
import { storiesOf } from '@storybook/react';

import GroupedMultiSelect from './GroupedMultiSelect.js';

function generateOptions(name, amount) {
    let result = [];
    for (let i = 0; i < amount; i++) {
        result.push({
            id: i,
            displayString: `${name} ${i}`
        });
    }
    return result;
}

const teamKey = 'Teams';
const personKey = 'Persons';

const teams = {
    value: [1, 2, 3],
    options: generateOptions('Teamsrrp', 5)
};
const persons = {
    value: [3, 5, 10],
    options: generateOptions('Personsrr', 100)
};

const values = {
    [teamKey]: teams.value,
    [personKey]: persons.value
};
const options = {
    [teamKey]: teams.options,
    [personKey]: persons.options
};

class TestForm extends React.Component {
    onSave = () => {
        console.log('on save');
    };

    onBack = () => {
        console.log('go back');
    };

    componentWillMount() {
        this.props.methodCallback(this.onSave, this.onBack);
    }

    render() {
        return <div>Test Case</div>;
    }
}

class TeamGroupHeader extends React.Component {
    render() {
        return (
            <div>
                <span>Teams</span>
            </div>
        );
    }
}

const groupView = {
    [teamKey]: {
        header: TeamGroupHeader,
        noOptionPlaceholder: <span>There are no teams yet</span>,
        extra: option => <span>{option.id}</span>
    },
    [personKey]: {
        noOptionPlaceholder: <span>No options passed</span>
    }
};

class SimpleExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                [teamKey]: [1, 2],
                [personKey]: []
            },
            options: options
        };
    }

    _onChange = values => {
        this.setState({
            value: values
        });
    };

    render() {
        return (
            <div>
                <GroupedMultiSelect
                    showSubSection={this.props.sub}
                    subSection={TestForm}
                    placeholder="This is placeholder"
                    onChange={this._onChange}
                    groupView={groupView}
                    keys={[teamKey, personKey]}
                    options={options}
                    value={this.state.value}
                />
            </div>
        );
    }
}

storiesOf('Grouped MultiSelect(controlled)', module).add('basic', () => <SimpleExample sub={false} />);

storiesOf('Grouped MultiSelect(controlled)', module).add('subsection', () => <SimpleExample sub={true} />);

storiesOf('Grouped MultiSelect', module).add('subsection', () => <SimpleExample sub={true} />);
