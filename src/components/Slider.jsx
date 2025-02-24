import React, { useRef } from 'react';
import './css/Slider.css';
import Card from './Card';

const Slider = ({ cards }) => {
  const sliderRef = useRef(null);
  
  // Function to scroll left or right
  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    sliderRef.current.scrollBy({
      top: 0,
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="slider-container">
      <button className="scroll-button left" onClick={() => scroll('left')}>{'<'}</button>
      <div className="slider" ref={sliderRef}>
        {cards.map((card, index) => (
          <Card key={index} image={card.Poster} title={card.Title} description={card.Year}/>
        ))}
      </div>
      <button className="scroll-button right" onClick={() => scroll('right')}>{'>'}</button>
    </div>
  );
};

export default Slider;