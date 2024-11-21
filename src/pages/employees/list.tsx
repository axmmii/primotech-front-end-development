import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { Space, Table } from "antd";

export const EmployeeList = () => {
  const { tableProps } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });
  return (
    <div>
      <List headerButtons={<CreateButton resource="employee" />} />
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="employeeId" title="ID" />
        <Table.Column dataIndex="firstName" title="First Name" />
        <Table.Column dataIndex="lastName" title="Last Name" />
        <Table.Column dataIndex="position" title="Position" />

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
