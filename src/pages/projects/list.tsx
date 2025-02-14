import {
    CreateButton,
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useTable,
  } from "@refinedev/antd";
  import moment from "moment";
  import { AntdInferencer } from "@refinedev/inferencer/antd";
  import { Input, Space, Table, Tag, Tooltip } from "antd";
  import dayjs from "dayjs";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
  export const ProjectList = () => {
    const { tableProps } = useTable({
      sorters: { initial: [{ field: "id", order: "asc" }] },
      syncWithLocation: true,
    });

    const [searchText, setSearchText] = useState("");

    // ฟังก์ชันกรองข้อมูลจาก search bar
    const filteredData = tableProps.dataSource?.filter((record) => 
        record.projectNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        record.projectName.toLowerCase().includes(searchText.toLowerCase()) ||
        record.customer.toLowerCase().includes(searchText.toLowerCase()) ||
        record.projectManager.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

    
    return (
      <div>
          <List headerButtons={<CreateButton resource="project" />} />
          
          {/* ช่องค้นหา */}
          <Input.Search
              placeholder="Search Project"
              prefix={<SearchOutlined />}
              onSearch={(value) => setSearchText(value)}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 16, width: 300 }}
              allowClear
          />

          <Table
              {...tableProps}
              dataSource={filteredData}  // ใช้ข้อมูลที่ผ่านการกรอง
              rowKey="id"
              size="middle"
              bordered
              rowClassName={() => "custom-row"}
          >
             <Table.Column 
                    dataIndex="projectNumber" 
                    title="Job Number" 
                    sorter={(a, b) => a.projectNumber.localeCompare(b.projectNumber)}  
                    width={180} 
                    render={(text) => <Tag color="blue">{text}</Tag>}  // แสดงเป็น Tag
                />
                <Table.Column 
                    dataIndex="projectName" 
                    title="Project Name" 
                    sorter={(a, b) => a.projectName.localeCompare(b.projectName)}  
                    width={200}
                />
                <Table.Column 
                    dataIndex="description" 
                    title="Description"
                    width={300}
                    render={(text) => (
                        <Tooltip title={text}>
                            {text.length > 30 ? `${text.substring(0, 30)}...` : text}
                        </Tooltip>
                    )}
                />
                <Table.Column 
                    dataIndex="contactNumber" 
                    title="Contact"
                    width={150}
                />
                <Table.Column 
                    dataIndex="customer" 
                    title="Customer" 
                    sorter={(a, b) => a.customer.localeCompare(b.customer)} 
                    width={200}
                />
                <Table.Column 
                    dataIndex="projectManager" 
                    title="PM" 
                    width={150}
                    filters={[
                        { text: "Chaiwat", value: "Chaiwat" },
                        { text: "Thitinut", value: "Thitinut" },
                        { text: "Kasem", value: "Kasem" },
                        { text: "Sarawut", value: "Sarawut" },
                        { text: "Tanongsak", value: "Tanongsak" },
                        { text: "Thanyaphat", value: "Thanyaphat" },
                        { text: "Aekkaphop", value: "Aekkaphop" },
                        { text: "Anut", value: "Anut" },
                    ]}
                    onFilter={(value, record) => record.projectManager.includes(value)}
                    sorter={(a, b) => a.projectManager.localeCompare(b.projectManager)} 
                />
                <Table.Column 
                    dataIndex="startDate" 
                    title="Start Date"  
                    width={200}
                    render={(text) => text ? dayjs(text).format("DD/MM/YYYY") : "-"} 
                    sorter={(a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix()} 
                />
                <Table.Column 
                    dataIndex="endDate" 
                    title="End Date"  
                    width={180}
                    render={(text) => text ? dayjs(text).format("DD/MM/YYYY") : "-"} 
                    sorter={(a, b) => dayjs(a.endDate).unix() - dayjs(b.endDate).unix()} 
                />
                <Table.Column
                    dataIndex="warranty"
                    title="Warranty"
                    width={170}
                    sorter={(a, b) => moment(a.warranty, "DD/MM/YYYY").unix() - moment(b.warranty, "DD/MM/YYYY").unix()}
                    render={(date) => moment(date).format("DD/MM/YYYY")}
                />
                <Table.Column 
                    dataIndex="status" 
                    title="Status" 
                    width={150}
                    sorter={(a, b) => a.status.localeCompare(b.status)} 
                    render={(status) => {
                      let color = "";
                      switch (status) {
                          case "New":
                              color = "gray"; // โปรเจกต์ใหม่
                              break;
                          case "On Process":
                              color = "blue"; // กำลังดำเนินการ
                              break;
                          case "On Process 20%":
                              color = "cyan"; // ทำไปได้ 20%
                              break;
                          case "On Process 50%":
                              color = "orange"; // ทำไปได้ 50%
                              break;
                          case "On Process 75%":
                              color = "gold"; // ทำไปได้ 75%
                              break;
                          case "On testing to handover":
                              color = "purple"; // กำลังทดสอบเพื่อส่งมอบ
                              break;
                          case "Completed":
                              color = "green"; // เสร็จสิ้น ✅
                              break;
                          default:
                              color = "red"; // กรณีไม่มีสถานะที่กำหนด
                      }
                        return <Tag color={color}>{status}</Tag>;
                    }}
                />
                <Table.Column
                    title="Actions"
                    width={120}
                    render={(_, record) => (
                        <Space>
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