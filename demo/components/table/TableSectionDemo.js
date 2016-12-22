import React, {PropTypes} from 'react';
import classNames from 'classnames';


const PROPERTY_TYPES = {
    item: React.PropTypes.object
};
const DEFAULT_PROPS = {};

class TableSectionDemo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let style = classNames(this.props.className, {});
        return (
            <div className="table-bottom-section">
                <h3>{this.props.data.hello}</h3>
                <ul style={{listStyleType:'none'}}>
                    <li>{this.props.number}</li>
                    <li>{this.props.name}</li>
                    <li>{this.props.surname}</li>
                    <li>{this.props.average}</li>
                </ul>
            </div>
        );
    }
}

TableSectionDemo.propTypes = PROPERTY_TYPES;
TableSectionDemo.defaultProps = DEFAULT_PROPS;

export default TableSectionDemo;
