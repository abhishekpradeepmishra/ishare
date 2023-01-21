import { Auth } from 'aws-amplify'
import React from 'react';
import { useState, useEffect } from "react";
import {
    IonContent, IonList,
    IonAvatar, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonItem,
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    IonThumbnail, IonImg
} from '@ionic/react';
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

import { Link, RouteComponentProps } from 'react-router-dom';
import { UserInfo, useProfile } from '../hooks/useProfile';
import UserPreferences from '../components/UserPreferences';
import UserProfile from '../components/UserProfile';
import UserNetwork from '../components/UserNetwork';

const Settings: React.FC<RouteComponentProps> = ({ history }) => {

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
        history.push("/");
        window.location.reload(false);
    }

    return (
        <IonPage>
            {/* <IonHeader>
            <IonToolbar class="ion-text-center">
                    <IonTitle>settings</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonContent>
                
                <UserNetwork userId={userprofile?.UserName}></UserNetwork>
                <UserProfile></UserProfile>
                <UserPreferences></UserPreferences>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
