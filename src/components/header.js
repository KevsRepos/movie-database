import { IonButton, IonHeader, IonIcon, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react"
import { personOutline, searchOutline } from 'ionicons/icons';
import { useRef, useState } from "react";
import { fetchAPI } from "../functions/fetchAPI";
import './header.css';

const Header = () => {
  const [movieData, setMovieData] = useState(false);

  return(
    <>
    <IonHeader>
      <IonToolbar>
        <div className="headingFlex">
          <IonTitle>Filmdatenbank</IonTitle>
          <div className="headerBtns">
            <SearchBtn movieData={movieData} setMovieData={setMovieData} />
            <IonButton><IonIcon icon={personOutline} /></IonButton>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
    {
      movieData ? <SuggestionsCont movies={movieData} setMovies={setMovieData} /> : null
    }
    </>
  )
}

export default Header;

const SearchBtn = props => {
  const [toggleSearchbar, setToggleSearchbar] = useState(false);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const openSeachbar = () => {
    toggleSearchbar ? 
    setToggleSearchbar(false) :
    setToggleSearchbar(true);
    
    setTimeout(() => {
      !toggleSearchbar && searchInput.current.setFocus();
    }, 0);
  }

  const searchMovies = e => {
    setSearch(e.target.value);

    if(e.target.value === "") {
      props.setMovieData(false);
      return;
    }

    fetchAPI('movies/search', {value: e.target.value})
    .ok(data => {
      props.setMovieData(data);
    })
    .emptyResult(() => {
      props.setMovieData(false);
    })
  }

  return(
    <>
    {
      toggleSearchbar ?
      <div className="searchbar">
        <IonSearchbar ref={searchInput} placeholder="z.B. V wie Vendetta..." className="searchInput" value={search} onInput={e => searchMovies(e)} animated="true"></IonSearchbar>
      </div> : null
    }
    <IonButton className="headerBtn" onClick={openSeachbar}>
      <IonIcon icon={searchOutline} />
    </IonButton>
    </>
  )
}

const SuggestionsCont = props => {
  const searchbarStyles = useRef(document.getElementsByClassName('searchbar')[0].getBoundingClientRect());

  return(
    <div style={{
        left: searchbarStyles.current.left, 
        width: searchbarStyles.current.width
      }} className="suggestions ion-padding">
    {
      props.movies.map(data => {
        return <a href={`/`} className="ion-padding suggestionLink" key={data.movieId}>{data.name}</a>
      })
    }
    </div>
  )
}