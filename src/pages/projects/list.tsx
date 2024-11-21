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
  
  export const ProjectList = () => {
    const { tableProps } = useTable({
      sorters: { initial: [{ field: "id", order: "asc" }] },
      syncWithLocation: true,
    });
    return (
      <div>
        <List headerButtons={<CreateButton resource="project" />} />
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="projectNumber" title="Job Number" />
          <Table.Column dataIndex="projectName" title="Project Name" />
          <Table.Column dataIndex="description" title="Description" />
          <Table.Column dataIndex="contactNumber" title="Contact Number" />
          <Table.Column dataIndex="customer" title="Customer" />  
          <Table.Column dataIndex="projectManager" title="PM" />
          <Table.Column dataIndex="startDate" title="Start Date" />
          <Table.Column dataIndex="endDate" title="End Date" />
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
  