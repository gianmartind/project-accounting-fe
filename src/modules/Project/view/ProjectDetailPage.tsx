import { Divider, Form, Space, Typography } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProjectServices from "../project.services";
import type { ProjectDetail } from "../project.interface";
import useNotification from "../../../core/notification.services";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.enum";
import ProjectForm from "../components/ProjectForm";

const ProjectDetailPage = () => {
  const { uuid } = useParams();
  const { getProjectDetail, updateProject } = useProjectServices();
  const [originalProjectDetail, setOriginalProjectDetail] =
    useState<ProjectDetail>();

  useEffect(() => {
    getProjectDetail(uuid ?? "").then((response) => {
      setOriginalProjectDetail(response);
    });
  }, [uuid]);

  const [form] = Form.useForm<ProjectDetail>();
  useEffect(() => {
    form.setFieldsValue({ ...originalProjectDetail });
  }, [originalProjectDetail]);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validateForm = () => {
    const { uuid, ...originalProjectValue } =
      originalProjectDetail as ProjectDetail;
    setFormIsValid(
      JSON.stringify(form.getFieldsValue()) !==
        JSON.stringify(originalProjectValue)
    );
  };

  const { success, failed } = useNotification();
  const handleSave = async () => {
    try {
      await form.validate();
      const response = await updateProject(
        uuid ?? "",
        form.getFieldsValue() as ProjectDetail
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      setOriginalProjectDetail(response);
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
      <Typography.Title heading={5}>Detail Proyek</Typography.Title>
      <ProjectForm
        form={form}
        onValuesChange={validateForm}
        saveDisabled={!formIsValid}
        onSave={handleSave}
      />
      <Divider />
    </Space>
  );
};

export default ProjectDetailPage;
