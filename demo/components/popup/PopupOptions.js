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
            description: 'Whether popup should be opened on click or on hover'
        },
        popupClassName: {
            values: 'Variations: tooltip, popup, popup-blue-border',
            description: 'Popup class name'
        },
        targetClassName: {
            values: 'string',
            description: 'Component to which popup is attached class name'
        },
        changeAttachmentDynamically: {
            values: 'boolean',
            description: 'Whether popup will change location on window resize'
        },
        modal: {
            values: 'boolean',
            description: 'Whether popup is modal'
        },
        animationBaseName: {
            values: 'string',
            description: 'Animation class name'
        },
        onOpen: {
            values: 'function',
            description: 'Callback when popup is opened'
        }
    };

    return (
        <div>
            <OptionsTable component={Popup} propDescription={propDescription}/>
        </div>
    );
};
