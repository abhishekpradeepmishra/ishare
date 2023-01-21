import { Auth } from 'aws-amplify'
import React from 'react';
import { useState, useEffect } from "react";
import {
    IonContent, IonList,
    IonAvatar, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonItem,
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    IonThumbnail, IonImg
} from '@ionic/react';
import './UserProfile.css';
import {
    images, camera, square, home, pin, wifi, wine, warning, walk,
    cameraOutline, homeOutline,
    share,
    person,
    shareOutline,
    people,
    personOutline,
    peopleOutline,
    settingsOutline,
    optionsOutline
} from 'ionicons/icons';

import { UserInfo, useProfile } from '../hooks/useProfile';
import UserNetwork from './UserNetwork'

const UserProfile: React.FC = () => {

    const { getUserInfo } = useProfile();
    const [userprofile, setUserProfile] = useState<UserInfo>();
    const [profileUpdate, setProfileUpdated] = useState(false);

    useEffect(() => {
        getUserInfo().then((userprofile) => {
            setUserProfile(userprofile);
        });
    }, [profileUpdate]);


    const logOut = (e: any) => {
        Auth.signOut();
        // history.push("/");
        window.location.reload(false);
    }

    return (
        // <IonPage>
        //     <IonHeader>
        //         <IonToolbar>
        //             <IonTitle>Settings</IonTitle>
        //         </IonToolbar>
        //     </IonHeader>
        //     <IonContent>
        <IonCard>
            
            <IonItem>
                <IonLabel>Email</IonLabel><IonLabel>{userprofile?.Email} </IonLabel><IonButton className="center-left" color="secondary" expand="full">edit</IonButton>
            </IonItem>
            <IonItem>
                <IonLabel>Phone</IonLabel><IonLabel className="center-left">{userprofile?.Phone} </IonLabel><IonButton className="center-left" color="secondary" expand="full">edit</IonButton>
            </IonItem>

            <IonItem>
                <IonButton className="center-left" color="secondary" expand="full" onClick={(e) => logOut(e)} >Sign out</IonButton>
            </IonItem>
        </IonCard>

        //         <UserPreferences></UserPreferences>
        //     </IonContent>
        // </IonPage>
    );
};

export default UserProfile;
