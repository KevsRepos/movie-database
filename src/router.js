import { IonRouterOutlet } from "@ionic/react";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { useCookies } from 'react-cookie';
import { Route } from "react-router";
import { Redirect } from "react-router";
import Profile from "./pages/Profile/Profile";

const Router = () => {
  const [cookies] = useCookies(['authToken']);
  
  return(
    <IonRouterOutlet>
      <Route exact path="/" component={Home} />
      { !cookies.authToken ? <Route exact path="/Login/" component={LoginPage} /> : <Redirect to="/" /> }
      {/* <Route exact path="/Search/:searchValue/" component={SearchResults} />
      <Route exact path="/Movie/:name/" component={MovieCont} />*/}
      { cookies.authToken ? <Route exact path={["/Profile/", "/Profile/:userId/"]} component={Profile} /> : <Redirect to="/Login/" /> }
      {/*<Route path={["/Favorites/", "/Favorites/:userId/"]} component={Favorites} />
      <Route exact path="/Categories/" component={Categories} />
      <Route exact path="/Categories/:categoryName/" component={Category} />
      <Route path="/Add/" component={ token ? AddMovie : LoginPage } /> */}
    </IonRouterOutlet>
  )
}

export default Router;