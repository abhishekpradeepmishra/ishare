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
  IonFabButton,IonGrid
} from '@ionic/react';
import { usePosts, Post } from '../hooks/usePosts';
import ReactPlayer from 'react-player'
import { Link, RouteComponentProps } from 'react-router-dom';

import PostContainer from '../components/PostsContainer'

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

const Search: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { getNewPosts, getPosts, updateLikeStatusForPost, updateCommentForPost, getPostsByUserId, getPostsBySearchKey } = usePosts();
  // const [pageRefresh, setPageReferesh] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [posts, setposts] = useState<Post[]>([]);

  const filterRecords = async (value: string) => {
    setSearchText(value);
    let postsfound = await getPostsBySearchKey(searchText);
    setposts(postsfound);
  };

  return (
    <IonPage>
      {/* <IonHeader>
      <IonToolbar class="ion-text-center">
          <IonTitle>search</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        {/* <IonToolbar> */}
        <IonSearchbar onIonChange={e => filterRecords(e.detail.value!)}></IonSearchbar>
        {/* </IonToolbar> */}

        <PostContainer posts={posts}></PostContainer>
       
      </IonContent>
     
    </IonPage>
  );
};

export default Search;
