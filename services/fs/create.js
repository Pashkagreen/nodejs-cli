import { open } from "fs";
import path from "path";

// create an empty file
const create = (currentFolder, fileName) => {
  try {
    const filePath = path.resolve(currentFolder, fileName);

    open(filePath, "w", (err, file) => {
      if (err) {
        throw err;
      }
      console.log("File is created");
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default create;
