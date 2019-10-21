// The Game of Life, also known simply as Life, is a
// cellular automaton devised by the British
// mathematician John Horton Conway in 1970.
//
// https://en.wikipedia.org/wiki/Conway's_Game_of_Life

let width: i32;
let height: i32;
let size: i32;

/** Initializes width and height. Called once from JS. */
export function init(inputWidth: i32, inputHeight: i32): void {
  width = inputWidth;
  height = inputHeight;
  size = width * height;
}

/** Performs one step. Called about 30 times a second from JS. */
export function step(): void {
  // The universe of the Game of Life is an infinite two-dimensional
  // orthogonal grid of square "cells", each of which is in one
  // of two possible states, alive or dead.

  for (let row = 0; row < height; ++row) {
    // Create the torus ilusion. Top and bottom are connected.
    const rowMinus1 = row == 0 ? height - 1 : row - 1;
    const rowPlus1 = row == height - 1 ? 0 : row + 1;

    for (let column = 0; column < width; ++column) {
      // Create the torus ilusion. Left and right are connected.
      const columnMinus1 = column == 0 ? width - 1 : column - 1;
      const columnPlus1 = column == width - 1 ? 0 : column + 1;

      // Every cell interacts with its eight neighbours,
      // which are the cells that are horizontally,
      // vertically, or diagonally adjacent:
      const aliveNeighbors =
        load<u8>(rowMinus1 * width + columnMinus1) +
        load<u8>(rowMinus1 * width + column) +
        load<u8>(rowMinus1 * width + columnPlus1) +
        load<u8>(row * width + columnMinus1) +
        load<u8>(row * width + columnPlus1) +
        load<u8>(rowPlus1 * width + columnMinus1) +
        load<u8>(rowPlus1 * width + column) +
        load<u8>(rowPlus1 * width + columnPlus1);

      const alive = load<u8>(row * width + column);
      if (alive) {
        switch (aliveNeighbors) {
          // A live cell with fewer than 2 live neighbors dies, as if caused by underpopulation.
          // A live cell with more than 3 live neighbors dies, as if by overpopulation.
          default: {
            store<u8>(size + row * width + column, 0);
            break;
          }
          // A live cell with 2 or 3 live neighbors lives on to the next generation.
          case 2:
          case 3:
        }
      } else {
        switch (aliveNeighbors) {
          // A dead cell with exactly 3 live neighbors becomes a live cell, as if by reproduction.
          case 3: {
            store<u8>(size + row * width + column, 1);
            break;
          }
          default:
        }
      }
    }
  }
}

// Performing a step uses bytes [0, size - 1] as the input
// and writes the output to [size, 2 * size - 1].

// Note that the code above wastes a lot of space by using one byte per cell.