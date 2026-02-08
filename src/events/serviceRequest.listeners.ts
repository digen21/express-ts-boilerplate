import { eventBus, serviceLogService } from "@service";
import { Events } from "@types";

eventBus.onEvent(Events.SERVICE_REQUEST_STATUS_CHANGED, async (payload) => {
  await serviceLogService.create(payload);
});
eventBus.onEvent(Events.SERVICE_REQUEST_STATUS_CREATED, async (payload) => {
  await serviceLogService.create(payload);
});
