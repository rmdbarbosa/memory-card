import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const cardImages = [
  { src: "/img/Vegeta.jpg", matched: false },
  { src: "/img/Freeza.jpg", matched: false },
  { src: "/img/GohanAdult.jpg", matched: false },
  { src: "/img/Goku.jpg", matched: false },
  { src: "/img/Kuririn.jpg", matched: false },
  { src: "/img/Piccolo.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState([0]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // reset choices && increase turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  return (
    <div className="App">
      <h1>DragonBall Z</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>{turns}</p>
    </div>
  );
}

export default App;
