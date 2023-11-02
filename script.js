const suites = ["hearts", "diamonds", "clubs", "spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
let cards = [];

for (let x = 0; x < suites.length; x++) {
  for (let i = 0; i < values.length; i++) {
    cards.push({ suite: suites[x], number: values[i], value: i });
  }
}

let points = 0;
let previousCard;
let guessesRemaining = cards.length;

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

  let randomIndex = Math.floor(Math.random() * cards.length);
  let randomCard = cards[randomIndex];
  drawCard(randomCard.suite, randomCard.number);

  cards.splice(randomIndex, 1);

  previousCard = randomCard;
};

onLoad();

const makeAGuess = (guess) => {
  guessesRemaining--;
  guessesLeft.innerHTML = `<strong>Försök kvar:</strong> ${guessesRemaining}`;

  let randomIndex = Math.floor(Math.random() * cards.length);
  let randomCard = cards[randomIndex];
  drawCard(randomCard.suite, randomCard.number);

  if (guess === "lower" && previousCard.value > randomCard.value) {
    points++;
  }
  if (guess === "same" && previousCard.value == randomCard.value) {
    points++;
  }
  if (guess === "higher" && previousCard.value < randomCard.value) {
    points++;
  }

  cards.splice(randomIndex, 1);

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
