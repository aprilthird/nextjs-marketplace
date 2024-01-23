import Notification from "@/lib/models/notifications";
import classNames from "classnames";

type Props = {
  notification: Notification;
  hasBorder?: boolean;
};

const NotificationCard = ({ notification, hasBorder = true }: Props) => {
  return (
    <div
      className={classNames(
        "rounded-lg p-4",
        hasBorder ? "border-2 shadow-md" : ""
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex column space-x-4">
          <div className="flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"></path>
            </svg>
          </div>
          <div>
            <div className="font-medium">{notification.text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
