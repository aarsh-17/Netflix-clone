import React, { useContext } from 'react';
import { useState } from 'react';
import './css/Card.css'; // Optional for styling
import { IoAddCircleOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { watchlistContext } from './Context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleMinus} from '@fortawesome/free-solid-svg-icons';

const Card = ({ image, title , description}) => {
  const [isExpanded,setIsExpanded]=useState(false);
  const {watchlist,setWatchlist}=useContext(watchlistContext);
  const [isadded,setIsAdded]=useState(false);
  const toggle=()=>{
    console.log("Expanded");
    
    setIsExpanded(!isExpanded);
  }
  


  const handlePlusClick = (e) => {
    e.stopPropagation();
    console.log(title);
    let flag=0;
    watchlist.find((item)=>{
      if(item.title===title){
        flag++;
      }
    })
    console.log(flag);
    
    if(flag===0){
    setIsAdded(true)
    setWatchlist([...watchlist,{image,title,description}]);
    }
    // console.log(watchlist);
  }

  const handleDotsClick = (e) => {
    e.stopPropagation();
    // Add your logic for three dots icon click
    console.log("Three dots icon clicked");
  }

  const handleMinus=(e)=>{
    setIsAdded(false)
    setWatchlist(watchlist.filter((item)=>item.title!==title));
  }

  return (
    <div className={`card ${isExpanded? 'expanded':''}`} onClick={toggle}>
      <img src={image} alt={title} className="card-image" />
      <h3>{title}</h3>
      {isExpanded && (
        <div className="card-description">
          <p>{description}</p>
        </div>
      )}
            <div className="card-icons">
       {!isadded ?<IoAddCircleOutline 
          className="icon plus-icon" 
          onClick={handlePlusClick}
        />:<FontAwesomeIcon 
        icon={faCircleMinus} className='icon plus-icon'
        onClick={handleMinus}/>} 
        <BsThreeDots 
          className="icon dots-icon" 
          onClick={handleDotsClick}
        />
      </div>
    </div>
  );
};

export default Card;