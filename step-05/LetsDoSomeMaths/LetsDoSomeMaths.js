let configurationObject = {
}

let doubler;

async function loadWASM() {
    let response = await fetch('./LetsDoSomeMaths.wasm');
    let arrayBuffer = await response.arrayBuffer();
    let wasmModule = await WebAssembly.instantiate(arrayBuffer, configurationObject);
    ({doubler, half, squarer, addition, substraction, product, division} = await  wasmModule.instance.exports);
}

loadWASM();
