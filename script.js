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
let guessesRemaining = 3;
let cardsRemaining = cards.length;

const pointsElement = document.getElementById("points");
const guessesLeft = document.getElementById("guessesLeft");
const cardsLeft = document.getElementById("cardsLeft");
const cardSymbols = document.querySelectorAll("[data-container=symbol]");
const cardNumber = document.querySelectorAll("[data-container=number]");
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
  cardsRemaining--;
  guessesLeft.innerHTML = `<strong>Försök kvar:</strong> ${guessesRemaining}`;
  cardsLeft.innerHTML = `${cardsRemaining} kort kvar`;

  let randomIndex = Math.floor(Math.random() * cards.length);
  let randomCard = cards[randomIndex];
  drawCard(randomCard.suite, randomCard.number);

  cards.splice(randomIndex, 1);

  previousCard = randomCard;
};

onLoad();

const makeAGuess = (guess) => {
  cardsRemaining--;
  cardsLeft.innerHTML = `${cardsRemaining} kort kvar`;

  let randomIndex = Math.floor(Math.random() * cards.length);
  let randomCard = cards[randomIndex];
  drawCard(randomCard.suite, randomCard.number);

  if (
    (guess === "lower" && previousCard.value > randomCard.value) ||
    (guess === "same" && previousCard.value == randomCard.value) ||
    (guess === "higher" && previousCard.value < randomCard.value)
  ) {
    points++;
  } else {
    guessesRemaining--;
    guessesLeft.innerHTML = `<strong>Försök kvar:</strong> ${guessesRemaining}`;
  }

  cards.splice(randomIndex, 1);

  console.log(cards);

  pointsElement.innerHTML = `<strong>Poäng:</strong> ${points}`;
  previousCard = randomCard;

  if (guessesRemaining === 0) {
    guessButtons.forEach((guessButton) => {
      guessButton.disabled = true;
    });
    setTimeout(() => {
      alert("Du förlorade!");
    }, 200);
  }
};

guessButtons.forEach((guessButton) => {
  guessButton.addEventListener("click", (event) => {
    const guess = event.currentTarget.getAttribute("data-guess");
    makeAGuess(guess);
  });
});
