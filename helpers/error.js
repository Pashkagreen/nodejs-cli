const errorHandler = (err) => {
  console.log("Operation failed!", err);
};

const invalidInput = () => {
  console.log("Invalid input");
};

export { errorHandler, invalidInput };
