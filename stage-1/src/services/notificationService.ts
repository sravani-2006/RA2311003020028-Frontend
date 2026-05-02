import axios from "axios";
import { Notification } from "../types/notification";
import { logger } from "../logger/logger";
import * as dotenv from "dotenv";

dotenv.config();

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const token = process.env.ACCESS_TOKEN;

    if (!token) {
      throw new Error("No access token found. Please run the auth-flow first.");
    }

    logger.info("Fetching notifications from API");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    logger.info("Fetched notifications count", { count: response.data.length });

    return response.data;
  } catch (error: any) {
    logger.error("Error fetching notifications", { error: error.message });
    throw error;
  }
};
