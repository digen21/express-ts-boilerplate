import httpStatus from "http-status";

import {
  FSMContext,
  FSMResult,
  Roles,
  ServiceRequestStatus,
  TransitionRule,
} from "@types";
import { ServerError } from "@utils";

const FSM_RULES: TransitionRule[] = [
  {
    from: ServiceRequestStatus.PENDING,
    to: ServiceRequestStatus.ACCEPTED,
    allowedRoles: [Roles.CUSTOMER],
  },
  {
    from: ServiceRequestStatus.ACCEPTED,
    to: ServiceRequestStatus.IN_PROGRESS,
    allowedRoles: [Roles.STAFF, Roles.ADMIN],
    onTransition: ({
      staffId,
      actorId,
      currentAssignedStaff,
      requestConfirmedAt,
      requestSentAt,
    }) => {
      console.log("requestConfirmedAt ", requestConfirmedAt);

      if (!requestConfirmedAt)
        throw new ServerError({
          message: "Request not confirmed by customer",
          status: httpStatus.FORBIDDEN,
        });

      if (requestSentAt && requestConfirmedAt <= requestSentAt)
        throw new ServerError({
          message: "Invalid confirmation timeline",
          status: httpStatus.FORBIDDEN,
        });

      return {
        assignedStaff: staffId ?? currentAssignedStaff ?? actorId,
        updatedBy: actorId,
        lastUpdatedAt: new Date(),
      };
    },
  },
  {
    from: ServiceRequestStatus.IN_PROGRESS,
    to: ServiceRequestStatus.DONE,
    allowedRoles: [Roles.STAFF, Roles.ADMIN],
    onTransition: ({ actorId }) => ({
      updatedBy: actorId,
      lastUpdatedAt: new Date(),
    }),
  },
  {
    from: ServiceRequestStatus.DONE,
    to: ServiceRequestStatus.DELIVERED,
    allowedRoles: [Roles.STAFF, Roles.ADMIN],
    onTransition: ({ actorId }) => ({
      updatedBy: actorId,
      lastUpdatedAt: new Date(),
    }),
  },
];

// A Finite State Machine is a system that:
// A machine that allow to which status can be updated next and by whom
export function handleServiceRequestStateTransition(
  ctx: FSMContext,
): FSMResult {
  const rule = FSM_RULES.find(
    (r) => r.from === ctx.currentStatus && r.to === ctx.nextStatus,
  );

  console.log("rule ", rule);
  console.log("ctx ", ctx);

  if (!rule) {
    throw new ServerError({
      message: `Invalid status transition: ${ctx.currentStatus} → ${ctx.nextStatus}`,
      status: httpStatus.FORBIDDEN,
    });
  }

  if (!rule.allowedRoles.includes(ctx.role)) {
    throw new ServerError({
      message: "Action not allowed for this role",
      status: httpStatus.FORBIDDEN,
    });
  }

  return {
    status: ctx.nextStatus,
    ...(rule.onTransition ? rule.onTransition(ctx) : {}),
  };
}
