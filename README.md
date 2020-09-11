# JUG SummerCamp 2020 WebAssembly Codelab

We have built this [WebAssembly Codelab](https://github.com/LostInBrittany/wasm-codelab) as a quick entry point to [WebAssembly](https://webassembly.org/). 


## What are the objectives of this tutorial

Follow the tutorial to learn the concepts behind WebAssembly (WASM), write your first WASM libraries, compile existing libraries to WASM and generally understand how WASM open new possibilities in the web development ecosystem.


## What do I need to use this tutorial?

The tools strictly needed for this tutorial are a modern web browser (ideally [Chrome](https://www.google.com/chrome/) or [Chromium](https://www.chromium.org/)), a text editor (we suggest the excellent [Visual Studio Code](https://code.visualstudio.com/)), [Node JS](https://nodejs.org), and a web-server to test your code.

If you have Python in your system, the easiest way would be to run the embeded SimpleHTTPServer. Go to the project directory and run

```
# Python 2.x
python -m SimpleHTTPServer
```

or 

```
# Python 3.x
python -m http.server
```

to start the web server. Now, open a browser window for the app and navigate to http://localhost:8000/app/index.html to see the current state of the app.

If not, you can use [NodeJS](http://nodejs.org). We have put a minimalist JavaScript web-server on `./scripts/web-server.js`. To see the app running in a browser, open a separate terminal/command line tab or window, go to the project directory and then run `node ./scripts/web-server.js` to start the web server. 


## How is the tutorial organized 

We have structured the project to allow a *git-less* use. The `app` directory is the main directory of the project, the working folder where you will put your code.. The tutorial is divided in steps, each one in its own directory:

1. [Let's do some maths...](./step-01/)
1. [Types, more functions...](./step-02/)
1. [Hello WebAssembly](./step-03/)
1. [Using WebAssembly Studio](./step-04/)
1. [Using WebAssembly Studio - Conway's Game of Life](./step-05/)
1. [WebAssembly ❤️ Web Components - Part I](./step-06/)
1. [WebAssembly ❤️ Web Components - Part II](./step-07/)

In each step directory you have a README file that explain the objective of the step, that you will do in the working directory `app`. If you have problems or if you get lost, you also have the solution of each step in the step directories. So if you want to see the intended result of  the 2nd step, you can point your browser to http://localhost:8000/step-02/index.html


## What should I do now?  

OK, now you're ready to follow this tutorial. If you're familiar with git, begin by cloning this repository (`git clone https://github.com/LostInBrittany/wasm-codelab`), else you can simply download the zipped file from [GitHub](https://github.com/LostInBrittany/wasm-codelab/archive/master.zip).

Now can go to [step-01](./step-01) and begin to follow the README of that step. Let's begin!