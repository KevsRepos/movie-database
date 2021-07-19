import { IonRouterOutlet } from "@ionic/react";

const Router = () => {
  
  return(
    <IonRouterOutlet>
      <Route exact path="/" component={Landing} />
      {
        !token && <Route exact path="/Login/" component={LoggedOut} />
      }
      <Route exact path="/Search/:searchValue/" component={SearchResults} />
      <Route exact path="/Movie/:name/" component={MovieCont} />
      <Route exact path={["/Profile/", "/Profile/:userId/"]} component={Profile} />
      <Route path={["/Favorites/", "/Favorites/:userId/"]} component={Favorites} />
      <Route exact path="/Categories/" component={Categories} />
      <Route exact path="/Categories/:categoryName/" component={Category} />
      <Route path="/Add/" component={ token ? AddMovie : LoggedOut } />
    </IonRouterOutlet>
  )
}

export default Router;