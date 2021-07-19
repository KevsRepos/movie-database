import ReactDOM from 'react-dom';

import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* imports */
import Header from './components/header';
import React from 'react';
import { useCookies } from 'react-cookie';

export const t = React.createContext(null);

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

  return(
    <IonApp>
      <t.Provider value={{
        authToken: cookies.authToken,
        setToken: (newToken) => setCookie('authToken', newToken),
        removeToken: () =>  removeCookie('authToken')
      }}>
      <Header />
      </t.Provider>
    </IonApp>
  )
};

export default App;


ReactDOM.render(
  <IonReactRouter>
    <App />
  </IonReactRouter>,
  document.getElementById('root')
);