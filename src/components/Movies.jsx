import Slider from './slider';
import React, { useState, useEffect,useRef } from 'react';
import { watchlistContext } from './Context';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Movies = () => {
  //Api key:  http://www.omdbapi.com/?i=tt3896198&apikey=75a18282
  
  const[data,setData]=useState([]);
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null);

  const[watchlist,setWatchlist]=useState([]);
  const value={watchlist,setWatchlist}
  const callCount = React.useRef(0); // Ref to track the number of API calls
  const c=0
  useEffect(()=>{
    
    setData([])
    console.log();
    
    const fetchData=async(link,genre)=>{
    
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        
        setData(prevData => [
          ...prevData,
          { genre: genre, movies: result.Search }
        ]);
        setLoading(false);
        
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };
    
    fetchData('http://www.omdbapi.com/?s=marvel&apikey=75a18282','marvel');
    fetchData('http://www.omdbapi.com/?s=comedy&apikey=75a18282','comedy');
    
  },[c])

  useEffect(() => {
    axios.post('http://localhost:5000/watchlist', { watchlist })
    .then(response => {
      // Handle the response if needed
      console.log(response.data);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    }); 
  },[watchlist])
 

  return (
    <div>
      <h1>Movies</h1>
      <p>Browse through our collection of movies.</p>
      <watchlistContext.Provider value={value}>
        {data.map((item, index) => (
          <div>
            <p style={{fontFamily:"cursive"}}>{item.genre} Movies</p>
            <Slider cards={item.movies}/>
          </div> 
          ))}
     
      </watchlistContext.Provider>
     
      watchlist
      {watchlist.map((movie,index)=>{
        return <li key={index}>{movie.title}</li>
      })}
   
    </div>
  );
};

export default Movies;