import { createReadStream, createWriteStream, statSync } from "fs";
import { createBrotliDecompress, constants } from "zlib";

// const READ_FILE_NAME = "compressedData.txt.br";
// const WRITE_FILE_NAME = "data.txt";

const decompressFile = (READ_FILE_NAME, WRITE_FILE_NAME) => {
  try {
    // Create read and write streams
    const readStream = createReadStream(READ_FILE_NAME);
    const writeStream = createWriteStream(WRITE_FILE_NAME);

    // Create brotli decompress object
    const brotli = createBrotliDecompress({
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 4,
      },
    });

    // Pipe the read and write operations with brotli decompression
    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on("finish", () => {
      console.log("Done decompressing 😎");
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default decompressFile;
