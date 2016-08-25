import React, {Component} from 'react';
import keys from 'lodash/keys';

class OptionsTable extends Component {
    constructor(props) {
        super(props);
    }

    renderOptions() {
        return keys(this.props.component.propTypes).map((key) => {
            let values = '';
            let description = '';
            let propDescription = this.props.propDescription[key];
            if (propDescription) {
                values = propDescription.values;
                description = propDescription.description;
            }

            return (
                <tr key={key}>
                    <td>
                        {key}
                    </td>
                    <td>
                        {values}
                    </td>
                    <td>
                        {description}
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="option-table">
                <thead>
                <tr>
                    <th>Option</th>
                    <th>Values</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {this.renderOptions()}
                </tbody>
            </table>
        );
    }
}

export default OptionsTable;
