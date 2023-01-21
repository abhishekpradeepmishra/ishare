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
  IonRouterLink
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
  optionsOutline,
  close,
  heart,
  closeCircle,
  thumbsUp,
  thumbsDown,
  thumbsUpOutline,
  thumbsDownOutline,
  thumbsUpSharp,
  documentTextOutline,
  heartOutline,
  heartCircleOutline
} from 'ionicons/icons';

import { usePosts, Post } from '../hooks/usePosts';
import { useLocation, useHistory } from 'react-router-dom';
import PostView from './PostView'


interface PostsContainerProps {
  posts: Post[]
}

const PostsContainer: React.FC<PostsContainerProps> = ({ posts }) => {
  const { getNewPosts, getPosts, updateLikeStatusForPost, updateCommentForPost, getPostsBySearchKey, getPostsByUserId } = usePosts();
  const location = useLocation();
  const history = useHistory();

  // const captureComments = (event: any, postid: string) => {
  //   event.preventDefault();
  //   var url = '/posts/{post}/comments'.replace('{post}', postid);
  //   history.push(url);
  // };

  // const captureLike = (event: any, postid: string, state: boolean) => {
  //   event.preventDefault();
  //   updateLikeStatusForPost(postid).then(issuccess => {
  //     if (issuccess) {
  //       alert("thanks for liking");

  //       //change the icon style to set selected
  //       //Pending: Video selected by the person should be shown a selected. Should there be a separate screen for videos liked by a person
  //       document.getElementById(postid + "-likes")?.setAttribute('icon',heartCircleOutline)
  //     }
  //     else {
  //       alert("didn't work");
  //     }
  //   })
  // };

  // const gotoUserDetails = (author: string) => {
  //   //return '/user/userdetails/{author}'.replace('{author}', author);
  //   //hardcoding this for now
  //   return '/user/userdetails/{author}'.replace('{author}', 'abhmish');
  // };

  return (
    <div className="container">
      {posts.map((post, index) => (
        <PostView postid={post.id}></PostView>
      ))}
    </div>
  );
};

export default PostsContainer;
