/*! Copyright 2025 Adobe
All Rights Reserved. */
const hash = Date.now().toString(36).substring(2);
const _events = class _events {
  /**
   * Returns the last payload of the event.
   * @param event – The event to get the last payload from.
   * @returns – The last payload of the event.
   */
  static lastPayload(event) {
    var _a;
    return (_a = this._lastEvent[event]) == null ? void 0 : _a.payload;
  }
  /**
   * Subscribes to an event.
   * @param event - The event to subscribe to.
   * @param handler - The event handler.
   * @param options - Optional configuration for the event handler.
   */
  static on(event, handler, options) {
    if (typeof BroadcastChannel === "undefined") {
      return;
    }
    const subscriber = new BroadcastChannel("ElsieSDK/EventBus");
    if (options == null ? void 0 : options.eager) {
      const lastEvent = this._lastEvent[event];
      if (lastEvent) {
        handler(lastEvent.payload);
      }
    }
    subscriber.addEventListener("message", ({ data }) => {
      if (this._identifier && this._identifier !== data.identifier) return;
      if (data.event === event) {
        handler(data.payload);
      }
    });
    return {
      off() {
        subscriber.close();
      }
    };
  }
  /**
   * Emits an event.
   * @param event - The event to emit.
   * @param payload - The event payload.
   */
  static emit(event, payload) {
    if (typeof BroadcastChannel === "undefined") {
      return;
    }
    const publisher = new BroadcastChannel("ElsieSDK/EventBus");
    publisher.postMessage({ event, identifier: this._identifier, payload });
    this._lastEvent[event] = {
      payload
    };
    publisher.close();
  }
  /**
   * Enables or disables event logging.
   * @param enabled - Whether to enable or disable event logging.
   */
  static enableLogger(enabled) {
    var _a;
    if (typeof BroadcastChannel === "undefined") {
      return;
    }
    (_a = this._logger) == null ? void 0 : _a.close();
    this._logger = null;
    if (enabled === false) return;
    this._logger = new BroadcastChannel("ElsieSDK/EventBus");
    this._logger.addEventListener("message", ({ data }) => {
      if (this._identifier && this._identifier !== data.identifier) return;
      console.group(`📡 Event (${data.identifier}) ➡ ${data.event}`);
      console.log(data.payload);
      console.groupEnd();
    });
  }
};
_events._identifier = hash;
_events._logger = null;
_events._lastEvent = {};
let events = _events;
export {
  events as e
};
//# sourceMappingURL=index.js.map
