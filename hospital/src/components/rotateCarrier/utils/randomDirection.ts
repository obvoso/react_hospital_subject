export const getRandomRotateDirection = () => {
  const directions = ["left", "right"];
  const ret = directions[Math.floor(Math.random() * directions.length)];
  return ret;
};

export default getRandomRotateDirection;
