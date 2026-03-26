import { Form, Space, Spin, Typography } from "@arco-design/web-react";
import type { ProjectDetail } from "../project.interface";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import ProjectForm from "../components/ProjectForm";
import useProjectService from "../project.service";
import { useNavigate } from "react-router";
import { useState } from "react";

const ProjectNewPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ProjectDetail>();

  const navigate = useNavigate();
  const { insertProject } = useProjectService();
  const { success, failed } = useNotification();
  const handleSave = async () => {
    try {
      setPageLoading(true);
      await form.validate();
      const response = await insertProject(
        form.getFieldsValue() as ProjectDetail,
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      navigate(`/project/detail/${response.uuid}`);
    } catch (err) {
      console.log(err);
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <Spin loading={pageLoading} style={{ width: "100%" }}>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Typography.Title heading={5}>Proyek Baru</Typography.Title>
        <ProjectForm form={form} saveDisabled={false} onSave={handleSave} />
      </Space>
    </Spin>
  );
};

export default ProjectNewPage;
