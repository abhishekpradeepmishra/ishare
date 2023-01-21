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

import { usePosts, Post,PostDetails } from '../hooks/usePosts';
import { useLocation, useHistory } from 'react-router-dom';


interface PostsContainerProps {
  postid: string
}

const PostView: React.FC<PostsContainerProps> = ({ postid }) => {
  const { getNewPosts, getPosts, updateLikeStatusForPost, updateCommentForPost, getPostsBySearchKey, getPostsByUserId,getPostsDetails} = usePosts();
  const location = useLocation();
  const history = useHistory();
  const [pageRefresh, setPageReferesh] = useState(false);
  const [post, setPost] = useState<PostDetails>();
  
  useEffect(() => {
    getPostsDetails(postid).then(res => {
      let post = res as PostDetails;
      //alert(JSON.stringify(post));
      setPost(post);
    });
  }, [pageRefresh]);
  

  
  const captureComments = (event: any, postid: string) => {
    event.preventDefault();
    var url = '/posts/{post}/comments'.replace('{post}', postid);
    history.push(url);
  };

  const captureLike = (event: any, postid: string, state: boolean) => {
    event.preventDefault();
    updateLikeStatusForPost(postid).then(issuccess => {
      if (issuccess) {
        //alert("thanks for liking");

        //change the icon style to set selected
        //Pending: Video selected by the person should be shown a selected. Should there be a separate screen for videos liked by a person
        document.getElementById(postid + "-likes")?.setAttribute('icon',heartCircleOutline)
      }
      else {
        alert("didn't work");
      }
    })
  };

  const gotoUserDetails = (author: string) => {
    return '/user/userdetails/{author}'.replace('{author}', author);
    //hardcoding this for now
   // return '/user/userdetails/{author}'.replace('{author}', 'abhmish');
  };

  if(post !=undefined)
  {

  return (
        <IonCard key={post.id}>
          {/* <IonCardHeader>
              <IonCardSubtitle>{post.title}</IonCardSubtitle>
              <IonCardTitle>{post.title}</IonCardTitle>
            </IonCardHeader> */}
          {/* <IonCardContent> */}


          {post.isVideo === true &&
            <div>
              {/* <ReactPlayer url={post.url}
                  controls
                  className='react-player'
                  width='100%'
                  height='100%'
                /> */}

              <video width="100%" height="100%" controls>
                <source src={post.url} type="video/mp4"></source>
                <source src={post.url} type="video/ogg"></source>
                Your browser does not support the video tag.
              </video>
            </div>
          }
          {post.isVideo == false &&
            <img src={post.url}></img>
          }


          {/* </IonCardContent> */}

          <IonItem>
            <IonLabel>
              <div>{post.title}</div>
              <div>
                <IonRouterLink href={gotoUserDetails(post.author)}> by {post.author}</IonRouterLink>
                
              </div>
            </IonLabel>
          </IonItem>


          <IonItem>
            
            { post.isLikedbyCurrentUser === "1" &&
              <span>
                <IonIcon icon={heartCircleOutline} id={post.id + '-likes'} onClick={e => captureLike(e, post.id, true)}></IonIcon>{post.likes}
              </span>
            }

            
            
            { post.isLikedbyCurrentUser === "0" &&
              <span>
                <IonIcon icon={heartOutline} id={post.id + '-likes'} onClick={e => captureLike(e, post.id, true)}></IonIcon>{post.likes}
              </span>
            }

         
            <IonIcon slot="end" icon={documentTextOutline} onClick={e => captureComments(e, post.id)}></IonIcon>
          
          </IonItem>


        </IonCard>
  );
  
  }
  else{
    return (<div>loading...</div>)
  }
};

export default PostView;
