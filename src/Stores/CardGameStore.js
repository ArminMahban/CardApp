import Reflux from "reflux";
import { cloneDeep } from "lodash";

const BASE_URL = "https://deckofcardsapi.com/api/";
const PLAYERS = ["Dealer", "Player1", "Player2"];

export default class CardGameStore extends Reflux.Store {
  constructor() {
    super();
    const Actions = Reflux.createActions([
      "startGame",
      "resetGame",
      "draw",
      "flipCard"
    ]);

    this.defaultState = {
      actions: Actions,
      isGameOver: true,
      currentPlayerIndex: 0,
      turn: 0,
      dealtCards: null,
      cardsRemaining: null
    };

    this.state = { ...this.defaultState };

    this.listenTo(Actions.startGame, this._onStartGame);
    this.listenTo(Actions.resetGame, this._onResetGame);
    this.listenTo(Actions.draw, this._onDraw);
    this.listenTo(Actions.flipCard, this._onFlipCard);
  }

  _assignCards(cards) {
    let tempCurrentPlayerIndex = this.state.currentPlayerIndex;
    let tempCurrentPlayer = PLAYERS[tempCurrentPlayerIndex];
    const newDealtCards = { ...this.state.dealtCards };

    cards.forEach(card => {
      newDealtCards[tempCurrentPlayer]
        ? newDealtCards[tempCurrentPlayer].push(card)
        : (newDealtCards[tempCurrentPlayer] = [card]);

      tempCurrentPlayerIndex = (tempCurrentPlayerIndex + 1) % PLAYERS.length;
      tempCurrentPlayer = PLAYERS[tempCurrentPlayerIndex];
    });

    return {
      dealtCards: newDealtCards,
      currentPlayer: tempCurrentPlayer,
      currentPlayerIndex: tempCurrentPlayerIndex
    };
  }

  _onFlipCard(player, cardCode) {
    const dealtCards = cloneDeep(this.state.dealtCards);
    const cardToFlipIndex = dealtCards[player].findIndex(
      card => card.code === cardCode
    );
    dealtCards[player][cardToFlipIndex].faceUp = !dealtCards[player][
      cardToFlipIndex
    ].faceUp;
    this.setState({ dealtCards: dealtCards });
  }

  _onDraw(numCards = PLAYERS.length) {
    fetch(BASE_URL + `deck/${this.deckId}/draw/?count=${numCards}`)
      .then(response => response.json())
      .then(data => {
        const newState = this._assignCards(data.cards);
        newState.cardsRemaining = data.remaining;
        newState.turn = this.state.turn + 1;
        this.setState(newState);
      });
  }

  _onStartGame() {
    fetch(BASE_URL + "deck/new/shuffle/")
      .then(response => response.json())
      .then(data => {
        this.setState({
          cardsRemaining: data.remaining,
          isGameOver: false
        });
        this.deckId = data.deck_id;
      })
      .catch(response => {
        console.log(response);
      });
  }

  _onResetGame() {
    this.setState({ ...this.defaultState });
  }
}
