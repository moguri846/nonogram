import React from "react";

interface IProps {
  randomBoard: number[][];
  board: number[][];
  onSetBoard: ({
    row,
    col,
    n,
  }: {
    row: number;
    col: number;
    n: number;
  }) => void;
}

const Board = ({ randomBoard, board, onSetBoard }: IProps) => {
  const printHintCols = () => {
    const accArrs: number[][] = [];

    randomBoard.forEach((row, rIdx) => {
      const accArr: number[] = [];
      let acc = 0;

      row.forEach((col, cIdx) => {
        if (randomBoard[cIdx][rIdx] !== 0) {
          acc++;
        }
        if (randomBoard[cIdx][rIdx] === 0 || cIdx === row.length - 1) {
          if (acc > 0) {
            accArr.push(acc);
            acc = 0;
          }
        }
      });
      accArrs.push(accArr);
    });
    return accArrs;
  };

  const printHintRows = (row: number[]) => {
    const accArr: number[] = [];
    let acc = 0;

    row.forEach((tile, idx) => {
      if (tile !== 0) {
        acc++;
      }
      if (tile === 0 || idx === row.length - 1) {
        if (acc > 0) {
          accArr.push(acc);
          acc = 0;
        }
      }
    });

    return accArr;
  };

  const handleTileSelector = (
    e: React.MouseEvent<HTMLTableDataCellElement>
  ) => {
    e.preventDefault();
    if (e.buttons === 1 || e.buttons === 2) {
      const { row, col } = e.currentTarget.dataset as {
        row: string;
        col: string;
      };

      const r = parseInt(row);
      const c = parseInt(col);

      let n = 0;

      if (e.buttons === 1) {
        n = board[r][c] === 1 ? 0 : 1;
        e.currentTarget.classList.toggle("checked");
        e.currentTarget.classList.remove("marked");
      } else {
        n = 0;
        e.currentTarget.classList.toggle("marked");
        e.currentTarget.classList.remove("checked");
      }

      onSetBoard({ row: r, col: c, n });
    }
  };

  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          {printHintCols().map((col, colIdx) => (
            <td key={colIdx} className="hint-col">
              {col.map((c, cci) => (
                <p key={cci}>{c}</p>
              ))}
            </td>
          ))}
        </tr>
        {randomBoard.map((row, rowIdx) => (
          <tr key={rowIdx}>
            <td className="hint-row">
              {printHintRows(row).map((row, rIdx) => (
                <span key={rIdx}>{row}</span>
              ))}
            </td>
            {row.map((b, colIdx) => (
              <td
                className={` ${
                  (rowIdx + 1) % 5 === 0
                    ? rowIdx + 1 === randomBoard.length
                      ? ""
                      : "row-border"
                    : ""
                } ${
                  (colIdx + 1) % 5 === 0
                    ? colIdx + 1 === randomBoard.length
                      ? ""
                      : "col-border"
                    : ""
                }`}
                key={colIdx}
                data-row={rowIdx}
                data-col={colIdx}
                onMouseDown={handleTileSelector}
                onContextMenu={handleTileSelector}
                onMouseEnter={handleTileSelector}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(Board);
