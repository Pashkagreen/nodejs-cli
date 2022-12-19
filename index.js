//Methods
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { homedir } from "os";
import path from "path";
import { readdir } from "fs/promises";
//Services
import handleOSCommands from "./services/os/os.js";
import handleHashFile from "./services/hash/hash.js";
import { compressFile, decompressFile } from "./services/gzip/index.js";
import {
  read,
  create,
  rename,
  remove,
  copy,
  move,
} from "./services/fs/index.js";
//Helpers
import { getArgs } from "./helpers/args.js";
import { tableRules } from "./helpers/constants.js";
import { errorHandler, invalidInput } from "./helpers/error.js";
import { isExists } from "./helpers/exist.js";

let currentFolder = "";

const initCli = async () => {
  const rl = createInterface({ input, output });
  const { username } = getArgs(process.argv);

  if (username) {
    console.log(`Welcome to File Manager, ${username || "Anonymous"}`);
  } else {
    console.log(`Welcome to File Manager, Anonymous`);
  }

  currentFolder = homedir();

  rl.on("line", async (input) => {
    //Navigation
    if (input === "up") {
      let oneStepBack = path.join(currentFolder, "../");
      currentFolder = oneStepBack;
    }

    if (input.split(" ")[0] === "cd") {
      let folderToMove = input.split(" ")[1];
      if (isExists(folderToMove)) {
        let newCurrentFolder = path.resolve(currentFolder, folderToMove);
        currentFolder = newCurrentFolder;
      } else {
        invalidInput();
      }
    }

    //Table
    if (input === "ls") {
      if (isExists(currentFolder)) {
        const folderContent = await readdir(currentFolder, {
          withFileTypes: true,
        });
        let tableContent = [];

        const files = folderContent
          .filter((item) => !item.isDirectory())
          .map((el) => ({
            Name: el.name,
            Type: "file",
          }));

        const folders = folderContent
          .filter((item) => item.isDirectory())
          .map((el) => ({
            Name: el.name,
            Type: "directory",
          }));

        tableContent = [...folders, ...files];
        console.table(tableContent, [tableRules.name, tableRules.type]);
      } else {
        errorHandler();
      }
    }

    //OS
    if (input.includes("os")) {
      try {
        handleOSCommands(input.split(" ")[1].slice(2));
      } catch (err) {
        errorHandler(err);
      }
    }

    //Hash
    if (input.includes("hash")) {
      if (isExists(input.split(" ")[1])) {
        try {
          handleHashFile(input.split(" ")[1]);
        } catch (err) {
          errorHandler(err);
        }
      } else {
        invalidInput();
      }
    }

    //Archiving
    if (input.split(" ")[0] === "compress") {
      const pathToFile = input.split(" ")[1];

      if (isExists(pathToFile)) {
        try {
          const pathToNewFile = input.split(" ")[2];
          compressFile(pathToFile, pathToNewFile);
        } catch (err) {
          errorHandler(err);
        }
      }
    }

    if (input.split(" ")[0] === "decompress") {
      const pathToFile = input.split(" ")[1];

      if (isExists(pathToFile)) {
        try {
          const pathToDecompressedFile = input.split(" ")[2];
          decompressFile(pathToFile, pathToDecompressedFile);
        } catch (err) {
          errorHandler(err);
        }
      }
    }

    //File system
    if (input.split(" ")[0] === "cat") {
      const pathToFile = input.split(" ")[1];

      if (isExists(pathToFile)) {
        try {
          read(pathToFile);
        } catch (err) {
          errorHandler(err);
        }
      } else {
        invalidInput();
      }
    }

    if (input.split(" ")[0] === "add") {
      const fileName = input.split(" ")[1];
      try {
        create(currentFolder, fileName);
      } catch (err) {
        errorHandler(err);
      }
    }

    if (input.split(" ")[0] === "rn") {
      const pathToFile = input.split(" ")[1];
      const newFileName = input.split(" ")[2];
      if (isExists(pathToFile)) {
        try {
          rename(pathToFile, newFileName);
        } catch (err) {
          errorHandler(err);
        }
      } else {
        invalidInput();
      }
    }

    if (input.split(" ")[0] === "cp") {
      const pathToFile = input.split(" ")[1];
      const pathToCopy = input.split(" ")[2];

      if (isExists(pathToFile) && isExists(pathToCopy)) {
        try {
          copy(pathToFile, pathToCopy);
        } catch (err) {
          errorHandler(err);
        }
      } else {
        invalidInput();
      }
    }

    if (input.split(" ")[0] === "mv") {
      const pathToFile = input.split(" ")[1];
      const pathToMove = input.split(" ")[2];

      if (isExists(pathToFile) && isExists(pathToMove)) {
        try {
          move(pathToFile, pathToMove);
        } catch (err) {
          errorHandler(err);
        }
      } else {
        invalidInput();
      }
    }

    if (input.split(" ")[0] === "rm") {
      const pathToFile = input.split(" ")[1];

      if (isExists(pathToFile)) {
        remove(pathToFile);
      } else {
        invalidInput();
      }
    }

    //Exit
    if (input.includes(".exit")) {
      console.log(
        `Thank you for using File Manager, ${username || "Anonymous"}, goodbye!`
      );
      rl.close();
    }

    console.log(`You are currently in: ${currentFolder}`);
  });

  //CTRL + C
  rl.on("SIGINT", () => {
    console.log(
      `Thank you for using File Manager, ${username || "Anonymous"}, goodbye!`
    );
    rl.close();
  });
};

await initCli();
