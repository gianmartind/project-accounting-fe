import { Notification } from "@arco-design/web-react";

const useNotification = (closable?: boolean) => {
  const _closable = closable ?? false;
  const success = (message: string) => {
    Notification.success({
      closable: _closable,
      title: "Success",
      content: message,
    });
  };

  const failed = (message: string) => {
    Notification.error({
      closable: _closable,
      title: "Failed",
      content: message,
    });
  };

  return { success, failed };
};

export default useNotification;
