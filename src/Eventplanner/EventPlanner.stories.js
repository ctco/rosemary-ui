import React from 'react';
import EventPlanner from './index';
import {storiesOf} from '@storybook/react/dist/client/preview/index';
import Popup from '../Popup';

const nonWorkingDays = [
    new Date(2015, 2, 31),
    new Date(2015, 4, 2),
    new Date(2015, 3, 4),
    new Date(2015, 3, 5),
    new Date(2015, 3, 19),
    new Date(2015, 3, 25),
    new Date(2015, 3, 26),
    new Date(2015, 3, 20)
];
const events = [
    {
        'title': 'All Day Event',
        'allDay': true,
        'start': new Date(2015, 2, 30),
        'end': new Date(2015, 2, 30),
        'type': 'vacation'
    },
    {
        'title': 'Sick All Day',
        'allDay': true,
        'start': new Date(2015, 3, 0),
        'end': new Date(2015, 3, 0),
        'icon': 'icon-sick',
        'type': 'sick'
    },
    {
        'title': 'Long Event',
        'start': new Date(2015, 3, 7),
        'end': new Date(2015, 3, 20),
        'type': 'businessTrip'
    },

    {
        'title': 'DTS STARTS',
        'start': new Date(2016, 2, 13, 0, 0, 0),
        'end': new Date(2016, 2, 20, 0, 0, 0)
    },

    {
        'title': 'DTS ENDS',
        'start': new Date(2016, 10, 6, 0, 0, 0),
        'end': new Date(2016, 10, 13, 0, 0, 0)
    },

    {
        'title': 'Some Event',
        'start': new Date(2015, 3, 9, 0, 0, 0),
        'end': new Date(2015, 3, 9, 0, 0, 0)
    },
    {
        'title': 'Conference',
        'start': new Date(2015, 3, 11),
        'end': new Date(2015, 3, 13),
        'type': 'sprint',
        desc: 'Big conference for important people'
    },
    {
        'title': 'Meeting',
        'start': new Date(2015, 3, 12, 10, 30, 0, 0),
        'end': new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        'title': 'Lunch',
        'start': new Date(2015, 3, 12, 12, 0, 0, 0),
        'end': new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    },
    {
        'title': 'Meeting',
        'start': new Date(2015, 3, 12, 14, 0, 0, 0),
        'end': new Date(2015, 3, 12, 15, 0, 0, 0)
    },
    {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    },
    {
        'title': 'Dinner',
        'start': new Date(2015, 3, 12, 20, 0, 0, 0),
        'end': new Date(2015, 3, 12, 21, 0, 0, 0),
        icon: 'icon-cal-vacation'
    },
    {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    },
    {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    }, {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    }, {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    }, {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    }, {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    }, {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    },

    {
        'title': 'Birthday Party',
        'start': new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0),
        'type': 'birthday'
    },
    {
        'title': 'Another Birthday Party',
        'start': new Date(2015, 3, 27, 7, 0, 0),
        'end': new Date(2015, 3, 28, 10, 30, 0),
        'type': 'birthday',
        icon: 'icon-gift'
    },
    {
        'title': 'Another Birthday Party',
        'start': new Date(2015, 3, 27, 7, 0, 0),
        'end': new Date(2015, 3, 28, 10, 30, 0),
        'type': 'birthday',
        icon: 'icon-gift'
    },
    {
        'title': 'Another Birthday Party',
        'start': new Date(2015, 3, 27, 7, 0, 0),
        'end': new Date(2015, 3, 28, 10, 30, 0),
        'type': 'birthday',
        icon: 'icon-gift'
    },
    {
        'title': 'Another Birthday Party',
        'start': new Date(2015, 3, 27, 7, 0, 0),
        'end': new Date(2015, 3, 28, 10, 30, 0),
        'type': 'birthday',
        icon: 'icon-gift'
    },
    {
        'title': 'Another Birthday Party',
        'start': new Date(2015, 3, 27, 7, 0, 0),
        'end': new Date(2015, 3, 28, 10, 30, 0),
        'type': 'birthday',
        icon: 'icon-gift'
    },
    {
        'title': 'Another Birthday Party',
        'start': new Date(2015, 3, 27, 7, 0, 0),
        'end': new Date(2015, 3, 28, 10, 30, 0),
        'type': 'birthday',
        icon: 'icon-gift'
    }
];

class MyEvent extends React.Component {
    render() {
        return (
            <Popup on="click" attachment="bottom center">
                <div>{this.props.title}</div>
                bottom center
            </Popup>
        );
    }
}

class EventPlannerDemo extends React.Component {

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

            <div style={{width: '800px', height: '800px'}}>
                <EventPlanner
                    popup
                    onRangeSelected={({start, end}) => {
                        console.log(start);
                        console.log(end);
                    }}
                    titleAccessor={this.getTitle}
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
        );
    }

    getTitle = (event) => {
        if (event.icon) {
            return <span title={event.title}><i className={`icon--xxs im ${event.icon}`}/> {event.title}</span>;
        }
        return event.title;
    }
}

storiesOf('EventPlanner', module).add('default', () => <EventPlannerDemo/>);