import React from "react";

import "./Card.scss";

const SUIT_UNICODEMAP = {
  SPADES: "\u2660",
  CLUBS: "\u2663",
  DIAMONDS: "\u2666",
  HEARTS: "\u2665"
};

const CARD_STRING_MAP = {
  ACE: "ACE",
  2: "TWO",
  3: "THREE",
  4: "FOUR",
  5: "FIVE",
  6: "SIX",
  7: "SEVEN",
  8: "EIGHT",
  9: "NINE",
  10: "TEN",
  JACK: "JACK",
  QUEEN: "QUEEN",
  KING: "KING"
};

export default class Card extends React.Component {
  render() {
    const card = this.props.card;
    const suit = SUIT_UNICODEMAP[card.suit];
    // const value = CARD_STRING_MAP[card.value];

    const midPoint = Math.floor(this.props.numCards / 2);
    const rotation = (this.props.idx - midPoint) * 5;
    const top = 0 + Math.abs((this.props.idx - midPoint) * 8);
    const left =
      this.props.numCards < 7 ? this.props.idx * 60 : this.props.idx * 80;

    const positionStyles = {
      left: `-${left}px`,
      top: `${top}px`,
      transform: `rotate(${rotation}deg)`
    };
    return (
      <div className={`Card ${card.suit}`} style={positionStyles}>
        <div className="overlay">
          <p className="value-large">{card.value}</p>
        </div>
        <div className="suit">{suit}</div>
        <p className="value-inverted">{CARD_STRING_MAP[card.value]}</p>
      </div>
    );
  }
}
