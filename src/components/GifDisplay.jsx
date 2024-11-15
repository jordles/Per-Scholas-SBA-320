import React from 'react'

function GifDisplay({gif}) {

  const loaded = () => {
    console.log(gif);
    return (
      <div className ="gif-display">
        {gif.results.map(gif => (
          <div className="gif-wrapper">
            <img 
              src={gif.media_formats.gif.url} 
              alt={gif.content_description} 
              data-id={gif.id} 
            />
            <span className="material-symbols-rounded download">download</span>
            <span className="material-symbols-rounded heart">favorite</span>
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