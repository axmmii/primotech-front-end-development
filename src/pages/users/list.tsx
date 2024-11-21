import Icon, { FolderAddOutlined } from "@ant-design/icons";
import { CreateButton, DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { useList, useMany } from "@refinedev/core";
import { Space, Table } from "antd";

export const UserList = () => {
  const { tableProps } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const { data: user, isLoading } = useList({
    resource: "user"
  });

  return (
    <div>
     <List headerButtons={
      <CreateButton
        resource="user"
      />}
      />
      
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="userName" title="User Name" />       
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />

            </Space>
          )}
        />
      </Table>
    </div>
  );
};
