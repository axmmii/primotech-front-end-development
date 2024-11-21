import { Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { Typography } from "antd";
import { IUser } from "./interface";

export const UserShow = () => {   
  const { queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

    return (
      <Show isLoading={isLoading}>
        <Typography.Title level={5}>Id</Typography.Title>
        <TextField value={record?.id} />

        <Typography.Title level={5}>UserName</Typography.Title>
        <TextField value={record?.userName} />       

        <Typography.Title level={5}>Email</Typography.Title>
        <TextField value={record?.email} />    

        <Typography.Title level={5}>Status</Typography.Title>
        <TextField value={record?.status} />     
       
      </Show>
    );
};
