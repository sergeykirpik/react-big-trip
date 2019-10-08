import BaseComponent from "../base-component";

export default class TripEventsSection extends BaseComponent {
  get template() {
    return `
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <!-- NoPoints -->
      <!-- or -->
      <!-- TripSort -->
      <!-- DayList -->
    </section>`.trim();
  }
}
