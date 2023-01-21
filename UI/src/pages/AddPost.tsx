import React from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
  IonCol, IonImg, IonActionSheet, IonCard, IonTextarea, IonItem,IonButton
} from '@ionic/react';

import { camera, trash, close, cameraOutline, cameraSharp, saveOutline, mailUnreadSharp, closeOutline } from 'ionicons/icons';
import { usePhoto, Photo } from '../hooks/usePhoto';
import { usePosts, Post } from '../hooks/usePosts';
import { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import { Link, RouteComponentProps } from 'react-router-dom';
import PostContainer from '../components/PostsContainer'

import { UserInfo, useProfile } from '../hooks/useProfile';


// BUG: the text value getting reset after image selection

const AddPost: React.FC = () => {
  const { photos, takePhoto, deletePhoto} = usePhoto();
  const { saveNewPost } = usePosts();
  const [post, setPost] = useState([]);
  
  const { getUserInfo } = useProfile();
    const [userprofile, setUserProfile] = useState<UserInfo>();
    const [profileUpdate, setProfileUpdated] = useState(false);

    useEffect(() => {
        getUserInfo().then((userprofile) => {
            setUserProfile(userprofile);
        });
    }, [profileUpdate]);
    
  // const [pageRefresh, setPageReferesh] = useState(false);

  // useEffect(() => {
  //   setPost({
  //     text:"",
  //     photos:[]
  //   })
  // }, [pageRefresh]);

  const savePost = async (event: any) => {
    
    event.preventDefault();
    
    let postContent = document.getElementById("textarea")?.textContent;
    let postImage;
    
    if(photos.length > 0) {
      postImage = photos[0].base64String
    }
    var result = await saveNewPost(postContent,postImage)
    
    if(result?.data){
      window.location.href = '/user/userdetails/'+ userprofile?.UserName
    }
    console.log(result);
  };

  const getcompletepath = (content: any) => {
    // alert(("data:image/png;base64," + content));
    return ("data:image/png;base64," + content);
  }

  const deleteImagefromCollection = (event:any, id:any) => {
    deletePhoto(id);
  }

  
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>new post</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <IonCard>
          <IonItem>
            <IonTextarea rows={6} cols={20}  id="textarea"></IonTextarea>
          </IonItem>
          <IonItem>
            {/* <IonImg slot="end" src={saveplane} onClick={e => savePost(e)}></IonImg> */}
            <IonButton className="center-left" color="secondary" expand="full" onClick={(e) => savePost(e)} >save</IonButton>
          </IonItem>
        </IonCard>
        <IonCard>
          <IonGrid>
            <IonRow>
              {photos.map((photo, index) => (
                <IonCol size="12" key={index}>
                  <IonIcon icon={closeOutline} onClick={e => deleteImagefromCollection(e,photo.id)}></IonIcon>
                  <IonImg src={getcompletepath(photo.base64String)} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonCard>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={e => takePhoto(e)}>
            <IonIcon icon={cameraSharp}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default AddPost;
