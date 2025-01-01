import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';
const TitleCards = ({title, category}) => {

  const [apidata, setApiData] = useState([]);

const cardsRef = useRef();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA5Y2RiZGUwY2Y0Y2ExNzJlNTE5ZmQ4YTQ1OTYwMSIsIm5iZiI6MTczNDM1MjMxMy40MjcsInN1YiI6IjY3NjAxZGI5ODYyNThhNmZiNzYzNjI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YgCpxtSeSfvIgRJpFiIDpfLzGozfaCLLRlSdBt3Ok_I'
  }
};

const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list"  ref={cardsRef}>
        {apidata.map((card, index)=>{
           return <Link to={`/player/${card.id}`} className="card" key={index}>
             <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
             <p>{card.original_title}</p>
           </Link>
        })}
      </div>
    </div>
  );
}

export default TitleCards;
