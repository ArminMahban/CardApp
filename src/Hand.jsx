import React from "react";
import Card from "./Card";
import "./Hand.scss";

const SPECIAL_VALUES = {
  ACE: 1,
  JACK: 10,
  QUEEN: 10,
  KING: 10
};

export default class Hand extends React.Component {
  _getCardValue(value) {
    return SPECIAL_VALUES[value]
      ? SPECIAL_VALUES[value]
      : Number.parseInt(value);
  }

  render() {
    const cards = this.props.cards.map((card, idx) => {
      const leftShift = idx * 70 + "px";
      return (
        <Card
          key={card.value + card.suit}
          idx={idx}
          numCards={this.props.cards.length}
          card={card}
        />
      );
    });

    let score = 0;
    const values = this.props.cards.map(card => card.value);
    if (values.length === 1) {
      score = this._getCardValue(values[0]);
    } else if (values.length > 1) {
      values.forEach(value => (score += this._getCardValue(value)));
    }

    return (
      <div className="Hand">
        <h2>
          {this.props.player} - {score}
        </h2>
        <div className="card-container">{cards}</div>
      </div>
    );
  }
}
