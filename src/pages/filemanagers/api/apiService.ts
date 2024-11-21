import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchFileList = async (path: string | number | boolean) => {
  const response = await axios.get(`${BASE_URL}/fileManager/fileList${encodeURIComponent(path)}`);
  return response.data;
};

export const createDirectory = async (path: any, folderName: any) => {
  const response = await axios.post(`${BASE_URL}/fileManager/create-directory`, {
    directoryName: `${path}${folderName}`,
  });
  return response.data;
};

export const deleteFile = async (path: any, filename: any) => {
  await axios.delete(`${BASE_URL}/fileManager/delete-file${encodeURIComponent(path + filename)}`);
};

export const deleteDirectory = async (path: any, folderName: any) => {
  await axios.delete(`${BASE_URL}/fileManager/delete-directory${encodeURIComponent(path + folderName)}`);
};

export const uploadFiles = async (path: string | number | boolean, formData: any, onUploadProgress: any) => {
    const stringPath = String(path);
    const response = await axios.post(
      `${BASE_URL}/fileManager/uploadMultiFiles%2F${encodeURIComponent(stringPath)}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
    return response.data;
  };

  export const downloadFile = (path: string, filename: string, onProgress?: (progressEvent: ProgressEvent) => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      const downloadLink = `${import.meta.env.VITE_API_BASE_URL}/fileManager/download-file${encodeURIComponent(path)}${encodeURIComponent(filename)}`;
      console.log("Download Link:", downloadLink);
  
      const xhr = new XMLHttpRequest();
      xhr.open("GET", downloadLink, true);
      xhr.responseType = "blob";
      xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          console.log(`Progress: ${percentCompleted}% (Loaded: ${event.loaded}, Total: ${event.total})`);
          if (onProgress) {
            onProgress(event);
          }
        } else {
          console.log("Progress cannot be calculated. Total size unknown.");
        }
      };
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          const blob = new Blob([xhr.response], { type: "application/octet-stream" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
  
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          resolve(); // สำเร็จ
        } else {
          console.error("Download failed with status:", xhr.status);
          reject(new Error(`Download failed with status: ${xhr.status}`));
        }
      };
  
      xhr.onerror = () => {
        console.error("Error during the download process.");
        reject(new Error("Error during the download process."));
      };
  
      xhr.send();
    });
  };

export const downloadFolder = (path: string, folderName: string, onProgress?: (progressEvent: ProgressEvent) => void): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log("Path:", path);
    console.log("Folder Name:", folderName);

    const downloadLink = `${import.meta.env.VITE_API_BASE_URL}/fileManager/download-folder${encodeURIComponent(path)}${encodeURIComponent(folderName)}`;
    console.log("Download Link:", downloadLink);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", downloadLink, true);
    xhr.responseType = "blob";

    // ติดตามความคืบหน้าของการดาวน์โหลด
    xhr.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(event);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${folderName}.zip`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        resolve();
      } else {
        console.error("Download failed with status:", xhr.status);
        reject(new Error(`Download failed with status: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      console.error("Error during the download process.");
      reject(new Error("Error during the download process."));
    };

    xhr.send();
  });
};

export const openFile = (path: any, filename: string | number | boolean) => {
  const fullPath = `${import.meta.env.VITE_API_BASE_URL}${path}/${encodeURIComponent(filename)}`;
  window.open(fullPath, "_blank");
};

export const deleteAllFiles = async (fileList: string[]) => {
  const response = await axios.delete(`${BASE_URL}/fileManager/delete-all`, {
    data: fileList,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};



export const downloadSelectedFiles = async (fileList: string[], onDownloadProgress?: (progressEvent: any) => void) => {
  console.log("Files to download:", fileList);

  try {
    const response = await axios.patch(
      `${BASE_URL}/fileManager/download-multiFile`,
      JSON.stringify(fileList),
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob", 
        onDownloadProgress, 
      }
    );

    if (response.status === 200 && response.data) {
      const blob = new Blob([response.data], { type: 'application/zip' });
      console.log("Blob size:", blob.size);

      if (blob.size > 0) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Primotechfile.zip");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Downloaded file is empty or invalid.");
      }
    } else {
      console.error("Unexpected response or empty data:", response.status);
    }
  } catch (error) {
    console.error("Error downloading selected files:", error);
    throw error;
  }
};

export const renameFolder = async (oldDirectoryName: string, newDirectoryName: string, onRenameProgress?: (progressEvent: any) => void) => {
  console.log("Renaming folder from:", oldDirectoryName, "to:", newDirectoryName);

  try {
    const response = await axios.patch(
      `${BASE_URL}/fileManager/rename-folder`,
      {
        oldDirectoryName,
        newDirectoryName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
        onUploadProgress: onRenameProgress,
      }
    );

    if (response.status === 200 && response.data) {
      console.log("Folder renamed successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response or empty data:", response.status);
      throw new Error("Rename operation failed");
    }
  } catch (error) {
    console.error("Error renaming folder:", error);
    throw error;
  }
};