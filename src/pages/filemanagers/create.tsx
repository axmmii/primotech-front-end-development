import React from "react";
import { Create, getValueFromEvent, useForm } from "@refinedev/antd";
import { Form, Input, Upload } from "antd";
import { useApiUrl } from "@refinedev/core";

export const FileManagerCreate = () => {
  const { formProps, saveButtonProps, query } = useForm();
  const apiUrl = useApiUrl();

  return (
    <Create >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="files"
              action={`${apiUrl}/fileManager/uploadMultiFiles`}
              listType="picture"
              maxCount={5}
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
