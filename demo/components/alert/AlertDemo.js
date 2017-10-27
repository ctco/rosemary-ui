import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Alert from '../../../src/Alert/Alert';
import Button from '../../../src/Button/Button';

import React from 'react';

let description = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                  A ad, aut cum debitis deleniti dolore error ex exercitationem illum nam odit officia,
                  quaerat repellat sit suscipit, tempora unde? Illum, ipsa.`;
let successDemo = {
    title: 'Alert Success',
    description
};

let infoDemo = {
    title: 'Alert Info',
    description
};

let warningDemo = {
    title: 'Alert Warning',
    description
};

let dangerDemo = {
    title: 'Alert Danger!!!!',
    description
};


export default class AlertDemo extends React.Component {
    render() {
        return (
            <DemoWithSnippet>
                <h1>Alerts</h1>
                <p>
                    Provide contextual feedback messages for typical user actions with the handful of available and
                    flexible alert messages.
                </p>
                <br/>

                <Alert type={Alert.Type.SUCCESS}
                       title={successDemo.title}
                       description={successDemo.description}
                />
                <br/>

                <Alert type={Alert.Type.DANGER}
                       title={dangerDemo.title}
                       description={dangerDemo.description}
                />
                <br/>

                <Alert type={Alert.Type.WARNING}
                       title={warningDemo.title}
                       description={warningDemo.description}
                       extra={<Button value="YO"/>}
                />
                <br/>

                <Alert type={Alert.Type.INFO}
                       title={infoDemo.title}
                       description={infoDemo.description}
                />
            </DemoWithSnippet>
        );
    }
}