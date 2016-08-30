import React from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';

import {Input, Select, DateRangePicker, Button, FormField} from '../../../src';

class Example2 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            fields: { username, email, city, range},
            handleSubmit
            } = this.props;

        return (
            <div className="form-demo">
                <div className="form row">

                    <FormField label="Username" {...username}>
                        <Input />
                    </FormField>

                    <FormField label="city" {...city}>
                        <Select className="form__control" options={this.props.cities}/>
                    </FormField>

                    <FormField label="Password" {...email}>
                        <Input />
                    </FormField>

                    <div className="form-buttons-block form-button-block--no-border">
                        <Button onClick={handleSubmit} className="btn btn--primary">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


export const fields = ['username', 'email', 'city', 'range'];

const required = (value) => {
    if (!value) {
        return 'Required';
    }
    return null;
};

const min = (value, min) => {
    if (value.length < min) {
        return `Must be greater then ${min - 1}`;
    } else {
        return null;
    }
};

const max = (value, max) => {
    if (value.length > max) {
        return `Must be less then ${max + 1}`;
    } else {
        return null;
    }
};

const validateUserName = (value) => {
    return required(value)
        || min(value, 3)
        || max(value, 8);
};

function validateCityRequired(values) {
    return required(values.city);
}

const validate = (values) => {
    const errors = {};
    errors.username = validateUserName(values.username);
    errors.city = validateCityRequired(values);
    errors.range = required(values.range);
    return errors;
};


const mapStateToProps = (state) => ({
    cities: state.formExample2.cities,
    initialValues: state.formExample2.initialValues
});

export default reduxForm(
    {
        form: 'form-example-2',
        fields,
        validate,
        onSubmit: (values) => {
            console.log(values);
        }
    },
    mapStateToProps)(Example2);


