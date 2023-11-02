const suites = [
  {
    suite: "hearts",
    color: "red",
    icon: "♥",
  },
  {
    suite: "diamons",
    color: "red",
    icon: "♦",
  },
  {
    suite: "clubs",
    color: "black",
    icon: "♣",
  },
  {
    suite: "spades",
    color: "black",
    icon: "♠",
  },
];
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

suites.forEach((suite) => {
  values.forEach((value, i) => {
    cards.push({ suite: suite.suite, number: value, value: i });
  });
});

let points = 0;
let previousCard;
let guessesRemaining = cards.length;

const pointsElement = document.getElementById("points");
const guessesLeft = document.getElementById("guessesLeft");
const card = document.getElementById("card");
const guessLower = document.getElementById("lower");
const guessSame = document.getElementById("same");
const guessHigher = document.getElementById("higher");
const cardSymbols = document.querySelectorAll("#symbol");
const cardNumber = document.querySelectorAll("#number");
const guessButtons = document.querySelectorAll("[data-guess]");

const drawCard = (color, number) => {
  let cardSuite = suites.find((s) => s.suite === color);

  cardSymbols.forEach((cardSymbol) => {
    cardSymbol.innerText = cardSuite.icon;
    cardSymbol.className = cardSuite.color;
  });

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
    guessButtons.forEach((guessButton) => {
      guessButton.disabled = true;
    });
  }
};

guessButtons.forEach((guessButton) => {
  guessButton.addEventListener("click", (event) => {
    const guess = event.currentTarget.getAttribute("data-guess");
    makeAGuess(guess);
  });
});
