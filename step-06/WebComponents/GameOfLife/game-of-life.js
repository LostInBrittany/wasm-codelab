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

  render() {
    return html`
      <h3>Is life a game?</h3>
      <div class="board">
        <p>
          Here we will have a board of 
          ${this.boardWidth}x${this.boardHeight} 
          cases.
        </p>
      </div>
    `;
  }
  
}

/**
 * Register the new element with the browser.
 */
customElements.define('game-of-life', GameOfLife);