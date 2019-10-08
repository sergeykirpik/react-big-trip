import BaseComponent from '../base-component.js';

export default class NoPoints extends BaseComponent {
  get template() {
    return `
      <p class="trip-events__msg">Click New Event to create your first point</p>
    `.trim();
  }
}
