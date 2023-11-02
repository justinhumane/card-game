let cards = {
  "hearts-2": { color: "hearts", number: "2", value: 1 },
  "hearts-3": { color: "hearts", number: "3", value: 2 },
  "hearts-4": { color: "hearts", number: "4", value: 3 },
  "hearts-5": { color: "hearts", number: "5", value: 4 },
  "hearts-6": { color: "hearts", number: "6", value: 5 },
  "hearts-7": { color: "hearts", number: "7", value: 6 },
  "hearts-8": { color: "hearts", number: "8", value: 7 },
  "hearts-9": { color: "hearts", number: "9", value: 8 },
  "hearts-10": { color: "hearts", number: "10", value: 9 },
  "hearts-J": { color: "hearts", number: "J", value: 10 },
  "hearts-Q": { color: "hearts", number: "Q", value: 11 },
  "hearts-K": { color: "hearts", number: "K", value: 12 },
  "hearts-A": { color: "hearts", number: "A", value: 13 },
  "diamonds-2": { color: "diamonds", number: "2", value: 1 },
  "diamonds-3": { color: "diamonds", number: "3", value: 2 },
  "diamonds-4": { color: "diamonds", number: "4", value: 3 },
  "diamonds-5": { color: "diamonds", number: "5", value: 4 },
  "diamonds-6": { color: "diamonds", number: "6", value: 5 },
  "diamonds-7": { color: "diamonds", number: "7", value: 6 },
  "diamonds-8": { color: "diamonds", number: "8", value: 7 },
  "diamonds-9": { color: "diamonds", number: "9", value: 8 },
  "diamonds-10": { color: "diamonds", number: "10", value: 9 },
  "diamonds-J": { color: "diamonds", number: "J", value: 10 },
  "diamonds-Q": { color: "diamonds", number: "Q", value: 11 },
  "diamonds-K": { color: "diamonds", number: "K", value: 12 },
  "diamonds-A": { color: "diamonds", number: "A", value: 13 },
  "clubs-2": { color: "clubs", number: "2", value: 1 },
  "clubs-3": { color: "clubs", number: "3", value: 2 },
  "clubs-4": { color: "clubs", number: "4", value: 3 },
  "clubs-5": { color: "clubs", number: "5", value: 4 },
  "clubs-6": { color: "clubs", number: "6", value: 5 },
  "clubs-7": { color: "clubs", number: "7", value: 6 },
  "clubs-8": { color: "clubs", number: "8", value: 7 },
  "clubs-9": { color: "clubs", number: "9", value: 8 },
  "clubs-10": { color: "clubs", number: "10", value: 9 },
  "clubs-J": { color: "clubs", number: "J", value: 10 },
  "clubs-Q": { color: "clubs", number: "Q", value: 11 },
  "clubs-K": { color: "clubs", number: "K", value: 12 },
  "clubs-A": { color: "clubs", number: "A", value: 13 },
  "spades-2": { color: "spades", number: "2", value: 1 },
  "spades-3": { color: "spades", number: "3", value: 2 },
  "spades-4": { color: "spades", number: "4", value: 3 },
  "spades-5": { color: "spades", number: "5", value: 4 },
  "spades-6": { color: "spades", number: "6", value: 5 },
  "spades-7": { color: "spades", number: "7", value: 6 },
  "spades-8": { color: "spades", number: "8", value: 7 },
  "spades-9": { color: "spades", number: "9", value: 8 },
  "spades-10": { color: "spades", number: "10", value: 9 },
  "spades-J": { color: "spades", number: "J", value: 10 },
  "spades-Q": { color: "spades", number: "Q", value: 11 },
  "spades-K": { color: "spades", number: "K", value: 12 },
  "spades-A": { color: "spades", number: "A", value: 13 },
};

let points = 0;
let previousCard;
let cardKeys = Object.keys(cards);
let guessesRemaining = cardKeys.length;

const pointsElement = document.getElementById("points");
const guessesLeft = document.getElementById("guessesLeft");
const card = document.getElementById("card");
const guessLower = document.getElementById("lower");
const guessSame = document.getElementById("same");
const guessHigher = document.getElementById("higher");
const cardSymbol = document.querySelectorAll("#symbol");
const cardNumber = document.querySelectorAll("#number");

const drawCard = (color, number) => {
  if (color === "hearts") {
    cardSymbol.forEach((cardSymbol) => {
      cardSymbol.innerText = "♥";
      cardSymbol.className = "red";
    });
  }

  if (color === "spades") {
    cardSymbol.forEach((cardSymbol) => {
      cardSymbol.innerText = "♠";
      cardSymbol.className = "black";
    });
  }

  if (color === "diamonds") {
    cardSymbol.forEach((cardSymbol) => {
      cardSymbol.innerText = "♦";
      cardSymbol.className = "red";
    });
  }

  if (color === "clubs") {
    cardSymbol.forEach((cardSymbol) => {
      cardSymbol.innerText = "♣";
      cardSymbol.className = "black";
    });
  }
  cardNumber.forEach((cardNumber) => {
    cardNumber.innerText = number;
  });
};

const onLoad = () => {
  guessesRemaining--;
  guessesLeft.innerHTML = `<strong>Försök kvar:</strong> ${guessesRemaining}`;

  let randomIndex = Math.floor(Math.random() * cardKeys.length);
  let randomCard = cards[cardKeys[randomIndex]];
  drawCard(randomCard.color, randomCard.number);

  delete cards[cardKeys[randomIndex]];
  cardKeys = Object.keys(cards);

  previousCard = randomCard;
};

onLoad();

const makeAGuess = (guess) => {
  guessesRemaining--;
  guessesLeft.innerHTML = `<strong>Försök kvar:</strong> ${guessesRemaining}`;

  let randomIndex = Math.floor(Math.random() * cardKeys.length);
  let randomCard = cards[cardKeys[randomIndex]];

  drawCard(randomCard.color, randomCard.number);

  if (guess === "lower") {
    if (previousCard.value > randomCard.value) {
      points++;
    }
  }
  if (guess === "same") {
    if (previousCard.value == randomCard.value) {
      points++;
    }
  }
  if (guess === "higher") {
    if (previousCard.value < randomCard.value) {
      points++;
    }
  }

  delete cards[cardKeys[randomIndex]];
  cardKeys = Object.keys(cards);

  pointsElement.innerHTML = `<strong>Poäng:</strong> ${points}`;
  previousCard = randomCard;

  if (guessesRemaining === 0) {
    guessLower.disabled = true;
    guessSame.disabled = true;
    guessHigher.disabled = true;
  }
};

guessLower.addEventListener("click", () => makeAGuess("lower"));
guessSame.addEventListener("click", () => makeAGuess("same"));
guessHigher.addEventListener("click", () => makeAGuess("higher"));
