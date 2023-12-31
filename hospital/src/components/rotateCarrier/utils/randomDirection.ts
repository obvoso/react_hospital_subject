export const getRandomRotateDirection = () => {
  const directions = ["left", "right"];
  const ret = directions[Math.floor(Math.random() * directions.length)];
  console.log(ret);
  return ret;
  //return directions[Math.floor(Math.random() * directions.length)];
};
