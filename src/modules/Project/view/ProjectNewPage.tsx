import {
  Divider,
  Form,
  Space,
  Typography,
} from "@arco-design/web-react";
import type { ProjectDetail } from "../project.interface";
import useNotification from "../../../core/notification.services";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.enum";
import ProjectForm from "../components/ProjectForm";
import useProjectServices from "../project.services";
import { useNavigate } from "react-router";

const ProjectNewPage = () => {
  const [form] = Form.useForm<ProjectDetail>();

  const navigate = useNavigate();
  const { insertProject } = useProjectServices();
  const { success, failed } = useNotification();
  const handleSave = async () => {
    try {
      await form.validate();
      const response = await insertProject(form.getFieldsValue() as ProjectDetail);
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      navigate(`/project/detail/${response.uuid}`)
    } catch (err) {
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    }
  };

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Typography.Title heading={5}>Proyek Baru</Typography.Title>
      <ProjectForm
        form={form}
        saveDisabled={false}
        onSave={handleSave}
      />
      <Divider />
    </Space>
  );
};

export default ProjectNewPage;
