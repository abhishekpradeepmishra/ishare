import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify'
import {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonCardTitle,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonModal, IonInput, IonItemDivider
} from '@ionic/react';

import { useAuth, User } from '../hooks/useAuth';


interface IProps {
    setUser: Function
}

export default function Login({ setUser }: IProps) {
    // console.log(setToken);

    const [userName, setUserName] = useState("defaultuser");
    const [password, setPassword] = useState("defaultpassword");

    const { verifyUser } = useAuth();

    const handleSignIn = (e: any) => {
        e.preventDefault();
        
        if (userName !== undefined && password !== undefined) {
            var signedInUser = verifyUser(userName, password);

            setUser(signedInUser);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                {/* <IonToolbar>
                    <IonTitle>Sign/SignUp</IonTitle>
                </IonToolbar> */}
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
                        <IonCardTitle>Kindly sign in to continue </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonLabel position="stacked">User name</IonLabel>
                        <IonInput value={userName} placeholder="enter user name"> </IonInput>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput value={password} type="password" placeholder="enter password"> </IonInput>
                        <IonButton expand="block" color="primary" onClick={e => handleSignIn(e)}>Next</IonButton>
                    </IonCardContent>

                    <IonCardContent>
                        <IonButton expand="block" color="primary">SignUp</IonButton>
                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    )
}

Login.prototype = {
    setToken: PropTypes.func.isRequired
}