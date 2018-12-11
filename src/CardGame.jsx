import Reflux from "reflux";
import React from "react";
import CardGameStore from "./CardGameStore";
import Hand from "./Hand";

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
    let gameBtn;
    if (this.state.isGameOver) {
      gameBtn = <button onClick={this._onStartGame}>Play</button>;
    } else {
      gameBtn = <button onClick={this._onGameReset}>Reset Game</button>;
    }

    let cardsRemaining;
    if (this.state.cardsRemaining) {
      cardsRemaining = `Remaining Cards: ${this.state.cardsRemaining}`;
    }

    let drawBtn;
    if (!this.state.isGameOver) {
      drawBtn =
        this.state.turn === 0 ? (
          <button onClick={this._onDraw}>Deal Opening Hands</button>
        ) : (
          <button onClick={this._onDraw}>Deal</button>
        );
    }

    let hands;
    if (this.state.dealtCards && Object.keys(this.state.dealtCards).length) {
      hands = Object.keys(this.state.dealtCards).map(player => {
        return (
          <Hand
            key={player}
            player={player}
            cards={this.state.dealtCards[player]}
          />
        );
      });
    }

    return (
      <div>
        {gameBtn}
        {drawBtn}
        {cardsRemaining}
        {hands}
      </div>
    );
  }
}
