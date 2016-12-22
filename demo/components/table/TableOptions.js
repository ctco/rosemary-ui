import React from 'react';
import {Table} from '../../../src';
import OptionsTable from '../../helper/OptionsTable';


export default () => {
    let propDescription = {
        data: {
            values: '[array of objects] ,representing each row',
            description: 'Nothing is rendered'
        },
        defSorting: {
            values: 'number',
            description: 'What column should be sorted by default,to make it work!' +
            ',you must specify headerCell with comparator [fn] (see 1.0))'
        }
    };

    return (
        <div>
            <OptionsTable component={Table} propDescription={propDescription}/>

            <h2>Property Description</h2>
            <h4><em><b>1.0</b></em> headerCells</h4>
            <p>
            </p>
            <hr/>
            <h4><em><b>1.0</b></em>loadingIndicator</h4>
            <p></p>
            <hr/>
            <h4><em><b>1.0</b></em> rowStyle</h4>
            <p></p>
            <hr/>
            <h4><em><b>1.0</b></em> row</h4>
            <p></p>
            <hr/>
            <h4><em><b>1.0</b></em> cells</h4>
            <p></p>
            <hr/>
            <h4><em><b>1.0</b></em> rowIndex</h4>
            <p></p>
            <hr/>
            <h4><em><b>1.0</b></em> bottomSection</h4>
            <p></p>
            <hr/>
        </div>
    );
};
