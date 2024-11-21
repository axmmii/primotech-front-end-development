import React from "react";
import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    DateField,
    TagField,
    TextField,
    MarkdownField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProjectShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Project Number</Title>
            <TextField value={record?.projectNumber} />
            <Title level={5}>Project Name</Title>
            <TextField value={record?.projectName} />
            <Title level={5}>Customer</Title>
            <TextField value={record?.customer} />
            <Title level={5}>Description</Title>
            <MarkdownField value={record?.description} />
            <Title level={5}>Contact Number</Title>
            <TextField value={record?.contactNumber} />
            <Title level={5}>Start Date</Title>
            <DateField value={record?.startDate} />
            <Title level={5}>End Date</Title>
            <DateField value={record?.endDate} />
            <Title level={5}>Project Manager</Title>
            <TextField value={record?.projectManager} />
            <Title level={5}>Status</Title>
            <TextField value={record?.status} />
            <Title level={5}>Created At</Title>
            <DateField value={record?.createdAt} />
        </Show>
    );
};
