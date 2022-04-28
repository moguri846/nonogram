import React, { useState } from "react";
import Board from "../Board/Board";

const randomBoard = [...Array(10)].map(() =>
  [...Array(10)].map(() => Math.round(Math.random() * 1))
);
const initialBoardState = [...Array(10)].map(() => [...Array(10)].map(() => 0));

const Nonogram = () => {
  const [board, setBoard] = useState<number[][]>(initialBoardState);
  const [vaild, setVaild] = useState(false);

  const handleBoardMatch = (arr1: number[][], arr2: number[][]) => {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1.length; j++) {
        if (arr1[i][j] !== arr2[i][j]) {
          return false;
        }
      }
    }

    return true;
  };

  const onSetBoard = ({
    row,
    col,
    n,
  }: {
    row: number;
    col: number;
    n: number;
  }) => {
    setBoard((board) => {
      board[row][col] = n;
      let newBoard = board.slice().map((row) => row.slice());

      setVaild(handleBoardMatch(randomBoard, newBoard));
      return newBoard;
    });
  };

  return (
    <>
      <Board randomBoard={randomBoard} board={board} onSetBoard={onSetBoard} />
      {vaild && <h1>정답!</h1>}
    </>
  );
};

export default Nonogram;
