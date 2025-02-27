import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { IEmployee } from "../employees/interface";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const ProjectEdit = () => {
  const { formProps, saveButtonProps, query, onFinish } = useForm();

  const projectData = query?.data?.data;

  const { selectProps } = useSelect<IEmployee>({
    resource: "employee",
    optionLabel: (item) => `${item.firstName}`,
    optionValue: (item) => item.firstName
   
  });
   const submit = (e: any) => {
     console.log("data create :", e);
     onFinish({
       ...e,
       startDate: e.startDate ? dayjs(e.startDate).tz("Asia/Bangkok").startOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]") : null,
       endDate: e.endDate ? dayjs(e.endDate).tz("Asia/Bangkok").startOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]") : null,
       warranty: parseInt(e.warranty),
     });
   };
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={submit} autoComplete="off">
        <Form.Item
          label="Project Number"
          name={["projectNumber"]}
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
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
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
          label="Start Date"
          name={["startDate"]}
          getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
          rules={[{ required: true, message: "Please select a start date!" }]}
        >
          <DatePicker  
         style={{ width: "100%" }}
          format="DD/MM/YYYY"
          showTime={false}
        />
        </Form.Item>
         <Form.Item
          label="End Date"
          name={["endDate"]}
          getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
          rules={[{ required: true, message: "Please select an end date!" }]}
           >
          <DatePicker 
            autoComplete="off"
            format="DD/MM/YYYY"
            showTime={false}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Warranty (Day)"
          name={["warranty"]}
          getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
          rules={[
            {
              required: true,
              message: "Please select a warranty date!",
            },
          ]}
        >
          <DatePicker autoComplete="off" format="DD/MM/YYYY" style={{ width: "100%" }}  />
        </Form.Item>
        <Form.Item
          label="Project Manager"
          name={["projectManager"]}
          rules={[
            {
              required: true,
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
          label="Status"
          name={["status"]}
          rules={[
            {
              required: true,
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
                label: "On Process",
                value: "On Process",
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
    </Edit>
  );
};
