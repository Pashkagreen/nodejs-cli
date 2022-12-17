import { getArgs } from "./helpers/args.js";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { homedir } from "os";
import path from "path";
import { readdir } from "fs/promises";
import handleOSCommands from "./services/os/os.js";

const tableRules = {
  name: "Name",
  type: "Type",
};

let currentFolder = "";

const initCli = async () => {
  const rl = readline.createInterface({ input, output });
  const { username } = getArgs(process.argv);

  if (username) {
    console.log(`Welcome to File Manager, ${username}`);
  }

  currentFolder = homedir();

  rl.on("line", async (input) => {
    if (input === "up") {
      let oneStepBack = path.join(currentFolder, "../");
      currentFolder = oneStepBack;
    }

    if (input.split(" ")[0] === "cd") {
      // checkExist() - to do

      let folderToMove = input.split(" ")[1];
      let newCurrentFolder = path.resolve(currentFolder, folderToMove);
      currentFolder = newCurrentFolder;
    }

    if (input === "ls") {
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
    }

    if (input.includes("os")) {
      handleOSCommands(input.split(" ")[1].slice(2));
    }

    if (input.includes(".exit")) {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      rl.close();
    }

    console.log(`You are currently in: ${currentFolder}`);
  });

  rl.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  });
};

await initCli();
