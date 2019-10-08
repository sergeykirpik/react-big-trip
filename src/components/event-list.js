import BaseComponent from "../base-component";

export default class EventList extends BaseComponent {
  get template() {
    return `
    <ul class="trip-events__list">
      <!-- EventSlot -->
    </ul>
  `.trim();
  }
}
