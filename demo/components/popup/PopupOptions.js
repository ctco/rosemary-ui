import React from 'react';
import {Popup} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';

export default () => {
    let propDescription = {
        attachment: {
            values: `Mandatory, One Of:
                    top left,
                    top center,
                    top right,
                    middle left,
                    middle right,
                    bottom left,
                    bottom center,
                    bottom right`,
            description: 'Popup attachment position'
        },
        on: {
            values: 'One Of: hover, click',
            description: 'Whether Popup should be opened on click or on hover'
        },
        popupClassName: {
            values: 'Variations: tooltip, Popup, Popup-blue-border',
            description: 'Popup class name'
        },
        targetClassName: {
            values: 'string',
            description: 'Component to which Popup is attached class name'
        },
        changeAttachmentDynamically: {
            values: 'boolean',
            description: 'Whether Popup will change location on window resize'
        },
        modal: {
            values: 'boolean',
            description: 'Whether Popup is modal'
        },
        animationBaseName: {
            values: 'string',
            description: 'Animation class name'
        },
        onOpen: {
            values: 'function',
            description: 'Callback when Popup is opened'
        }
    };

    return (
        <div>
            <OptionsTable component={Popup} propDescription={propDescription}/>
        </div>
    );
};
