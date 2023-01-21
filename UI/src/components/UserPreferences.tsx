import React from 'react';
import { useState, useEffect } from "react";
import {
    IonContent, IonList,
    IonAvatar, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonItem,
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonChip, IonCheckbox, IonItemDivider
} from '@ionic/react';
import './UserPreferences.css';
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
    optionsOutline,
    close,
    heart,
    closeCircle
} from 'ionicons/icons';

import { Link, RouteComponentProps } from 'react-router-dom';
import { usePreferences, UserPreference } from '../hooks/usePreferences';
import { stringify } from 'querystring';

interface PreferencesMap {
    title: string,
    isSelected: boolean
}

const Preferences: React.FC = () => {

    const { getUserPreferences, getPreferencesList } = usePreferences();
    const [preferencesUpdated, setPreferencesUpdated] = useState(false);

    const [userPreferences, setUserPreferences] = useState<UserPreference>();
    const [preferencesMap, setPreferencesMap] = useState<PreferencesMap[]>([]);

    useEffect(() => {

        getPreferencesList().then(res => {
            res?.map((preference, index) => (
                preferencesMap?.push(
                    {
                        title: preference,
                        isSelected: false
                    }
                )
            ));

            getUserPreferences().then(res => {
                setUserPreferences(res);

                res?.subsribedTopics.forEach(topic => {
                    let index = preferencesMap?.findIndex(e => e.title === topic)
                    preferencesMap[index].isSelected = true;
                })

                setPreferencesMap(preferencesMap);
            });
        })
    }, [preferencesUpdated]);

    return (
        // <IonPage>
        //     <IonHeader>
        //         <IonToolbar>
        //             <IonTitle>Settings</IonTitle>
        //         </IonToolbar>
        //     </IonHeader>
        <IonCard>
            <IonItem>
                <IonLabel>Enable Notifications </IonLabel>
                <IonCheckbox slot="end" color="primary" checked={userPreferences?.enableNotification} />
            </IonItem>
            <IonItemDivider>
                Preferred topics (Select from list below)
            </IonItemDivider>
            {/* <IonItem>
                <div>*/}
            {
                preferencesMap?.map((preference, index) => (
                    // <IonChip outline color={preference.isSelected ? 'success' : 'secondary'} >
                    //     <IonLabel>{preference.title}</IonLabel>
                    // </IonChip>

                    <IonItem no-lines>
                        <IonLabel>{preference.title}</IonLabel>
                        <IonCheckbox slot="end" value={preference.title} checked={preference.isSelected} />
                    </IonItem>
                ))
            }
            {/* </div>
            </IonItem> */}
        </IonCard>
        // </IonPage>
    );
};

export default Preferences;
