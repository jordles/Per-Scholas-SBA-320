import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search.jsx'
import GifDisplay from './components/GifDisplay.jsx';
import axios from 'axios';
function App() {
  const apiKey= "AIzaSyCZrNZd8IcHffb1O8HputxG5GVTx8LbKI0";
  const [gif, setGif] = useState(null);

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

  return (
    <>
      <h1 className="title">Giffy in a Jiffy</h1>
      <Search gifsearch={getGif}/>
      <GifDisplay gif={gif}/>
    </>
  )
}

export default App
