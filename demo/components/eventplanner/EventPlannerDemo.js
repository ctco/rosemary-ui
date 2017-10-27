import React from 'react';

import DemoWithSnippet from '../../layout/DemoWithSnippet';
import EventPlanner from '../../../src/Eventplanner';
import events from './events';
import nonWorkingDays from './nonWorkingDays';
import MyEvent from './ExampleMyEventComponent';


export default class EventPlannerDemo extends React.Component {

    eventStyleGetter(event, start, end, isSelected) {
        let style = {};
        switch (event.type) {
            case 'vacation':
                style = {backgroundColor: '#74cb14', color: 'white'};
                break;
            case 'businessTrip':
                style = {backgroundColor: '#398ff4', color: 'white'};
                break;
            case 'sick':
                style = {backgroundColor: '#ff455b', color: 'white'};
                break;
            case 'birthday':
                style = {backgroundColor: '#f5a623', color: 'white'};
                break;
            default:
                break;
        }

        if (isSelected) {
            style = {...style, backgroundColor: '#000000'};
        }
        return {
            style: style
        };
    }

    render() {
        return (
            <DemoWithSnippet>
                <div>
                    <h3>Link to: <a href="https://github.com/intljusticemission/react-big-calendar">SourceCode</a></h3>
                    <h3>Link to: <a
                        href="http://intljusticemission.github.io/react-big-calendar/examples/index.html#intro">Example
                        With Api Docs</a></h3>

                    <br/>
                    <hr />
                    <br/>

                    <h3> Example With Custom My Evenet Comnponent </h3>

                    <div style={{width: '800px', height: '800px'}}>
                        <EventPlanner
                            popup
                            onRangeSelected={({start, end}) => {
                                console.log(start);
                                console.log(end);
                            }}
                            events={events}
                            nonWorkingDays={nonWorkingDays}
                            selectable
                            onSelectEvent={(event) => {
                                console.log('onSelectEvent');
                                console.dir(event);
                            }}
                            onSelecting={(start, end) => {
                                console.log('onSelectEvent');
                                return true;
                            }}
                            defaultDate={new Date(2015, 3, 1)}
                            components={{
                                event: MyEvent
                            }}
                            eventPropGetter={(this.eventStyleGetter)}
                        />
                    </div>

                </div>
            </DemoWithSnippet>
        );
    }
}
