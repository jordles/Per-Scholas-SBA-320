import React from 'react'

function GifDisplay({gif, favorites, downloadGif, toggleFavorite}) {
  const isFavorited = (gifId) => favorites.some((favoriteGif) => favoriteGif.id === gifId);
  const loaded = () => {
    console.log(gif);
    return (
      <div className ="gif-display">
        {gif.results.map(gif => (
          <div key={gif.id} className={`gif-wrapper ${isFavorited(gif.id) ? "favorited" : ""}`}>
            <img 
              src={gif.media_formats.gif.url} 
              alt={gif.content_description} 
            />
            <span className="material-symbols-rounded download" onClick={() => downloadGif(gif)}>download</span>
            <span className={`material-symbols-rounded heart ${isFavorited(gif.id) ? "favorited" : ""}`} onClick={() => toggleFavorite(gif)}>favorite</span>
          </div>  
        ))}
      </div>
      
    );
  };

  // Function to return loading JSX
  const loading = () => {
    return;
  };

  // Ternary operator will determine which functions JSX we will return
  return gif && gif !== "" ? loaded() : loading();
}

export default GifDisplay