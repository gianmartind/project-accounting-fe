import { Modal } from "@arco-design/web-react";
import { useCallback } from "react";

const useConfirmation = () => {
  const deletion = useCallback((message: string, onConfirm: () => void) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: message,
      onOk: onConfirm,
      okButtonProps: {
        status: "danger",
      },
    });
  }, []);
  return { deletion };
};

export default useConfirmation;
