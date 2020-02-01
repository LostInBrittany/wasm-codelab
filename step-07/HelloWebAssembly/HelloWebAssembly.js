let configurationObject = {
}

function readWASMbuffer(wasmInstance, pointer) {
    let buffer = new Int8Array(wasmInstance.exports.memory.buffer);
    let str = "";
    for (i = pointer; buffer[i]; i++) {
      str += String.fromCharCode(buffer[i]);
    }
    return str;
}

  
async function loadWASM() {
    let response = await fetch('./HelloWebAssembly.wasm');
    let arrayBuffer = await response.arrayBuffer();
    let wasmModule = await WebAssembly.instantiate(arrayBuffer, configurationObject);
    let helloWebAssembly = await  wasmModule.instance.exports.helloWebAssembly;    
    
    let str = readWASMbuffer(wasmModule.instance, helloWebAssembly());
    console.log(str);
}

loadWASM();