export const fetchAPI = (url, data) => {
  let httpAnswer = {
    httpStatus: null,
    data: null,
    okCallback: null,
    emptyResultCallback: null
  }

  httpAnswer.giveRes = async res => {
    httpAnswer.httpStatus = await res.status;
    if (res.status === 200) {
      httpAnswer.data = await res.json();
      httpAnswer.okCallback?.(httpAnswer.data);
    }else if(res.status === 462) {
      httpAnswer.emptyResultCallback?.();
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

  fetch("http://localhost:3005/api/" + url, {
    headers: {
      "Authorization": "Basic Og==",
      "Content-Type": "application/json" 
    },
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include'
  }).then((res) => {
    httpAnswer.giveRes(res)
  });

  return httpAnswer;
}