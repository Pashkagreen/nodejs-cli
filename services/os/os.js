import { cpus, userInfo, homedir, EOL, arch } from "os";

const OS = {
  EOL: "EOL",
  cpus: "cpus",
  homedir: "homedir",
  username: "username",
  architecture: "architecture",
};

const handleOSCommands = (command) => {
  switch (command) {
    case OS.EOL:
      console.log(JSON.stringify(EOL));
      break;
    case OS.cpus:
      console.log(cpus());
      break;
    case OS.homedir:
      console.log(homedir());
      break;
    case OS.username:
      console.log(userInfo().username);
      break;
    case OS.architecture:
      console.log(arch());
      break;
    default:
      return;
  }
};

export default handleOSCommands;
