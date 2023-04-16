const either = (condition: boolean, componentOne: JSX.Element, componentTwo: JSX.Element) => {
  if (condition) {
    return componentOne;
  }
  return componentTwo;
};

export default either;
