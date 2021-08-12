import { IonLoading, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { fetchAPI } from "../../functions/fetchAPI";

const Profile = () => {
  const history = useHistory();
  const {userId} = useParams();
  const [errMsg, setErrMsg] = useState();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    if(!userId) {
      fetchAPI('account/read')
      .ok(data => setProfileData(data))
      .badlyAuthenticated(() => {
        history.push('/Login/');
      })
      .emptyResult(() => {
        setErrMsg('Diesen Nutzer gibt es nicht mehr.');
      });
    }
  }, []);

  if(profileData) {
    return (
      <IonPage>
        <main>
          
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
export default Profile;