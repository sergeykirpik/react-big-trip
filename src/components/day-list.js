import BaseComponent from '../base-component.js';

export default class DayList extends BaseComponent {
  get template() {
    return `
      <ul class="trip-days">
      </ul>
    `.trim();
  }
}
