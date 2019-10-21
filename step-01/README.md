#  DevFest Nantes 2019 WebAssembly Codelab - Step 02 - Let's do some maths

This is the initial step of the tutorial.

Remember, to see the app running in a browser, open a separate terminal/command line tab or window, go to the project directory and then start the web server. Now, open a browser window for the app and navigate to http://localhost:8000/app/ to see the current state of the app.

For the moment you have an empty HTML page that will point to the different demos we are going to code in this lab:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>DevFest Nantes 2019 WebAssembly Codelab</title>
</head>
<body>
    <h1>DevFest Nantes 2019 WebAssembly Codelab</h1>
    
    <p>Here you have some WebAssembly demos:</p>

    <ul>        
    </ul>
</body>
</html>
```

## WebAssembly Explorer

[WebAssembly Explorer](https://mbebenita.github.io/WasmExplorer/) is an open source project and the associated website that allows you to compile your C/C++ code into WebAssembly, look at the generated WASM and WAT (Web Assembly Text format) and download it. 

![WebAssembly Explorer](./img/webassembly-explorer-01.png)

It's a quick and easy way to compile C/C++ code into WASM without installing anything in your computer.
