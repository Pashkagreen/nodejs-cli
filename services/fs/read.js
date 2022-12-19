import { pipeline } from "stream";
import { createReadStream } from "fs";
import process from "process";

const read = (filePath) => {
  const read = createReadStream(filePath);
  try {
    read
      .on("data", function (chunk) {
        console.log(chunk.toString());
        read.destroy();
      })
      .on("end", function () {
        // This may not been called since we are destroying the stream
        // the first time "data" event is received
        console.log("All the data in the file has been read");
      })
      .on("close", function (err) {
        console.log("Stream has been destroyed and file has been closed");
      });
  } catch (err) {
    throw new Error(err);
  }
};

export default read;
