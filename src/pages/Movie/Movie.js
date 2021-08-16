const { IonPage, IonLoading } = require("@ionic/react")
const { useEffect, useState } = require("react");
const { useParams } = require("react-router");
const { fetchAPI } = require("../../functions/fetchAPI");

const MovieCont = () => {
  const [movieData, setMovieData] = useState();
  const {name} = useParams();

  useEffect(() => {
    fetchAPI('movies/read', {
      movie: name
    })
    .ok(data => setMovieData(data));
  });

  if(movieData) {
    return (
      <IonPage>
        <main>
          {movieData.name}
        </main>
      </IonPage>
    )
  }else {
    return (
      <IonPage>
        <IonLoading />
      </IonPage>
    )
  }
}

export default MovieCont;