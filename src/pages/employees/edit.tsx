import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";

export const EmployeeEdit = () => {
  const { formProps, saveButtonProps, query } = useForm();

  const employeeData = query?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Employee ID:"
          name={"employeeId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="First Name"
          name={["firstName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={["lastName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["email"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Position"
          name={["position"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Department"
          name={["department"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name={["phoneNumber"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name={["image"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name={["startDate"]}
          rules={[
            {
              required: true,
            },
          ]}
          // getValueProps={(value) => ({
          //     value: value ? dayjs(value).format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]') : undefined,
          // })}
        >
          {/* <DatePicker /> */}
          <Input />
        </Form.Item>
        <Form.Item
          label="Birth Date"
          name={["birthDate"]}
          rules={[
            {
              required: true,
            },
          ]}
          // getValueProps={(value) => ({
          //     value: value ? dayjs(value).format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]') : undefined,
          // })}
        >
          {/* <DatePicker /> */}
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name={["age"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Address"
          name={["address"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Education"
          name={["education"]}
          rules={[
            {
              required: false,
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
