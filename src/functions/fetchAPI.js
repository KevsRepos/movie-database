import { getCookie } from "./functions";

export const fetchAPI = (url, data) => {
  let httpAnswer = {
    httpStatus: null,
    data: null,
    okCallback: null,
    emptyResultCallback: null,
    badlyAuthenticatedCallback: null,
    passwordWrongCallback: null,
    emailAssignedCallback: null,
    unknownClientErrorCallback: null
  }

  httpAnswer.giveRes = async res => {
    httpAnswer.httpStatus = await res.status;
    if (res.status === 200) {
      httpAnswer.data = await res.json();
      httpAnswer.okCallback?.(httpAnswer.data);
    }else if(res.status === 462) {
      httpAnswer.emptyResultCallback?.();
    }else if(res.status === 461) {
      httpAnswer.badlyAuthenticatedCallback?.();
    }else if(res.status === 464) {
      httpAnswer.passwordWrongCallback?.();
    }else if(res.status === 460) {
      httpAnswer.emailAssignedCallback?.();
    }else if(res.status === 400) {
      httpAnswer.unknownClientErrorCallback?.();
    }
  }

  httpAnswer.ok = func => {
    httpAnswer.okCallback = func;

    return httpAnswer;
  }

  httpAnswer.emptyResult = func => {
    /**
     * @param Error462 - Gesuchter Eintrag existiert nicht in der Datenbank, weshalb das System nicht fortführen kann
    */
    httpAnswer.emptyResultCallback = func;

    return httpAnswer;
  }

  httpAnswer.badlyAuthenticated = func => {
    /**
     * @param Error461 - Token validierung gab unerwünschtes Ergebnis zurück
    */
    httpAnswer.badlyAuthenticatedCallback = func;

    return httpAnswer;
  }

  httpAnswer.passwordWrong = func => {
    /**
     * @param Error464 - Passwort stimmt nicht
    */
    httpAnswer.passwordWrongCallback = func;

    return httpAnswer;
  }

  httpAnswer.emailAssigned = func => {
    /**
     * @param Error460 - Email-Adresse bereits vergeben
    */
    httpAnswer.emailAssignedCallback = func;

    return httpAnswer;
  }

  httpAnswer.unknownClientError = func => {
    /**
     * @param Error400 - Anfrage abgebrochen, da Daten vom Client unbrauchbar sind
    */
    httpAnswer.unknownClientErrorCallback = func;

    return httpAnswer;
  }

  console.log(getCookie('authToken'));
  fetch("http://localhost:3005/api/" + url, {
    headers: { 
      'Content-Type': 'application/json'
    }, 
    credentials: 'include', 
    method: 'POST', 
    body: JSON.stringify(data)
  }).then((res) => {
    console.log(res);
    httpAnswer.giveRes(res)
  });

  return httpAnswer;
}