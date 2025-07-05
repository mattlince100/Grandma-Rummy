
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];
let playerHand = [];
let cpuHand = [];
let discardPile = [];

function shuffleDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  deck.sort(() => Math.random() - 0.5);
}

function drawCard() {
  return deck.pop();
}

function renderHand(hand, elementId) {
  const el = document.getElementById(elementId);
  el.innerHTML = '';
  hand.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerText = card.rank + card.suit;
    el.appendChild(cardEl);
  });
}

function setupGame() {
  shuffleDeck();
  playerHand = [];
  cpuHand = [];
  for (let i = 0; i < 7; i++) {
    playerHand.push(drawCard());
    cpuHand.push(drawCard());
  }
  discardPile = [drawCard()];
  renderHand(playerHand, 'player-hand');
  renderHand(cpuHand, 'cpu-hand');
  updatePiles();
}

function updatePiles() {
  const discardEl = document.getElementById('discard-pile');
  const topCard = discardPile[discardPile.length - 1];
  discardEl.innerText = topCard.rank + topCard.suit;
}

function nextTurn() {
  cpuTurn();
  renderHand(playerHand, 'player-hand');
  renderHand(cpuHand, 'cpu-hand');
  updatePiles();
}

function cpuTurn() {
  const drawFromDeck = Math.random() > 0.5;
  let card = drawFromDeck ? drawCard() : discardPile.pop();
  cpuHand.push(card);
  // Remove a random card
  const idx = Math.floor(Math.random() * cpuHand.length);
  const discarded = cpuHand.splice(idx, 1)[0];
  discardPile.push(discarded);
}

window.onload = setupGame;
