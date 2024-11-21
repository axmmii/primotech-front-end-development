
export function downloadFileData(filename:any, fileData: any) {
    const pdfBlob = new Blob([fileData], { type: "text/plain;charset=utf-8" });
    const fileUrl = window.URL.createObjectURL(pdfBlob);
    const tempLink = document.createElement("a");
    tempLink.href = fileUrl;
    tempLink.setAttribute(
      "download",
      `download_${filename}`
    ); 
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(fileUrl);
  
 }

