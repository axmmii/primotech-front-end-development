import { Create, SaveButton, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    // refineCoreProps: {
    //   redirect: "edit",
    // },
  });

  return (
    <div>
      <h3>Create User</h3>
      <Create saveButtonProps={saveButtonProps}>
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
      </Create>
    </div>
  );
};
