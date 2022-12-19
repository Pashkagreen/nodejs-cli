import { createReadStream, createWriteStream, statSync } from "fs";
import { createBrotliCompress, constants } from "zlib";

// const READ_FILE_NAME = "data.txt";
// const WRITE_FILE_NAME = "compressedData.txt.br";

const compressFile = (READ_FILE_NAME, WRITE_FILE_NAME) => {
  try {
    // Create read and write streams
    const readStream = createReadStream(READ_FILE_NAME);
    const writeStream = createWriteStream(WRITE_FILE_NAME);

    // Create brotli compress object
    const brotli = createBrotliCompress({
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 4,
        [constants.BROTLI_PARAM_SIZE_HINT]: statSync(READ_FILE_NAME).size,
      },
    });

    // Pipe the read and write operations with brotli compression
    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on("finish", () => {
      console.log("Done compressing 😎");
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default compressFile;
