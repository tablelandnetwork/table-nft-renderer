const colors = [
  "#452858",
  "#5A2F5A",
  "#6E365B",
  "#833D5D",
  "#98445E",
  "#AC4B60",
  "#C15261",
  "#D65963",
  "#EA6064",
  "#FF6766",
];

export default function findColor(rows) {
  let i;
  switch (true) {
    case rows < 9 * 3:
      i = 0;
      break;
    case rows < 20 * 3:
      i = 1;
      break;
    case rows < 50 * 3:
      i = 2;
      break;
    case rows < 100 * 3:
      i = 3;
      break;
    case rows < 200 * 3:
      i = 4;
      break;
    case rows < 500 * 3:
      i = 5;
      break;
    case rows < 1000 * 3:
      i = 6;
      break;
    case rows < 5000 * 3:
      i = 7;
      break;
    case rows < 20000 * 3:
      i = 8;
      break;
    case rows >= 20000 * 3:
      i = 9;
      break;
  }
  return colors[i];
}
