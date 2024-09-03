function generateRandomNumber(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  // 电脑自动猜数的初始值不能是用户输入的数字
  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  }

  return rndNum;
}

export default generateRandomNumber;

