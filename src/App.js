import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import { GiSelfLove } from "react-icons/gi";



export default () => {
  const [movieList, setMovielist] = useState([]);
  const [featuredDate, setFeaturedDate] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista toda.
      let list = await Tmdb.getHomeList();
      setMovielist(list);

      //Pegando o filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedDate(chosenInfo);

    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })
  return (
    <div className="page">
      <Header black={blackHeader}></Header>

      {featuredDate &&
        <FeaturedMovie item={featuredDate}></FeaturedMovie>

      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label="coração"><GiSelfLove /> </span> por Marco Cavalcante
        Direito de imagem para Netflix
        Dados pegos do site: Themodb.org
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2240,c_limit/Netflix_LoadTime.gif" alt="Carregamento Netflix" title="Loading"></img>
        </div>
      }
    </div>
  );
}