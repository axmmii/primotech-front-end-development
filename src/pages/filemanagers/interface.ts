export interface IFile {
    id       : number  
    filename  : string   
    path  : string  
    isDir  : boolean
   
}
export interface UploadFile extends File {
    uid: string;
  }