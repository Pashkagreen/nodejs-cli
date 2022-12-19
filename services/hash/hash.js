import { readFile } from "fs/promises";
import { createHash } from "crypto";

const handleHashFile = async (path) => {
  try {
    const data = readFile(path).toString();
    if (data) {
      console.log(
        "fileHash: ",
        createHash("sha256").update(data).digest("hex")
      );
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default handleHashFile;
