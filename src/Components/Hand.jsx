import React from "react";
import Card from "../Components/Card.jsx";

import "../Styles/Hand.scss";

const SPECIAL_VALUES = {
  ACE: 1,
  JACK: 10,
  QUEEN: 10,
  KING: 10
};

export default class Hand extends React.Component {
  _getCardNumericalValue(value) {
    return SPECIAL_VALUES[value]
      ? SPECIAL_VALUES[value]
      : Number.parseInt(value);
  }

  render() {
    const cards = this.props.cards.map((card, idx) => {
      return (
        <Card
          key={card.value + card.suit}
          idx={idx}
          player={this.props.player}
          cardFlipAction={this.props.cardFlipAction}
          numCards={this.props.cards.length}
          card={card}
        />
      );
    });

    let score = 0;
    this.props.cards
      .filter(card => card.faceUp)
      .map(card => card.value)
      .forEach(value => (score += this._getCardNumericalValue(value)));

    return (
      <div className="Hand">
        <h2>
          {this.props.player} {score ? `: ${score}` : ""}
        </h2>
        <div className="card-container">{cards}</div>
      </div>
    );
  }
}
