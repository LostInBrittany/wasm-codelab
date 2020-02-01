/**
 * Import the `LitElement` base class and `html` and `css` helper functions.
 */
import { LitElement, html, css } from '../web_modules/lit-element.js';

/**
 * Create a class for your element that extends the LitElement
 * base class.
 */
class GameOfLife extends LitElement {

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
        this.boardWidth = 0;  
        this.boardHeight = 0;
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