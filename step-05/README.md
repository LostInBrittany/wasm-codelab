#  DevFest Nantes 2019 WebAssembly Codelab - Step 04 - Using WebAssembly Studio - Conway's Game of Life

In this step we are building a [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) demo, using an [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) library.

## Everything begins with a project

Let's begin by creating a new empty AssemblyScript project on WebAssembly Studio.

![WebAssembly Studio](./img/webassembly-studio-01.png)

In the `main.html`, add a `canvas` element, that will be the *board* for the Game of Life.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"> 
    <title>DevFest Nantes 2019 WebAssembly Codelab - Game of Life</title>
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
        overflow: hidden;
      }
      canvas {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body style="background: #fff">
    <canvas id="canvas"></canvas>
    <script src="./main.js"></script>
  </body>
</html>
```

## Game of Life, AssemblyScript style

The Game of Life is one of the most implemented algorithms, you can find implementation in most languages. In the AssemblyScript repository, we can find a [clean and simple implementation](https://github.com/carlosbaraza/wasm-game-of-life/blob/master/assembly/main.ts).


> ### The Gsame of Life
> 
> The universe of the Game of Life is an infinite two-dimensional
orthogonal *board* composed of square *cells*, each of which is in one
of two possible states, alive or dead.
>
> Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent.
>
> At every step of the algorithm, all the *cells* are scanned. 
> - A live *cell* with fewer than 2 live neighbors dies, as if caused by underpopulation. 
> - A live *cell* with more than 3 live neighbors dies, as if by overpopulation.
> - A live *cell* with 2 or 3 live neighbors lives on to the next generation.
> - A dead *cell* with exactly 3 live neighbors becomes a live cell, as if by reproduction.

There is no need to understand the library to do the codelab, but it always help. Let's look at it...


[AssemblyScript types](https://docs.assemblyscript.org/basics/types) can be surprising at the first gaze, as they are rather low level:
`bool`, `i8`, `i16`, `i32`, `i64`, `i8`, `i16`, `i32`, `i64`, `f32`, `f64`...

In the library, only two types are used: 

- `i32`: a 32-bit unsigned integer
- `u8`: an 8-bit unsigned integer

They are two functions exported in the code:

1. The `init` function builds a *game board* according to the dimensions given as parameters

    ```ts
    export function init(inputWidth: i32, inputHeight: i32): void 
    ```

1. The `step` function executes a step of the Game of Life algorythm

    ```ts
    export function step(): void
    ```

As you can see, the AssemblyScript library only does the *backend* tasks, the processing. It's the ideal use case for WebAssembly. But how can we pass from this implementation to something drawn in the `canvas`? That's the role of the JavaScript glue code that we are going to build now.

