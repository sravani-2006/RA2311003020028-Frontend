import { Notification } from "../types/notification";
import { getPriority } from "./priority";

export const sortNotifications = (notifications: Notification[]) => {
  return notifications.sort((a, b) => {
    const priorityDiff = getPriority(b.Type) - getPriority(a.Type);

    if (priorityDiff !== 0) return priorityDiff;

    return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
  });
};
