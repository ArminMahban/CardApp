import Reflux from "reflux";

const BASE_URL = "https://deckofcardsapi.com/api/";
const INITIAL_HAND_SIZE = 1;
const PLAYERS = ["Dealer", "P"];

export default class CardGameStore extends Reflux.Store {
  constructor() {
    super();
    const Actions = Reflux.createActions(["startGame", "resetGame", "draw"]);

    this.defaultState = {
      actions: Actions,
      isGameOver: true,
      players: PLAYERS,
      currentPlayerIndex: 0,
      turn: 0,
      dealtCards: null,
      cardsRemaining: null
    };

    this.state = { ...this.defaultState };

    this.listenTo(Actions.startGame, this._onStartGame);
    this.listenTo(Actions.resetGame, this._onResetGame);
    this.listenTo(Actions.draw, this._onDraw);
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

  _onDraw(numCards = PLAYERS.length) {
    if (this.state.turn === 0) {
      numCards = PLAYERS.length * INITIAL_HAND_SIZE;
    }
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
