import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import Input from '../../../src/components/Input';

import React from 'react';

export default class InputDemo extends React.Component {
    render() {
        return (
            <DemoWithSnippet>
                <div className="icon-input">
                    <Input placeholder="small input" className="text-input--sm"/>
                    <i className="im icon-search icon--xs"/>
                </div>
                <br/><br/>
                <div className="icon-input">
                    <Input placeholder="default input" onChange={(value) => console.log(value)} type="text"/>
                    <i className="im icon-search icon--xs"/>
                </div>
                <br/><br/>
                <div className="icon-input icon-input--left">
                    <Input placeholder="default input" onChange={(value) => console.log(value)} type="text"/>
                    <i className="im icon-search icon--xs"/>
                </div>
                <br/><br/>
                <div className="icon-input">
                    <Input placeholder="large Input" className="text-input--lg"/>
                    <i className="im icon-search icon--s"/>
                </div>
            </DemoWithSnippet>
        );
    }
}
