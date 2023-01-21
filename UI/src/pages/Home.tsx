import React from 'react';
import { useState, useEffect } from "react";
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
  IonModal,
  IonFab,
  IonFabButton,
  IonImg,IonGrid
} from '@ionic/react';
import { usePosts, Post } from '../hooks/usePosts';
import ReactPlayer from 'react-player'
import { Link, RouteComponentProps } from 'react-router-dom';
import PostContainer from '../components/PostsContainer'
import { useLocation, useHistory } from 'react-router-dom';

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
  closeCircle,
  thumbsUp,
  thumbsDown,
  thumbsUpOutline,
  thumbsDownOutline,
  thumbsUpSharp,
  documentTextOutline
} from 'ionicons/icons';

const Home: React.FC<RouteComponentProps> = () => {

  const { getNewPosts, getPosts, updateLikeStatusForPost, updateCommentForPost, getPostsBySearchKey, getPostsByUserId } = usePosts();
  const location = useLocation();
  const history = useHistory();

  const [pageRefresh, setPageReferesh] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [posts, setposts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(res => {
      setposts(res);
    });
  }, [pageRefresh]);


  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar class="ion-text-center">
          <img src="./assets/icon/icon.png" width="50" height="50"></img>
          <IonTitle>iShare</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
       
          <IonTitle class="ion-text-center">iShare</IonTitle>
          <PostContainer posts={posts}></PostContainer>
      
      </IonContent>
    </IonPage>
  );
};

export default Home;
