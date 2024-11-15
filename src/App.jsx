import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search.jsx'
import GifDisplay from './components/GifDisplay.jsx';
import axios from 'axios';
import ToggleMenu from './components/ToggleMenu.jsx';
function App() {
  const apiKey = import.meta.env.VITE_API_KEY
  const [gif, setGif] = useState(null);

  const [favorites, setFavorites] = useState([]);

  const getGif = async(searchTerm) => {
    try {
      const response = await axios.get(
        `https://tenor.googleapis.com/v2/search?key=${apiKey}&q=${searchTerm}`
      );
      const data = await response.data;
      setGif(data); // this will update the gif state
    } catch(e) {
      console.error(e)
    }
  };

  // This will run on the first render but not on subsquent renders
  // useEffect(() => {
  //   getGif("hello");
  // }, []);


  const toggleFavorite = (gif) => {
    setFavorites( prev => {
      //Check if the GIF is already favorited
      const isFavorited = prev.some(favorite => favorite.id === gif.id)
      // If the GIF is favorited, remove it from the list
      if(isFavorited) {
        return prev.filter(favorite => favorite.id !== gif.id)
      }
      // If the GIF is not favorited, add it to the list
      return [...prev, gif]
    })
  }
  return (
    <>
      <ToggleMenu favorites={favorites} toggleFavorite={toggleFavorite}/>
      <h1 className="title">Giffy in a Jiffy</h1>
      <Search gifsearch={getGif}/>
      <GifDisplay gif={gif} favorites={favorites} toggleFavorite={toggleFavorite}/>
    </>
  )
}

export default App
