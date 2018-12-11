import React from "react";

import "../Styles/Card.scss";

const SUIT_UNICODE_MAP = {
  SPADES: "\u2660",
  CLUBS: "\u2663",
  DIAMONDS: "\u2666",
  HEARTS: "\u2665"
};

const CARD_STRING_MAP = {
  ACE: "ACE",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  JACK: "J",
  QUEEN: "Q",
  KING: "K"
};

export default class Card extends React.Component {
  constructor() {
    super();

    this._onCardFlip = this._onCardFlip.bind(this);
  }

  _onCardFlip() {
    this.props.cardFlipAction(this.props.player, this.props.card.code);
  }

  render() {
    const card = this.props.card;
    const suit = SUIT_UNICODE_MAP[card.suit];
    const left =
      this.props.numCards < 7 ? this.props.idx * 80 : this.props.idx * 100;
    const positionStyles = {
      left: `-${left}px`
    };

    if (card.faceUp) {
      return (
        <div
          className={`Card ${card.suit}`}
          onClick={this._onCardFlip}
          style={positionStyles}
        >
          <div className="overlay">
            <p className="value-large">{CARD_STRING_MAP[card.value]}</p>
          </div>
          <div className="suit">{suit}</div>
          <p className="value-inverted">{CARD_STRING_MAP[card.value]}</p>
        </div>
      );
    }
    return (
      <div className="Card" onClick={this._onCardFlip} style={positionStyles} />
    );
  }
}
