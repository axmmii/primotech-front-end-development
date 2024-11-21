import { Edit, useForm } from "@refinedev/antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps, query } = useForm({
    // refineCoreProps: {
    //   redirect: "show",
    // },
  
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
      <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="User Name" name="userName">
          <Input />
        </Form.Item>
       
        <Form.Item label="Password" name="password">
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Active",
                value: "Active",
              },
              {
                label: "Inactive",
                value: "Inactive",
              },
              {
                label: "None",
                value: "None",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
