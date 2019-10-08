class EventEmmiter {
  constructor() {
    this._subscribers = {};
  }

  emit(evtType, evt) {
    this._subscribers[evtType] = (this._subscribers[evtType] || []).filter((it) => it !== undefined);

    for (let i = 0, len = this._subscribers[evtType].length; i < len; i++) {
      if (this._subscribers[evtType][len - i - 1](evt) !== true) {
        break;
      }
    }
  }

  on(evtType, callback) {
    const subscribers = this._subscribers[evtType] || [];
    subscribers.push(callback);
    this._subscribers[evtType] = subscribers;
    return callback;
  }

  off(evtType, callback) {
    const idx = this._subscribers[evtType].findIndex((it) => it === callback);
    this._subscribers[evtType].splice(idx, 1);
  }
}

export const eventEmmiter = new EventEmmiter();
