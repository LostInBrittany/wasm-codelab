/**
 * Import the `LitElement` base class and `html` and `css` helper functions.
 */
import { LitElement, html, css } from '../web_modules/lit-element.js';

/**
 * Create a class for your element that extends the LitElement
 * base class.
 */
class GameOfLife extends LitElement {

  static get styles() { 
    return css`
      .board {
        width: 300px;
        height: 300px;
        margin: 10px;
        padding: 10px;
        border: solid 1px black;
        border-radius: 10px;
      }
    `;
  }
  
  static get properties() {
    return {     
      boardWidth: {
        type: Number,
      },
      boardHeight: {
        type: Number,
      }
    };
  }

  constructor() {
    super();
    this.boardWidth = 100;  
    this.boardHeight = 100;
  }

  firstUpdated() {
    // Set up the canvas with a 2D rendering context
    const canvas = this.shadowRoot.getElementById('game');
    this.context = canvas.getContext('2d');

    /*
     * We base the canvas dimensions on the board dimensions
     * and we define a cellule size of 2px
     */ 
    canvas.width = ( this.boardWidth * 2 );
    canvas.height = ( this.boardWidth * 2 );

    // memory required to store either input or output
    this.size = this.boardWidth * this.boardWidth;
    
    // total memory required to store input and output
    this.totalMemoryRequired = this.size + this.size; 
    
    // Compute the size of and instantiate the module's memory
    const numberPages = ((this.totalMemoryRequired + 0xffff) & ~0xffff) >>> 16; // aligned up in 64k units  
    this.wasmMemory = new WebAssembly.Memory({ initial: numberPages });

    this.loadAndInstantiate();
  }

  async loadAndInstantiate() {
    let response = await fetch(`${import.meta.url.replace('game-of-life.js','')}/main.wasm`);
    let arrayBuffer = await response.arrayBuffer();
    this.wasmModule = await WebAssembly.instantiate(arrayBuffer, 
        { env: { memory: this.wasmMemory } });
    this.initGame();
  }

  initGame(module) {
    this.wasmExports = this.wasmModule.instance.exports;
  
    // Tell the module about the universe's width and height
    this.wasmExports.init(this.boardWidth, this.boardHeight);
  
    // Fill input at [0, s-1] with random live cells
    this.linearMemory = new Uint8Array(this.wasmMemory.buffer);
    for (let y = 0; y < this.boardHeight; ++y)
      for (let x = 0; x < this.boardWidth; ++x)
      this.linearMemory[y * this.boardWidth + x] = Math.random() > 0.1 ? 0 : 1;
  
    // Update about 30 times a second
    const desiredFps = 30;
    this.frameDuration = 1000 / desiredFps;  
    this.updateCanvas();
    this.renderCanvas();
  }

  updateCanvas() {
    setTimeout(this.updateCanvas.bind(this),this.frameDuration);
    this.wasmExports.step();
    // copy output at [size, totalMemoryRequired] to input at [0, size]
    this.linearMemory.copyWithin(0, this.size, this.totalMemoryRequired);
  }

  /*
   * Poorly optimised render function
   * Easily bigger bottleneck than the actual module
   */ 
  renderCanvas() {
    this.context.fillStyle = 'rgba(238,238,238,0.67)';
    this.context.fillRect(0, 0, this.boardWidth << 1, this.boardHeight << 1);
    this.context.fillStyle = '#333';

    for (var y = 0; y < this.boardHeight; ++y)
      for (var x = 0; x < this.boardWidth; ++x)
        if (this.linearMemory[this.size + y * this.boardWidth + x])
          this.context.fillRect(x << 1, y << 1, 2, 2);      
    requestAnimationFrame(this.renderCanvas.bind(this));
  }

  render() {
    return html`
      <h3>Is life a game?</h3>
      <div class="board">
        <canvas id="game"></canvas>
      </div>
    `;
  }
  
}

/**
 * Register the new element with the browser.
 */
customElements.define('game-of-life', GameOfLife);