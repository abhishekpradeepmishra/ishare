import React, { useState, useEffect } from 'react';
import { IonIcon, IonButton, IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTextarea, IonItem, IonLabel, IonItemDivider, IonList, IonCard, IonCardHeader, IonButtons } from '@ionic/react';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';
import { saveSharp, star, home, pin, wifi, wine, warning, walk, starOutline } from 'ionicons/icons';
import { usePosts, Post, PostComment } from '../hooks/usePosts';
import { Auth } from 'aws-amplify'
import { v4 } from 'uuid';

const Comments: React.FC<RouteComponentProps> = ({ history, match }) => {
    const [text, setText] = useState<string>("");
    const [comments, setComments] = useState<PostComment[]>([]);
    const [pageRefresh, setPageReferesh] = useState(false);
    let { postid } = useParams();
    const [postId, setPostId] = useState(postid);

    console.log(postid);

    const { updateCommentForPost, getAllCommentsForPost } = usePosts();

    const save = async (e: any) => {

        var newComment =
        {
            Id: v4(),
            comment: text,
            by: ""
        };

        //make call to api to persist
        var result = await updateCommentForPost(newComment, postId);

        //update comments for UI referesh

        if (result) {
            const updatedComments = [newComment, ...comments]
            setComments(updatedComments);
        }

        // history.goBack();
    }

    useEffect(() => {
        //bug here doesn't work as expected
        //any intermediate page load should not lose page state
        let commentArray = comments;

        getAllCommentsForPost(postid, true).then((res) => {
            res.forEach((item) => {
                commentArray.push(item);
            })
            setComments(commentArray);
        });
    }, [pageRefresh]);

    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar class="ion-text-center">
                    <IonTitle>comments</IonTitle>
                    {post}
                </IonToolbar>
            </IonHeader> */}
            <IonContent>
                <IonCard>
                    <IonTextarea rows={6} cols={20} placeholder="Enter comments here..." value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
                </IonCard>
                <IonToolbar>
                    <IonButtons slot="primary">
                        <IonButton fill="solid" color="light" onClick={e => history.goBack()} >Back</IonButton>
                        <IonButton fill="solid" color="primary" onClick={e => save(e)}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>

                {
                    comments?.map((comment, index) => (
                        <IonItem key={comment.Id}>
                            <div>
                                <div> {comment.comment} </div>
                                <div>by: {comment.by}</div>
                            </div>
                        </IonItem>
                    ))
                }
            </IonContent>
        </IonPage >
    );
};

export default Comments;