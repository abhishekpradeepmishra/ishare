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
  IonList,
  IonNote,
  IonAvatar, IonBackButton, IonButtons
} from '@ionic/react';
import './page.css';
import { usePosts, Post } from '../hooks/usePosts';
import ReactPlayer from 'react-player'
import { Link, RouteComponentProps, useParams } from 'react-router-dom';

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
import PostContainer from '../components/PostsContainer'
import UserNetwork from '../components/UserNetwork';
import { useLocation, useHistory } from 'react-router-dom';

const UserInfo: React.FC<RouteComponentProps> = () => {

  let { user } = useParams();


  const { getNewPosts, getPosts, updateLikeStatusForPost, updateCommentForPost, getPostsBySearchKey, getPostsByUserId } = usePosts();
  const location = useLocation();
  const history = useHistory();

  const [pageRefresh, setPageReferesh] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [posts, setposts] = useState<Post[]>([]);


  // const captureComments = (event: any, postid: string) => {
  //   event.preventDefault();
  //   var url = '/posts/{post}/comments'.replace('{post}', postid);
  //   history.push(url);
  // };


  // const gotoUserDetails = (event: any, author: string, state: boolean) => {
  //   event.preventDefault();
  //   var url = '/user/userdetails/{author}'.replace('{author}', author);
  //   history.push(url);
  // };


  useEffect(() => {
    getPostsByUserId(user).then(res => {
      //console.log(res.length);
      setposts(res);
    });
  }, [pageRefresh]);

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar class="ion-text-center">
          <IonTitle>{user}</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <UserNetwork userId={user}></UserNetwork>
        <PostContainer posts={posts}></PostContainer>
      </IonContent>
    </IonPage>
  );
};

export default UserInfo;
