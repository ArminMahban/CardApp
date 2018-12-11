import Reflux from "reflux";
import React, { Fragment } from "react";
import CardGameStore from "../Stores/CardGameStore";
import Hand from "../Components/Hand";

import "../Styles/CardGame.scss";

export default class CardGame extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.store = CardGameStore;

    this._onStartGame = this._onStartGame.bind(this);
    this._onDraw = this._onDraw.bind(this);
    this._onGameReset = this._onGameReset.bind(this);
  }

  _onStartGame() {
    this.state.actions.startGame();
  }

  _onGameReset() {
    this.state.actions.resetGame();
  }

  _onDraw() {
    this.state.actions.draw();
  }

  render() {
    const gameBtn = this.state.isGameOver && (
      <button onClick={this._onStartGame}>Play</button>
    );
    const resetGameBtn = !this.state.isGameOver && (
      <button className="secondary" onClick={this._onGameReset}>
        Reset Game
      </button>
    );

    const cardsRemaining =
      this.state.cardsRemaining &&
      `Remaining Cards: ${this.state.cardsRemaining}`;
    const dealButton = !this.state.isGameOver && (
      <button onClick={this._onDraw}>Deal</button>
    );

    let hands =
      this.state.dealtCards &&
      Object.keys(this.state.dealtCards).map(player => {
        return (
          <Hand
            key={player}
            player={player}
            cardFlipAction={this.state.actions.flipCard}
            cards={this.state.dealtCards[player]}
          />
        );
      });

    return (
      <Fragment>
        {dealButton}
        {gameBtn}
        {resetGameBtn}
        {cardsRemaining}
        {hands}
      </Fragment>
    );
  }
}
