import { createReadStream, createWriteStream } from "fs";

const copy = async (source, target) => {
  try {
    const read = createReadStream(source);
    const write = createWriteStream(target);
    return await new Promise(function (resolve, reject) {
      read.on("error", reject);
      write.on("error", reject);
      write.on("finish", resolve);
      read.pipe(write);
      console.log("File successfully copied!");
    });
  } catch (err) {
    read.destroy();
    write.end();
    throw new Error(err);
  }
};
export default copy;
