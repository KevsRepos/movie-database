import { IonRouterOutlet } from "@ionic/react";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import {t} from './index';
import { useContext } from "react";
import { Route } from "react-router";
import { Redirect } from "react-router";

const Router = () => {
  const {authToken} = useContext(t);

  console.log(authToken);
  
  return(
    <IonRouterOutlet>
      <Route exact path="/" component={Home} />
      {
        !authToken ? <Route exact path="/Login/" component={LoginPage} /> : <Redirect to="/" />
      }
      {/* <Route exact path="/Search/:searchValue/" component={SearchResults} />
      <Route exact path="/Movie/:name/" component={MovieCont} />
      <Route exact path={["/Profile/", "/Profile/:userId/"]} component={Profile} />
      <Route path={["/Favorites/", "/Favorites/:userId/"]} component={Favorites} />
      <Route exact path="/Categories/" component={Categories} />
      <Route exact path="/Categories/:categoryName/" component={Category} />
      <Route path="/Add/" component={ token ? AddMovie : LoginPage } /> */}
    </IonRouterOutlet>
  )
}

export default Router;