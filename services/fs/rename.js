import { rename as renameFs } from "node:fs/promises";

const rename = (filePath, newFileName) => {
  try {
    let newArr = filePath.split("/").slice(0, -1);
    newArr.push(newFileName);
    const newFilePath = newArr.join("/");
    renameFs(filePath, newFilePath);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

export default rename;
