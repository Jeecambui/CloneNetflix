import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  
  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista inteira
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <div>
          Feito com <span role="img" aria-label="coração">❤️</span> por Jef<br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org
        </div>

        <br></br>

        <div class="box images">
            <div className='socials'>
                <a href="https://github.com/Jeecambui"><img src="https://site-responsivo-marvel.vercel.app/img/github.png" alt="Github"></img></a>
                <a href="https://www.linkedin.com/in/jefersoncambui/"><img src="https://site-responsivo-marvel.vercel.app/img/linkedin.png" alt="LinkedIn"></img></a>
            </div>
        </div>

      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" width="100%" alt="Carregando" />
        </div>      
      }
    </div>
  );
}