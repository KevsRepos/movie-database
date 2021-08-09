import { IonButton, IonHeader, IonIcon, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react"
import { personOutline, searchOutline } from 'ionicons/icons';
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAPI } from "../functions/fetchAPI";
import {t} from '../index';
import './header.css';

const Header = () => {
  const [movieData, setMovieData] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  return(
    <>
    <IonHeader>
      <IonToolbar>
        <div className="headingFlex">
          <IonTitle>Filmdatenbank</IonTitle>
          <div className="headerBtns">
            <SearchBtn movieData={movieData} setMovieData={setMovieData} />
            <ProfileButton openProfileMenu={openProfileMenu} setOpenProfileMenu={setOpenProfileMenu} />
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
    {
      openProfileMenu ? <ProfileMenu /> : null
    }
    {
      movieData ? <SuggestionsCont movies={movieData} setMovies={setMovieData} /> : null
    }
    </>
  )
}

export default Header;

const ProfileButton = props => {
  const {authToken} = useContext(t);
  const menuRef = useRef();

  useEffect(() => {
    const closeMenu = e => {
      if(props.openProfileMenu && e.target !== menuRef) {
        props.setOpenProfileMenu(false);
      }
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [props.openProfileMenu]);

  return(
    <>
    <Link to={!authToken ? "./Login" : ""}>
      <IonButton onClick={authToken ? () => props.setOpenProfileMenu(!props.openProfileMenu) : null}>
        <IonIcon color="light" icon={personOutline} />
      </IonButton>
    </Link>
    </>
  )
}

const ProfileMenu = props => {
  return (
    <div ref={props.menuRef} className="profileMenu">
      <Link to="/Profile/">Profil</Link>
      <Link to="/Favorites/">Favoriten</Link>
      <LogOutButton />
    </div>
  )
}

const LogOutButton = () => {
  const {removeToken} = useContext(t);

  return (
    <IonButton onClick={removeToken}>
      Ausloggen
    </IonButton>
  )
}

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