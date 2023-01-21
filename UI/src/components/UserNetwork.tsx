import { Auth } from 'aws-amplify'
import React from 'react';
import { useState, useEffect } from "react";
import {
    IonContent, IonList,
    IonAvatar, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonItem,
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    IonThumbnail, IonImg, IonNote
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

import { UserInfo, useProfile,Network } from '../hooks/useProfile';

interface UserNetworkProps {
    userId?: string 
}

const UserNetwork: React.FC<UserNetworkProps> = ({ userId }) => {

    const { getUserInfo,setFollows,getUserNetwork } = useProfile();
    const [userprofile, setUserProfile] = useState<UserInfo>();
    const [usernetwork, setUsernetwork] = useState<Network>();
    const [profileUpdate, setProfileUpdated] = useState(false);

    useEffect(() => {
        getUserInfo().then((userprofile) => {
            setUserProfile(userprofile);
        });
        
    }, [profileUpdate]);


        if(userId !=undefined)
        {
            getUserNetwork(userId).then((usernetwork) => {
                setUsernetwork(usernetwork);
            });
        }
        
    const logOut = (e: any) => {
        Auth.signOut();
        // history.push("/");
        window.location.reload(false);
    }
    
    
  const captureFollows = (event: any, userid: any) => {
    event.preventDefault();
    
    if(userprofile !== undefined)
    {
        alert(userprofile.UserName + ">>follows >> " + userid)
        setFollows(userprofile.UserName,userid);
    }
  };

    if(userId === userprofile?.UserName)
    {
        return (
            <IonCard>
                <IonList>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src="./assets/profile.jpeg" />
                        </IonAvatar>
                        <IonLabel slot="start">{userId}</IonLabel>
                        
                    </IonItem>
    
                    <IonItem>
                        <IonLabel>followers: <b>{usernetwork?.followers}</b> follows: <b>{usernetwork?.follows}</b> posts: <b>{usernetwork?.posts}</b></IonLabel>
                    </IonItem>
                </IonList>
            </IonCard>
        );
    }
    else{
        return (
            <IonCard>
                <IonList>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src="./assets/profile.jpeg" />
                        </IonAvatar>
                        <IonLabel slot="start">{userId}</IonLabel>
                        <IonButton  slot="end" shape="round" onClick={(e) => captureFollows(e,userId)} color="secondary">follow</IonButton>
                    </IonItem>
    
                    <IonItem>
                        <IonLabel>followers: <b>{usernetwork?.followers}</b> follows: <b>{usernetwork?.follows}</b> posts: <b>{usernetwork?.posts}</b></IonLabel>
                    </IonItem>
                </IonList>
            </IonCard>
        );
    }
};

export default UserNetwork;
