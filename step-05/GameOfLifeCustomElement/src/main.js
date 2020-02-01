// Set up the canvas with a 2D rendering context
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const boundingClientRect = canvas.getBoundingClientRect();
canvas.width = boundingClientRect.width | 0;
canvas.height = boundingClientRect.height | 0;

// Compute the size of the universe (here: 2px per cell)
const width = boundingClientRect.width >>> 1; // == boundingClientRect.width / 2
const height = boundingClientRect.height >>> 1; // == boundingClientRect.height /2
const size = width * height; // memory required to store either input or output
const totalMemoryRequired = size + size; // total memory required to store input and output

// Compute the size of and instantiate the module's memory
const numberPages = ((totalMemoryRequired + 0xffff) & ~0xffff) >>> 16; // aligned up in 64k units
const wasmMemory = new WebAssembly.Memory({ initial: numberPages });

// Fetch and instantiate the module
async function loadAndInstantiate() {
  let response = await fetch('../out/main.wasm');
  let arrayBuffer = await response.arrayBuffer();
  let wasmModule = await WebAssembly.instantiate(arrayBuffer, 
      { env: { memory: wasmMemory } });
  initGame(wasmModule);
}

loadAndInstantiate();

// Executed when the WASM module is instantiated
function initGame(module) {
  const exports = module.instance.exports;

  // Tell the module about the universe's width and height
  exports.init(width, height);

  // Fill input at [0, s-1] with random live cells
  const memory = new Uint8Array(wasmMemory.buffer);
  for (let y = 0; y < height; ++y)
    for (let x = 0; x < width; ++x)
      memory[y * width + x] = Math.random() > 0.1 ? 0 : 1;

  // Update about 30 times a second
  const desiredFps = 30;
  const frameDuration = 1000 / 30;
  function update() {
    setTimeout(update, frameDuration);
    exports.step();
    // copy output at [size, totalMemoryRequired] to input at [0, size]
    memory.copyWithin(0, size, totalMemoryRequired);
  }

  // Poorly optimised render function
  // Easily bigger bottleneck than the actual module
  function render() {
    requestAnimationFrame(render);

    context.fillStyle = 'rgba(238,238,238,0.67)';
    context.fillRect(0, 0, width << 1, height << 1);
    context.fillStyle = '#333';

    for (var y = 0; y < height; ++y)
      for (var x = 0; x < width; ++x)
        if (memory[size + y * width + x])
          context.fillRect(x << 1, y << 1, 2, 2);
  }

  update();
  render();
}