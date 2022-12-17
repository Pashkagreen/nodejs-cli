const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;

  rest.forEach((value, index, array) => {
    if (value.startsWith("--username")) {
      res.username = value.split("=")[1];
    }
  });
  return res;
};

export { getArgs };
