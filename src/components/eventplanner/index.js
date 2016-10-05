import {assign} from 'lodash';

import Calendar from './Calendar';
import { set as setLocalizer } from './localizer';
import momentLocalizer from './localizers/moment';
import viewLabel from './utils/viewLabel';
import move from './utils/move';
import { views } from './utils/constants';
import {getConfiguredMoment} from '../../util/date-utils';

assign(Calendar, {
  setLocalizer,
  momentLocalizer,
  label: viewLabel,
  views,
  move
});

Calendar.setLocalizer(
    Calendar.momentLocalizer(getConfiguredMoment())
);

export default Calendar;
