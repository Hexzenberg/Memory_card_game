import React, { useState, useEffect } from "react";
import Cards from "./Cards";

const Main = () => {
    const initialGifLinks = [
        'https://media.giphy.com/media/iDyF9dOL6nG4uS2S1z/giphy.gif',
        'https://media.giphy.com/media/yE72eDy7lj3JS/giphy.gif',
        'https://media.giphy.com/media/muGYyrWwxOOMo/giphy.gif',
        'https://media.giphy.com/media/muGYyrWwxOOMo/giphy.gif',
        'https://media.giphy.com/media/iDyF9dOL6nG4uS2S1z/giphy.gif',
        'https://media.giphy.com/media/yE72eDy7lj3JS/giphy.gif',
    ];

    const [gifLinks, setGifLinks] = useState(initialGifLinks);
    const [score, setScore] = useState(0);
    const [lastClickedGif, setLastClickedGif] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (gameOver) {
            setTimeout(() => {
                const result = window.confirm(`Game Over!\nNumber of times you clicked on unique cards: ${score}\nDo you want to play again?`);
                if (result) {
                    resetGame();
                } else {
                    window.close();
                }
            }, 0);
        }
    }, [gameOver, score]);

    const handleCardClick = (index) => {
        setGifLinks((prevGifLinks) => {
            const newGifLinks = [...prevGifLinks];
            newGifLinks[index] = getRandomGif(newGifLinks[index]);

            if (newGifLinks[index] === lastClickedGif) {
                // Clicked on the same GIF
                setGameOver(true);
            } else {
                // Clicked on a different GIF
                setScore((prevScore) => prevScore + 1);
                setLastClickedGif(newGifLinks[index]);
            }

            return newGifLinks;
        });
    };

    const getRandomGif = (currentGif) => {
        const randomGifs = [
            'https://media.giphy.com/media/3oEjHCWdU7F4hkcudy/giphy.gif',
            'https://media.giphy.com/media/e4ve7M8EGvjgI/giphy.gif',
            'https://media.giphy.com/media/WbDhQjgBrpUuk/giphy.gif',
            'https://media.giphy.com/media/iDyF9dOL6nG4uS2S1z/giphy.gif',
            'https://media.giphy.com/media/yE72eDy7lj3JS/giphy.gif',
            'https://media.giphy.com/media/muGYyrWwxOOMo/giphy.gif',
            'https://media.giphy.com/media/nGEQGzHpvIdi0lGJjn/giphy.gif',
        ];

        const filteredGifs = randomGifs.filter(gif => gif !== currentGif);

        const randomIndex = Math.floor(Math.random() * filteredGifs.length);
        return filteredGifs[randomIndex];
    };

    const resetGame = () => {
        setGifLinks(initialGifLinks);
        setScore(0);
        setLastClickedGif(null);
        setGameOver(false);
    };

    return (
        <div className="main">
            {gifLinks.map((gifLink, index) => (
                <Cards
                    key={index}
                    gifLink={gifLink}
                    onClick={() => handleCardClick(index)}
                />
            ))}
        </div>
    );
};

export default Main;
