import { IonText } from "@ionic/react"
import './ErrMsg.css'

const ErrMsg = props => {
  return(
    <IonText color="danger">
      {props.errMsg}
    </IonText>
  )
}

export default ErrMsg;