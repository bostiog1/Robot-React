const cfg = () => {
  const boardWidth = 480;
  const boardHeight = 300;
  const robotWidth = 30;

  const distance = 30;
  let finish = false;

  let x =
    Math.trunc(Math.round(Math.random() * (boardHeight - 30)) / distance) * 30;
  let y =
    Math.trunc(Math.round(Math.random() * (boardWidth - 30)) / distance) * 30;

  let randomPosition = [x, y];

  return { randomPosition, boardHeight, boardWidth, robotWidth };
};

export { cfg };
