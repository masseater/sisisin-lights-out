let gridStatus: boolean[][] = [];

window.onload = () => {
  document.getElementById("submit").addEventListener("click", initGrid);
  initGrid();
};

const initStatus = () => {
  gridStatus = createRandomStatus();
};

const createRandomStatus = () => {
  const length = getLength();
  let status = [];
  for (let i = 0; i < length; i++) {
    status[i] = [];
    for (let j = 0; j < length; j++) {
      status[i][j] = Math.random() <= 0.5 ? false : true;
    }
  }

  return status;
};

const initGrid = () => {
  document.getElementById("grid").innerHTML = "";
  initStatus();
  const length = getLength();
  const grid = document.getElementById("grid");
  for (let row = 0; row < length; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.setAttribute("data-row", row.toString());
    for (let col = 0; col < length; col++) {
      const square = createSquareDiv();
      square.setAttribute("data-col", col.toString());
      if (gridStatus[row][col]) {
        square.classList.add("active");
      }

      rowDiv.append(square);
    }
    grid.append(rowDiv);
  }
};

const createSquareDiv = () => {
  const div = document.createElement("div");
  div.classList.add("square");
  div.addEventListener("click", function (this) {
    updateGrid(this);
  });
  return div;
};

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];
const updateGrid = (square: HTMLDivElement) => {
  const col = Number.parseInt(square.dataset["col"]);
  const row = Number.parseInt(square.parentElement.dataset["row"]);

  const update = (r, c, s) => {
    gridStatus[r][c] = !gridStatus[r][c]; // 状態反転
    if (gridStatus[r][c]) {
      s.classList.add("active");
    } else {
      s.classList.remove("active");
    }
  };

  const length = getLength();
  update(row, col, square);
  for (let i = 0; i < 4; i++) {
    const r = row + dy[i];
    const c = col + dx[i];

    if (r < 0 || c < 0 || r >= length || c >= length) {
      continue;
    }

    const s = getSquare(r, c);
    update(r, c, s);
  }

  isClear();
};

const isClear = () => {
  gridStatus.forEach((row) => {
    row.forEach((square) => {
      if (square == false) {
        return;
      }
    });
  });

  document.getElementById("grid").classList.add("cleared");
};

const getLength = () =>
  Number.parseInt(
    (document.getElementById("length") as HTMLInputElement).value
  );

const getSquare = (row: number, column: number) =>
  document.getElementById("grid").childNodes[row].childNodes[column];
