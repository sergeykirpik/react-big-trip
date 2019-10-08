import moment from 'moment';
import React from 'react';
import DayList from './DayList';
import DayItem from './DayItem';
import EventList from './EventList';

export default function GroupedDayList(props) {
  let dayCounter = 1;
  return (
    <DayList>
      {props.pointsByDay.map(it => 
        <DayItem dayCounter={dayCounter++} dayDate={moment(it[0].startTime).format(`YYYY-MM-DD`)} key={dayCounter}>
          <EventList data={it} /> 
        </DayItem>
      )}
    </DayList>
  );
}
