import { AntdInferencer } from "@refinedev/inferencer/antd";
import React from "react";
import { Create, NumberField, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import { IProject } from "./interface";
import { IEmployee } from "../employees/interface";

export const ProjectCreate = () => {
  const { formProps, saveButtonProps, query } = useForm<IProject>();
  const { selectProps } = useSelect<IEmployee>({
    resource: "employee",
    optionLabel: (item) => `${item.firstName}`,
    optionValue: (item) => item.firstName
   
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Project Number:"
          name={"projectNumber"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Project Name"
          name={["projectName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Customer"
          name={["customer"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name={["description"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name={["contactNumber"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Project Manager"
          name={["projectManager"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            placeholder="Select a employee"
            style={{ width: 300 }}
            {...selectProps}
          />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name={["startDate"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="End Date"
          name={["endDate"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name={["status"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "New",
                value: "New",
              },
              {
                label: "On Process 20%",
                value: "On Process 20%",
              },
              {
                label: "On Process 50%",
                value: "On Process 50%",
              },
              {
                label: "On Process 75%",
                value: "On Process 75%",
              },
              {
                label: "On testing to handover",
                value: "On testing to handover",
              },
              {
                label: "Completed",
                value: "Completed",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
