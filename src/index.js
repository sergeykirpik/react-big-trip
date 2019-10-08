import "../node_modules/flatpickr/dist/flatpickr.min.css";
// import PageController from "./controllers/page-controller";
import {dataProvider, FilterType, SortType} from "./services/data-provider";
import {eventEmmiter} from "./services/event-emmiter";
import {KeyCode} from "./utils";

import React from "react";
import ReactDOM from 'react-dom';
import TripInfo from './r-components/TripInfo';
import TripControls from './r-components/TripControls';
import NewEventButton from './r-components/NewEventButton';
import NoPoints from './r-components/NoPoints';
import DayListHeader from './r-components/DayListHeader';
import GroupedDayList from './r-components/GroupedDayList';
import PageHeader from "./r-components/PageHeader";
import TripEvents from "./r-components/TripEvents";

const init = () => {
  const tripHeaderContainer = document.querySelector(`.page-header`);
  const tripBodyContainer = document.querySelector(`.page-body__page-main`);
  
  ReactDOM.render(<PageHeader />, tripHeaderContainer);

  const pageBody = (
    <div className="page-body__container">
      <TripEvents />
      {/* <!-- Statistics --> */}
    </div>
  );
  ReactDOM.render(pageBody, tripBodyContainer);

}

// const pageController = new PageController({
//   tripHeaderContainer: document.querySelector(`.trip-main`),
//   tripBodyContainer: document.querySelector(`main .page-body__container`),
// });
// pageController.init();

// dataProvider.sync().then(() => dataProvider.load());
dataProvider.load().then(init);

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case KeyCode.ENTER:
      eventEmmiter.emit(`keydown_ENTER`);
      break;
    case KeyCode.ESC:
      eventEmmiter.emit(`keydown_ESC`);
      break;
    default:
  }
}, true);

const oldTitle = document.title;

window.addEventListener(`offline`, () => {
  document.title = oldTitle + ` [OFFLINE]`;
});

// window.addEventListener(`online`, () => {
//   document.title = oldTitle;
//   dataProvider.sync();
// });

document.title = oldTitle + (navigator.onLine ? `` : ` [OFFLINE]`);
