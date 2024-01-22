import React, { useEffect, useState } from 'react';

const Cards = ({ gifLink, onClick }) => {
    const [gifs, setGifs] = useState([]);

    useEffect(() => {
        const fetchGif = async () => {
            try {
                setGifs([{ images: { fixed_height: { url: gifLink } } }]);
            } catch (error) {
                console.error('Error fetching GIF:', error);
            }
        };

        fetchGif();
    }, [gifLink]);

    return (
        <div className="card">
            {gifs.map((gif, index) => (
                <div key={index} className="card" onClick={onClick}>
                    <img src={gif.images.fixed_height.url} alt={`GIF ${index}`} />
                </div>
            ))}
        </div>
    );
};

export default Cards;
