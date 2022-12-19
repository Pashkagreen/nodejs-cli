import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";

const move = async (source, target) => {
  try {
    const read = createReadStream(source);
    const write = createWriteStream(target);
    await new Promise(function (resolve, reject) {
      read.on("error", reject);
      write.on("error", reject);
      write.on("finish", resolve);
      read.pipe(write);
      console.log("File successfully moved!");
    })
      .then(async () => {
        await rm(source);
      })
      .catch((err) => {
        read.destroy();
        write.end();
        throw new Error(err);
      });
  } catch (err) {
    throw new Error(err);
  }
};

export default move;
