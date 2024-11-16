import React from 'react'
import Divider from '@mui/material/Divider';
function Favorite({favorites, downloadGif, toggleFavorite}) {
  const isFavorited = (gifId) => favorites.some((favoriteGif) => favoriteGif.id === gifId);
  return (
    <div>
      <div style={{textAlign: "center"}}>⭐ Favorites ⭐</div>
      <Divider />
      {favorites.length > 0 ? (
        favorites.map((gif) => (
          <div key={gif.id} className="favorite-gif">
            <img src={gif.media_formats.gif.url} alt={gif.content_description} />
            <span className="material-symbols-rounded download" onClick={() => downloadGif(gif)}>download</span>
            <span className={`material-symbols-rounded heart ${isFavorited(gif.id) ? "favorited" : ""}`} onClick={() => toggleFavorite(gif)}>favorite</span>
          </div>
        ))
      ) : (
        <p>No favorites yet!</p>
      )}
    </div>
  )
}

export default Favorite