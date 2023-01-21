import React from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
  IonCol, IonImg, IonActionSheet
} from '@ionic/react';


import { camera, trash, close } from 'ionicons/icons';

const Network: React.FC = () => {

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Network</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My network</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Network;
