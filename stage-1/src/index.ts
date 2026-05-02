import { fetchNotifications } from "./services/notificationService";
import { sortNotifications } from "./utils/sorter";
import { logger } from "./logger/logger";

const TOP_N = 10;

const main = async () => {
  try {
    const notifications = await fetchNotifications();

    logger.info("Processing notifications...");

    const sorted = sortNotifications(notifications);

    const topNotifications = sorted.slice(0, TOP_N);

    logger.info("Top 10 notifications computed");

    console.log("\n===== TOP 10 PRIORITY NOTIFICATIONS =====\n");

    topNotifications.forEach((n, index) => {
      console.log(
        `${index + 1}. [${n.Type}] ${n.Message} - ${n.Timestamp}`
      );
    });

  } catch (error) {
    logger.error("Application failed");
  }
};

main();
