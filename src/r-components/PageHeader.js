import React from 'react';
import TripInfo from './TripInfo';
import { dataProvider, FilterType } from '../services/data-provider';
import TripControls from './TripControls';
import NewEventButton from './NewEventButton';

export default class PageHeader extends React.Component {
  render() {
    return (
    <div className="page-body__container  page-header__container">
      <img className="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo" />
      <div className="trip-main">
        <TripInfo route={dataProvider.route}/>
        <TripControls 
          menuItems={['table', 'stats']} 
          activeItem='table'
          filterItems={Object.keys(FilterType)}
          currentFilter='everything' />
        <NewEventButton />
      </div>
    </div>

    );
  }
}