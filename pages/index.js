import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Index() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    let subscribed = true;
    const fetchDeckId = async () => {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/');
      const json = await response.json();
      if (subscribed) {
        setDeckId(json['deck_id']);
      }
    };
    fetchDeckId();
    () => {
      subscribed = false;
    };
  }, []);
  const drawCard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const json = await response.json();
    setCards([...cards, json.cards[0].image]);
  };
  return (
    <>
      <h1>The deck ID is {deckId}</h1>
      <button onClick={drawCard}>Draw a Card</button>
      {cards.map((card, idx) => {
        return (
          <Image
            key={idx}
            src={card}
            width={500}
            height={500}
            alt='Image of a card'
          />
        );
      })}
    </>
  );
}
