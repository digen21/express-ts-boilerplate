import { EventEmitter } from "events";

import { Events } from "@types";
import { logger } from "@utils";

class EventBus extends EventEmitter {
  emitEvent<T>(event: Events, payload: T) {
    this.emit(event, payload);
  }

  onEvent<T>(event: Events, handler: (payload: T) => Promise<void>) {
    this.on(event, async (payload) => {
      try {
        await handler(payload);
      } catch (err) {
        logger.error("[EVENT FAILED] ", {
          context: event,
          error: err,
        });
      }
    });
  }
}

export const eventBus = new EventBus();
eventBus.setMaxListeners(20);
