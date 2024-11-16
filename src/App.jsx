import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search.jsx'
import GifDisplay from './components/GifDisplay.jsx';
import axios from 'axios';
import ToggleMenu from './components/ToggleMenu.jsx';
import Footer from './components/Footer.jsx';
function App() {
  const apiKey = import.meta.env.VITE_API_KEY
  const [gif, setGif] = useState(null);

  // Load favorites from localStorage or initialize an empty array
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });;

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // const getGif = async(searchTerm) => {
  //   try {
  //     const response = await axios.get(
  //       `https://tenor.googleapis.com/v2/search?key=${apiKey}&q=${searchTerm}`
  //     );
  //     const data = await response.data;
  //     setGif(data); // this will update the gif state
  //   } catch(e) {
  //     console.error(e)
  //   }
  // };

  const getGif = (searchTerm) => {
    const xhr = new XMLHttpRequest();
    const url = `https://tenor.googleapis.com/v2/search?key=${apiKey}&q=${searchTerm}`;
  
    xhr.open("GET", url, true); // Open a GET request asynchronously
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText); // Parse JSON response
          setGif(data); // Update the gif state
        } catch (error) {
          console.error("Error parsing response data:", error);
        }
      } else {
        console.error("Request failed with status:", xhr.status);
      }
    };
  
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
  
    xhr.send(); // Send the request
  };


  const downloadGif = async gif => {
    try {
      const url = gif.media_formats.gif.url;
  
      // Fetch the file
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch GIF");
      }
  
      // Convert the response to a Blob
      const blob = await response.blob();
  
      // Create a downloadable object URL
      const objectUrl = URL.createObjectURL(blob);
  
      // Create a link element
      const link = document.createElement("a");
      link.href = objectUrl;
  
      // Use the file name from the URL or a default name
      const match = url.match(/\/([^\/]+)$/);
      link.download = match ? match[1] : "download.gif";
  
      // Trigger the download
      link.click();
  
      // Clean up the object URL to free memory
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Error downloading GIF:", error);
    }
  }

  const toggleFavorite = gif => {
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
      <ToggleMenu favorites={favorites} downloadGif={downloadGif} toggleFavorite={toggleFavorite}/>
      <h1 className="title">Giffy in a Jiffy</h1>
      <Search gifsearch={getGif}/>
      <GifDisplay gif={gif} favorites={favorites} downloadGif={downloadGif} toggleFavorite={toggleFavorite}/>
      <Footer />
    </>
  )
}

export default App
