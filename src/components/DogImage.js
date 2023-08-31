import React, { useState, useEffect } from 'react';

function DogImage() {
    const [searchInput, setSearchInput] = useState('');
    const [breedOptions, setBreedOptions] = useState([]);
    const [images, setImages] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        fetchBreedOptions();
    }, []);

    const fetchBreedOptions = () => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => setBreedOptions(Object.keys(data.message)))
            .catch(error => console.error('Error fetching breed options:', error));
    };

    const handleSearchInputChange = (event) => setSearchInput(event.target.value);

    const searchBreed = () => {
        fetch(`https://dog.ceo/api/breed/${searchInput}/images`)
            .then(response => response.json())
            .then(data => {
                setImages(data.message.slice(0, 10));
                setShowResults(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const toggleFavorite = (url) => {
        if (favorites.includes(url)) {
            setFavorites(favorites.filter(favUrl => favUrl !== url));
        } else {
            setFavorites([...favorites, url]);
        }
    };

    return (
        <div className='container'>
            <h1>Dog Breed Search</h1>

            <div>
                <input
                    type="text"
                    list="breedOptions"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    placeholder="Enter a dog breed"
                />
                <datalist id="breedOptions">
                    {breedOptions.map((breed, index) => (
                        <option key={index} value={breed} />
                    ))}
                </datalist>
                <button onClick={searchBreed}>Search</button>
            </div>
            
            <div className='master-container'>
            <div className="image-gallery" >
                {images.map(url => (
                    <div  key={url}>
                        <img className='Dog-poster' src={url} alt="Dog" />
                        <button onClick={() => toggleFavorite(url)}>{favorites.includes(url) ? 'Unfavorite' : 'Favorite'}</button>
                    </div>
                ))}
            </div>
            </div>
            
            {showResults && (
                <div className='imagesContainer'>
                    <h2>Favorites</h2>
                    <div id="favoritesContainer">
                        {favorites.map(url => (
                            <div key={url}>
                                <img  className='finalpic' src={url} alt="Dog" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DogImage;
