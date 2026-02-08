import { eventBus, serviceLogService } from "@service";
import { Events } from "@types";
import { logger } from "@utils";

eventBus.onEvent(Events.SERVICE_REQUEST_STATUS_CHANGED, async (payload) => {
  logger.info("SERVICE_REQUEST_STATUS_CHANGED :: ", {
    context: "status changed",
    payload,
  });
  await serviceLogService.create(payload);
});
eventBus.onEvent(Events.SERVICE_REQUEST_STATUS_CREATED, async (payload) => {
  logger.info("SERVICE_REQUEST_STATUS_CREATED :: ", {
    context: "created",
    payload,
  });
  await serviceLogService.create(payload);
});
