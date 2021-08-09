import { IonButton, IonInput, IonItem, IonItemGroup, IonLabel, IonPage, IonSegment, IonSegmentButton } from "@ionic/react"
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import ErrMsg from "../components/ErrMsg/ErrMsg";
import { fetchAPI } from "../functions/fetchAPI";
import {t} from '../index';
import './Login.css';

export const LoginPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <IonPage>
      <main>
        <IonSegment className="switchSegment" value="Login">
          <IonSegmentButton onClick={() => setLogin(true)} value="Login">Login</IonSegmentButton>
          <IonSegmentButton onClick={() => setLogin(false)} value="Register">Register</IonSegmentButton>
        </IonSegment>
        {
          login ? <LoginView /> : <RegisterView />
        }
      </main>
    </IonPage>
  )
}

const LoginView = () => {
  const {setToken} = useContext(t)
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState();

  const submitLogin = e => {
    e.preventDefault();
    console.log('submit')
    fetchAPI('account/login', {
      email: email,
      password: password
    })
    .ok(() => {
      setToken(document.cookie.authToken);
      history.push('/');
    })
    .emptyResult(() => {
      setErrMsg('Email-Adresse ist falsch.');
    })
    .badlyAuthenticated(() => {
      setErrMsg('Es ist ein Fehler aufgetreten. Bitte lösche deinen Catche und lade die Seite neu.');
    })
    .passwordWrong(() => {
      setErrMsg('Passwort ist falsch.');
    })
  }

  return(
    <>
    <form onSubmit={e => submitLogin(e)}>
      <IonItemGroup className="formGroup">
        <div className="catchText">
          Logge dich ein um The text component is a simple component that can be used to style the text color of any element. The ion-text element should wrap the element in order to change the text color of that element.
        </div>
        <IonItem color="light">
          <IonLabel position="floating">Email-Adresse</IonLabel>
          <IonInput onInput={e => setEmail(e.target.value)} type="email" required />
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Passwort</IonLabel>
          <IonInput onInput={e => setPassword(e.target.value)} type="password" required />
        </IonItem>
        <div className="errText">
          {errMsg ? <ErrMsg errMsg={errMsg} /> : null}
        </div>
          <IonButton type="submit">Einloggen</IonButton>
      </IonItemGroup>
    </form>
    </>
  )
}

const RegisterView = () => {
  const history = useHistory();
  const [errMsg, setErrMsg] = useState();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState();
  const [password2ErrMsg, setPassword2ErrMsg] = useState();

  useEffect(() => {
    if(password !== password2) {
      setPassword2ErrMsg('Password stimmt nicht überein.');
      setPasswordCorrect(false);
    }else {
      setPassword2ErrMsg('');
      setPasswordCorrect(true);
    }
  }, [password, password2]);

  const onPassword1 = e => {
    const value = e.target.value;

    setPassword(value);

    if(value.length < 6) {
      setPasswordErrMsg('Passwort muss mehr als 6 Zeichen haben.');
      setPasswordCorrect(false);
    }else if(!/\d/.test(value)) {
      setPasswordErrMsg('Password muss mindestens eine Zahl beinhalten.');
      setPasswordCorrect(false);
    }else {
      setPasswordErrMsg('');
      setPasswordCorrect(true);
    }
  }

  const submitRegister = e => {
    e.preventDefault();

    if(!passwordCorrect) {
      return;
    }

    fetchAPI('account/create', {
      name,
      surname,
      email,
      password
    })
    .ok(() => {
      history.push('/');
    })
    .emailAssigned(() => {
      setErrMsg('Diese Email-Adresse ist bereits vergeben.');
    })
    .badlyAuthenticated(() => {
      setErrMsg('Es ist ein Fehler aufgetreten. Lösche bitte die Cookies und lade die Seite neu.');
    })
    .unknownClientError(() => {
      setErrMsg('Bitte überprüfe deine Daten auf Richtigkeit.');
    });
  }

  return(
    <form onSubmit={e => submitRegister(e)}>
      <IonItemGroup color="light" className="formGroup">
      <div className="catchText">
        Logge dich ein um The text component is a simple component that can be used to style the text color of any element. The ion-text element should wrap the element in order to change the text color of that element.
      </div>
        <IonItem color="light">
          <IonLabel position="floating">Vorname:</IonLabel>
          <IonInput onInput={e => setName(e.target.value)} type="text" required />
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Nachname:</IonLabel>
          <IonInput onInput={e => setSurname(e.target.value)} type="text" required />
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Email-Adresse</IonLabel>
          <IonInput onInput={e => setEmail(e.target.value)} type="email" required />
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Password:</IonLabel>
          <IonInput onInput={e => onPassword1(e)} type="text" required />
        </IonItem>
        {passwordErrMsg ? <ErrMsg errMsg={passwordErrMsg} /> : null}
        <IonItem color="light">
          <IonLabel position="floating">Password wiederholen:</IonLabel>
          <IonInput id="password2" onInput={e => setPassword2(e.target.value)} type="text" required />
        </IonItem>
        {password2ErrMsg ? <ErrMsg errMsg={password2ErrMsg} /> : null}
        <div className="errText">
          {errMsg ? <ErrMsg errMsg={errMsg} /> : null}
        </div>
        <IonButton type="submit">Registrieren</IonButton>
      </IonItemGroup>
    </form>
  )
}