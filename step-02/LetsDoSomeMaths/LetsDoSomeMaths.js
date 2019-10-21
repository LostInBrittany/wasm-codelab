let configurationObject = {
}

let doubler;

async function loadWASM() {
    let response = await fetch('./LetsDoSomeMaths.wasm');
    let arrayBuffer = await response.arrayBuffer();
    let wasmModule = await WebAssembly.instantiate(arrayBuffer, configurationObject);
    doubler = await  wasmModule.instance.exports.doubler;
}

loadWASM();
