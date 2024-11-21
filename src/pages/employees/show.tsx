import React from "react";
import { useShow, useOne } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    EmailField,
    DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const EmployeeShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    // const { data: employeeData, isLoading: employeeIsLoading } = useOne({
    //     resource: "employee",
    //     id: record?.id || "",
    //     queryOptions: {
    //         enabled: !!record,
    //     },
    // });

    return (
        <Show isLoading={isLoading}>
            
            {/* <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} /> */}
            <Title level={5}>Employee ID</Title>
            <TextField value={record?.employeeId} />
            <Title level={5}>First Name</Title>
            <TextField value={record?.firstName} />
            <Title level={5}>Last Name</Title>
            <TextField value={record?.lastName} />
            <Title level={5}>Email</Title>
            <EmailField value={record?.email} />
            <Title level={5}>Position</Title>
            <TextField value={record?.position} />
            <Title level={5}>Department</Title>
            <TextField value={record?.department} />
            <Title level={5}>Phone Number</Title>
            <NumberField value={record?.phoneNumber ?? ""} />
            <Title level={5}>Image</Title>
            <TextField value={record?.image} />
            <Title level={5}>Start Date</Title>
            <DateField value={record?.startDate} />
            <Title level={5}>Birth Date</Title>
            <DateField value={record?.birthDate} />
            <Title level={5}>Age</Title>
            <NumberField value={record?.age ?? ""} />
            <Title level={5}>Address</Title>
            <TextField value={record?.address} />
            <Title level={5}>Education</Title>
            <TextField value={record?.education} />
            <Title level={5}>Status</Title>
            <TextField value={record?.status} />
            <Title level={5}>Created At</Title>
            <DateField value={record?.createdAt} />
        </Show>
    );
};
