import { rm } from "fs/promises";

const remove = async (filePath) => {
  try {
    await rm(filePath);
    console.log("File successfully deleted");
  } catch (error) {
    console.log(error);
    throw new Error("FS operation failed");
  }
};

export default remove;
