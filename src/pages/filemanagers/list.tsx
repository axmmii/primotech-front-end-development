"use client";
import { Breadcrumb, Divider, message, Progress, Tooltip, Typography } from "antd";
import { useState, useEffect } from "react";
import {
  List,
  ShowButton,
  TextField,
} from "@refinedev/antd";
import { Table, Space, Button, Modal, Form, Input, Upload, notification } from "antd";
import {
  FolderAddOutlined,
  FilePdfOutlined,
  FolderOutlined,
  FileImageOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UploadFile } from './interface';
import {
    fetchFileList,
    createDirectory,
    deleteFile,
    deleteDirectory,
    uploadFiles,
    downloadFile,
    openFile,
    deleteAllFiles,
    downloadSelectedFiles,
    downloadFolder,
    renameFolder,
  } from "./api/apiService";

export const FileManagerList = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentPath, setCurrentPath] = useState("/");
  const [pathHistory, setPathHistory] = useState<string[]>(["/"]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isModalUploadVisible, setIsModalUploadVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // เพิ่มการใช้ useState
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [oldFolderName, setOldFolderName] = useState<string>("");
  const [newFolderName, setNewFolderName] = useState<string>("");

  const [fileList, setFileList] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const data = await fetchFileList(currentPath);
      setData(Array.isArray(data) ? data : []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPath]);

  const getShortenedPath = (path: string, maxLength: number = 40) => {
    return path.length > maxLength ? path.slice(0, maxLength) + "..." : path;
  };

  const handleBreadcrumbClick = (path: string) => {
    setCurrentPath(path);
    setPathHistory((prevHistory) => {
      const index = prevHistory.indexOf(path);
      return prevHistory.slice(0, index + 1);
    });
  };
  
  const handleCreateFolder = async () => {
    try {
      const values = await form.validateFields();
      const response = await createDirectory(currentPath, values.folderName);
      notification.success({
        message: "Success",
        description: response.message || "Folder created successfully",
        placement: "bottomRight",
      });
      setIsModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      console.error("Error creating folder:", error);
      notification.error({
        message: "Error",
        description: "Failed to create folder. Please try again.",
        placement: "bottomRight",
      });
    }
  };
  const handleDeleteFile = (filename: string) => {
    Modal.confirm({
      title: `Are you sure you want to delete the file "${filename}"?`,
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteFile(currentPath, filename);
          notification.success({
            message: "File deleted successfully",
            placement: "bottomRight",
          });
          fetchData();
        } catch (error) {
          console.error("Error deleting file:", error);
          notification.error({
            message: "Failed to delete file",
            placement: "bottomRight",
          });
        }
      },
    });
  };
  const handleDeleteFolder = (folderName: any) => {
    Modal.confirm({
      title: `Are you sure you want to delete the folder "${folderName}"?`,
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteDirectory(currentPath, folderName);
          notification.success({
            message: "Folder deleted successfully",
            placement: "bottomRight",
          });
          fetchData();
        } catch (error) {
          console.error("Error deleting folder:", error);
          notification.error({
            message: "Failed to delete folder",
            placement: "bottomRight",
          });
        }
      },
    });
  };
  
  const handleDeleteAllFiles = () => {
    Modal.confirm({
      title: "Are you sure you want to delete all files?",
      content: "This action will permanently delete all files and cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteAllFiles(selectedFiles);
          setSelectedFiles([]);
          fetchData();
          notification.success({
            message: "All files deleted successfully",
            placement: "bottomRight",
          });
        } catch (error) {
          console.error("Error deleting all files:", error);
          notification.error({
            message: "Failed to delete all files",
            placement: "bottomRight",
          });
        }
      },
    });
  };
  const getFolderName = () => {
    const pathSegments = currentPath.split("/").filter(Boolean);
    return pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "Root";
  };
  const handleBackClick = () => {
    if (pathHistory.length > 1) {
      const newPathHistory = [...pathHistory];
      newPathHistory.pop();
      const previousPath = newPathHistory[newPathHistory.length - 1];
      setPathHistory(newPathHistory);
      setCurrentPath(previousPath);
    }
  };
  
  const handleDownloadFile = async (path: string, filename: string) => {
    if (!filename) {
      message.warning("No file selected for download.");
      return;
    }
  
    const key = 'downloadProgress';
    notification.open({
      key,
      message: 'Download in Progress',
      description: <Progress percent={0} status="active" />,
      duration: 0,
      placement: "bottomRight",
    });
  
    try {
      await downloadFile(path, filename, (progressEvent: ProgressEvent) => {
        if (progressEvent.lengthComputable) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          notification.open({
            key,
            message: 'Download in Progress',
            description: <Progress percent={percentCompleted} status="active" />,
            duration: 0,
            placement: "bottomRight",
          });
        }
      });
  
      notification.success({
        key,
        message: 'Download Completed',
        description: `The file "${filename}" has been downloaded successfully.`,
        placement: "bottomRight",
        icon: <DownloadOutlined style={{ color: '#52c41a' }} />,
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      notification.error({
        key,
        message: 'Download Failed',
        description: `Failed to download the file "${filename}". Please try again.`,
        placement: "bottomRight",
        icon: <FileOutlined style={{ color: '#f5222d' }} />,
      });
    }
  };


  const handleDownloadFolder = async (path: string, filename: string) => {
    if (!filename) {
      message.warning("No folder selected for download.");
      return;
    }
  
    const key = 'downloadProgress';
    notification.open({
      key,
      message: 'Download in Progress',
      description: <Progress percent={0} status="active" />,
      duration: 0,
      placement: "bottomRight",
    });
  
    try {
      await downloadFolder(path, filename, (progressEvent: any) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          notification.open({
            key,
            message: 'Download in Progress',
            description: <Progress percent={percentCompleted} status="active" />,
            duration: 0,
            placement: "bottomRight",
          });
        }
      });
  
      notification.success({
        key,
        message: 'Download Completed',
        description: `The folder "${filename}" has been downloaded successfully.`,
        placement: "bottomRight",
      });
    } catch (error) {
      console.error("Error downloading folder:", error);
      notification.error({
        key,
        message: 'Download Failed',
        description: `Failed to download the folder "${filename}". Please try again.`,
        placement: "bottomRight",
      });
    }
  };

  const handleDownloadSelectedFiles = async () => {
    if (selectedFiles.length === 0) {
      message.warning("Please select files to download.");
      return;
    }
  
    Modal.confirm({
      title: 'Are you sure you want to download the selected files?',
      content: 'This action will download the selected files to your device.',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        const key = 'downloadProgress';
        notification.open({
          key,
          message: 'Download in Progress',
          description: <Progress percent={0} status="active" />,
          duration: 0,
          placement: "bottomRight",
        });
  
        try {
          await downloadSelectedFiles(selectedFiles, (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              notification.open({
                key,
                message: 'Download in Progress',
                description: <Progress percent={percentCompleted} status="active" />,
                duration: 0,
                placement: "bottomRight",
              });
            }
          });
          notification.success({
            key,
            message: 'Download Completed',
            description: 'Your files have been downloaded successfully.',
            placement: "bottomRight",
          });
        } catch (error) {
          console.error("Error downloading selected files:", error);
          notification.error({
            key,
            message: 'Download Failed',
            description: 'Failed to download the selected files.',
            placement: "bottomRight",
          });
        }
      }
    });
  };

  const rowSelection = {
    selectedRows: selectedFiles,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      const paths = selectedRows.map(row => `${currentPath}${row.filename}`);
      setSelectedFiles(paths);
    },
  };

  const handleOpenUploadModal = () => {
    setIsModalUploadVisible(true);
  };
  
  const handleFolderClick = (folderName: string) => {
    const newPath = `${currentPath}${folderName}/`;
    setPathHistory([...pathHistory, newPath]);
    setCurrentPath(newPath);
  };
  
  const getFileIcon = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    if (extension === "pdf") {
      return <FilePdfOutlined style={{ color: "#d32029" }} />;
    } else if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
      return <FileImageOutlined style={{ color: "#1890ff" }} />;
    } else if (["xls", "xlsx"].includes(extension || "")) {
      return <FileExcelOutlined style={{ color: "#52c41a" }} />;
    } else if (["doc", "docx"].includes(extension || "")) {
      return <FileWordOutlined style={{ color: "#1890ff" }} />;
    } else {
      return <FileOutlined style={{ color: "#8c8c8c" }} />;
    }
  };
 
 const handleReNameFolder = (oldName: string) => {
  setOldFolderName(oldName);
  setNewFolderName(oldName);
  setIsRenameModalVisible(true);
};

const handleRenameSubmit = async () => {
  const oldPath = `${currentPath}${oldFolderName}`;
  const newPath = `${currentPath}${newFolderName}`;
  if (newFolderName && newFolderName !== oldFolderName) {
    try {
      const result = await renameFolder(oldPath, newPath);
    
      const newDirectoryName = result.newDirectoryName || newFolderName;

      notification.success({
        message: "Folder renamed successfully",
        description: `Renamed to: ${newDirectoryName}`,
        placement: "bottomRight",
      });
      
      setIsRenameModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error renaming folder:", error);
      notification.error({
        message: "Failed to rename folder",
        description: "Please try again.",
        placement: "bottomRight",
      });
    }
  }
};

  const handleUpload = async () => {
    
    try {
      const formData = new FormData();
      fileList.forEach((file: string | Blob) => {
        formData.append("files", file);
      });
      formData.append("directory", currentPath);
      console.log(uploadFiles)
      await uploadFiles(currentPath, formData, (progressEvent: any) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
  
      notification.success({
        message: "Upload Completed",
        description: "Files uploaded successfully!",
        placement: "bottomRight",
      });
      setFileList([]);
      setUploadProgress(0);
      setIsModalUploadVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error during file upload:", error);
      notification.error({
        message: "Upload Failed",
        description: "There was an issue uploading your files. Please try again.",
        placement: "bottomRight",
      });
    }
  };
 
 const beforeUpload = (file: UploadFile) => {
  setFileList((prevList) => [...prevList, file]);
  return false;
};

const handleRemoveFile = (file: { uid: string }) => {
  setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
};

const handleFileListRender = () => {
  return fileList.map((file) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }} key={file.uid}>
      {getFileIcon(file.name)}
      <span style={{ marginLeft: '10px', flex: 1 }}>{file.name}</span>
      <Button
        type="text"
        icon={<DeleteOutlined />}
        onClick={() => handleRemoveFile(file)}
      />
    </div>
  ));
};
  return (
    <List
    title={
      <div
      style={{
        padding: "16px",
        borderRadius: "8px",
      }}
    >
        <div style={{ display: "flex", alignItems: "center",marginRight: "60px"  }}>
          <FolderOutlined style={{ fontSize: "32px", color: "#1890ff", marginRight: "12px" }} />
          <Typography.Title level={3} style={{ margin: 0, fontWeight: 600 }}>
            File Manager
          </Typography.Title>
        </div>
        <Divider style={{ margin: "12px 0" }} />
        
        <Breadcrumb style={{ marginLeft: "16px" }}>
  {pathHistory.map((path, index) => (
    <Breadcrumb.Item key={index}>
      <a onClick={() => handleBreadcrumbClick(path)}>
        {path === "/" ? "Root" : getShortenedPath(path.split("/").filter(Boolean).pop() || "")}
      </a>
    </Breadcrumb.Item>
  ))}
</Breadcrumb>
      </div>
    }
    headerButtons={
      <>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackClick}
          disabled={pathHistory.length <= 1}
        >
          Back
        </Button>
        <Button
          type="primary"
          icon={<FolderAddOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Create Folder
        </Button>
        <Button type="primary" onClick={handleOpenUploadModal}>
        Upload Files
      </Button>
    
      {selectedFiles.length > 0 && (
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDeleteAllFiles}
          >
            Delete Selected
          </Button>
        )}
        {selectedFiles.length > 0 && (
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadSelectedFiles}
          >
            Download Selected
          </Button>
        )}
      <Modal
    title="Upload Files"
    visible={isModalUploadVisible}
    onOk={handleUpload}
    onCancel={() => setIsModalUploadVisible(false)}
    okText="Upload"
    cancelText="Cancel"
  >
    
    <Form layout="vertical">
      <Form.Item label="Files">
        <Upload.Dragger
          multiple
          beforeUpload={beforeUpload}
          fileList={fileList}
          onRemove={handleRemoveFile}
          listType="picture"
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Drag & drop files here, or click to select files</p>
        </Upload.Dragger>
        <div style={{ marginTop: '10px' }}>
          {handleFileListRender()}
        </div>
      </Form.Item>
      {uploadProgress > 0 && (
        <Progress percent={uploadProgress} status="active" />
      )}
    </Form>
  </Modal>
  <Modal
  title="Rename Folder"
  visible={isRenameModalVisible}
  onOk={handleRenameSubmit}
  onCancel={() => setIsRenameModalVisible(false)}
  okText="Rename"
  cancelText="Cancel"
>
  <Form layout="vertical">
    <Form.Item label="New Folder Name">
      <Input
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        placeholder="Enter new folder name"
      />
    </Form.Item>
  </Form>
</Modal>
        <Modal
          title="Create New Folder"
          visible={isModalVisible}
          onOk={handleCreateFolder}
          onCancel={() => setIsModalVisible(false)}
          okText="Create"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="folderName"
              label="Folder Name"
              rules={[{ required: true, message: "Please enter a folder name" }]}
            >
              <Input placeholder="Enter folder name" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    }
  >
    <div style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
    <Table
      dataSource={data}
      loading={isLoading}
      rowKey="filename"
      rowSelection={rowSelection}
      scroll={{ x: 'max-content' }}
    >
        <Table.Column
          dataIndex="filename"
          title="File/Folder"
          responsive={['xs', 'sm', 'md', 'lg', 'xl']}
          render={(value, record) => (
            <Space>
              {record.isDir ? (
                <Tooltip title="Open Folder">
                  <FolderOutlined
                    style={{ color: "#faad14", cursor: "pointer", fontSize: "1.1em" }}
                    onClick={() => handleFolderClick(record.filename)}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="File">
                <span onClick={() => openFile(record.path, record.filename)} style={{ cursor: "pointer" }}>
                  {getFileIcon(record.filename)}
                </span>
              </Tooltip>
              )}
             <Tooltip title={record.isDir ? "Open Folder" : "View File"}>
              <Typography.Text
                style={{ cursor: "pointer", marginLeft: "8px", fontSize: "1.1em", fontWeight: "500" }}
                onClick={() => record.isDir ? handleFolderClick(record.filename) : openFile(record.path, record.filename)}
              >
                {value}
              </Typography.Text>
            </Tooltip>
            </Space>
          )}
        />
       
        <Table.Column
          dataIndex="status"
          title="Status"
          responsive={['md', 'lg', 'xl']}
          render={(value, record) => (
            <TextField
              value={record.isDir ? "Active" : value === "in progress" ? "In Progress" : "Finished"}
            />
          )}
        />
        <Table.Column<any>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              {!record.isDir && (
                <>
                  <Tooltip title="Download">
                    <Button
                      type="default"
                      size="small"
                      shape="circle"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownloadFile(record.path, record.filename)}
                    />
                  </Tooltip>
                  <Tooltip title="View">
                    <ShowButton
                      hideText
                      size="small"
                      shape="circle"
                      recordItemId={record.id}
                      onClick={() => openFile(record.path, record.filename)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button
                      size="small"
                      type="default"
                      shape="circle"
                      danger
                      icon={<DeleteOutlined style={{ color: "red" }} />}
                      onClick={() => handleDeleteFile(record.filename)}
                    />
                  </Tooltip>
                </>
              )}
              {record.isDir && (
                <><Tooltip title="Download Folder">
                  <Button
                    type="default"
                    shape="circle"
                    size="small"
                    icon={<DownloadOutlined />}
                    onClick={() => handleDownloadFolder(record.path,record.filename)} />
                </Tooltip>
                <Tooltip title="Rename Folder">
                  <Button
                    type="default"
                    shape="circle"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => handleReNameFolder(record.filename)} />
                </Tooltip>
                <Tooltip title="Delete Folder">
                    <Button
                      type="default"
                      shape="circle"
                      danger
                      size="small"
                      icon={<DeleteOutlined style={{ color: "red" }} />}
                      onClick={() => handleDeleteFolder(record.filename)} />
                  </Tooltip>
                  </>
              )}
            </Space>
          )}
        />
      </Table>
    </div>
  </List>
  );
};
