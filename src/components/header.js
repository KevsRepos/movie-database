import { IonButton, IonHeader, IonIcon, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react"
import { personOutline, searchOutline } from 'ionicons/icons';
import { useState } from "react";
// import { useHistory } from "react-router";
import { fetchAPI } from "../functions/fetchAPI";
import './header.css';

const Header = () => {
  return(
    <IonHeader>
      <IonToolbar>
        <div className="headingFlex">
          <IonTitle>Filmdatenbank</IonTitle>
          <div className="headerBtns">
            <SearchBtn />
            <IonButton><IonIcon icon={personOutline} /></IonButton>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header;

const SearchBtn = () => {
  // const history = useHistory();
  const [toggleSearchbar, setToggleSearchbar] = useState(false);
  const [movieData, setMovieData] = useState(false);
  const [search, setSearch] = useState("");

  const openSeachbar = () => {
    toggleSearchbar ? 
    setToggleSearchbar(false) :
    setToggleSearchbar(true);

    // if(toggleSearchbar && search !== "") {
    //   history.push(`/Search/${search}`);
    // }
  }

  const searchMovies = e => {
    setSearch(e.target.value);

    if(e.target.value === "") {
      setMovieData(false);
      return;
    }

    fetchAPI('movies/search', {value: e.target.value})
    .then(data => {
      setMovieData(data);
    })
    .catch(err => {
      setMovieData(false);
      console.log("Neuer Error: " + err)
    });
  }

  return(
    <>
    {
      toggleSearchbar ?
      <div className="searchbar">
        <IonSearchbar placeholder="z.B. V wie Vendetta..." className="searchInput" value={search} onInput={e => searchMovies(e)} animated="true"></IonSearchbar>
      </div> : null
    }
    {
      movieData ? <SuggestionsCont movies={movieData} setMovies={setMovieData} /> : null
    }
    <IonButton className="headerBtn" onClick={openSeachbar}>
      <IonIcon icon={searchOutline} />
    </IonButton>
    </>
  )
}

const SuggestionsCont = props => {
  console.log('suggestions')
  return(
    <div className="suggestions">
    {
      props.movies.map(data => {
        return <span key={data.movieId}>{data.name}</span>
      })
    }
    </div>
  )
}