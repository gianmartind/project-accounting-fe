import { Notification } from "@arco-design/web-react";
import { useCallback } from "react";

const useNotification = (closable?: boolean) => {
  const _closable = closable ?? false;
  const success = useCallback(
    (message: string) => {
      Notification.success({
        closable: _closable,
        title: "Success",
        content: message,
      });
    },
    [_closable]
  );

  const failed = useCallback(
    (message: string) => {
      Notification.error({
        closable: _closable,
        title: "Failed",
        content: message,
      });
    },
    [_closable]
  );

  return { success, failed };
};

export default useNotification;
