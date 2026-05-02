import axios from "axios";
import { Notification } from "../types/notification";
import { logger } from "../logger/logger";

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    logger.info("Fetching notifications from API");

    const response = await axios.get(API_URL);

    logger.info("Fetched notifications count", { count: response.data.length });

    return response.data;
  } catch (error: any) {
    logger.error("Error fetching notifications", { error: error.message });
    throw error;
  }
};
