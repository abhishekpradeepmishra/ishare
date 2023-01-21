import { useState, useEffect, useReducer } from "react";
import { useConfiguration } from "./useConfiguration";
import Axios from "axios";
import { useAuth, User } from "../hooks/useAuth";
import { UserInfo, useProfile } from "../hooks/useProfile";
import Amplify, { Auth } from "aws-amplify";

export interface Post {
  // url: string,
  // title: string,
  // likes: string,
  // postDislikes: string,
  // author: string,
  id: string;
  // isVideo: boolean,
  // thumbnail: string
}

// export interface NewPost {
//   postText: string,
//   postImage: string
// }

export interface PostDetails {
  url: string;
  title: string;
  likes: string;
  // postDislikes: string,
  author: string;
  id: string;
  isVideo: boolean;
  thumbnail: string;
  isLikedbyCurrentUser: string;
}

export interface PostAPIResponse {
  mediaLoc: string;
  desc: string;
  created: {
    user_id: string;
    pref_name: string;
    prof_pic: string;
    dt: string;
  };
}

export interface PostComment {
  Id: string;
  comment: string;
  by: string;
}

export interface PostLike {
  Id: string;
  by: string;
}

export interface APIResponse {
  body: any;
  statusCode: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  //const [postComments, setpostComments] = useState<postComment[]>([]);
  const { getSignedInUser } = useAuth();
  const { API } = useConfiguration();
  const { getUserInfo } = useProfile();
  
  
    // })


  const getPosts = async () => {
    
      
  let currentUser = await getUserInfo();
  
    // const posts = await Axios.get(API.postmanagement + "/posts").then((response) => {
    //     console.log(response);
    //     return response.data;

    //pass userid parameter to filters post from backend
    let response = await Axios.get(
      API.recommendationmanagement +
        "/posts/" +
        currentUser?.UserName +
        "/follows"
    ).then((response: any) => {
      return response;
    });

    let posts = response.data as any[];
    let posts1 = [] as Post[];

    posts.forEach((post: any) => {
      posts1.push({
        id: post,
      });
    });

    return posts1;
  };

  const getPostsDetails = async (postid: string) => {
    
    
  let currentUser = await getUserInfo();
  
    try {
      let postDetails = await Axios.get(
        API.core + "/post/post?post_id=" + postid
      ).then((response: any) => {
        var post = response.data as PostAPIResponse;
        return {
          url: post.mediaLoc,
          title: post.desc,
          likes: "random",
          author: post.created.user_id,
          id: postid,
          isVideo: false,
          thumbnail: "",
          isLikedbyCurrentUser: "0"
        };
      });

      postDetails = await Axios.get(
        API.core + "/post/likes?post_id=" + postid
      ).then((response: any) => {
        postDetails.likes = response.data.total_likes;
        return postDetails;
      });
      
      postDetails = await Axios.get(
        API.core + "/post/userLiked?post_id=" + postid + "&user_id=" + currentUser?.UserName
      ).then((response: any) => {
        postDetails.isLikedbyCurrentUser = response.data.liked.toString()
        return postDetails;
      });

    
      //alert(postDetails.url);

      return postDetails;
    } catch (e) {
      console.log(e);
    }
  };

  const getPostsByUserId = async (userid: string) => {
    //pass userid parameter to filters post from backend
    let response = await Axios.get(
      API.recommendationmanagement + "/posts/" + userid
    ).then((response: any) => {
      return response;
    });

    let posts = response.data as any[];
    let posts1 = [] as Post[];

    posts.forEach((post: any) => {
      posts1.push({
        id: post,
      });
    });

    return posts1;
  };

  const getPostsBySearchKey = async (searchkey: string) => {
    //make call to search api here

    const posts = await Axios.get(API + "/posts").then((response) => {
      console.log(response);

      return response.data;
    });

    return posts;
  };

  //for all subsequent calls the UI will invoke this function
  //Make an API call here to get data from server
  //todo: add authentication to call server
  //todo: parse api call and transform in a format supported by UI
  const getNewPosts = async () => {
    const updatedposts = [
      {
        url: "http://commondatastorage.googleapis.com/gtv-posts-bucket/sample/BigBuckBunny.mp4",
        title: "Big Buck Bunny",
        likes: "200",
        // postDislikes: "11",
        author: "By Blender Foundation",
        id: "105",
        thumbnail: "Big Buck Bunny",
        isVideo: false,
      },
      ...posts,
    ];

    setPosts(updatedposts);
  };

  const updateLikeStatusForPost = async (postId: string) => {
    //write code to update likes count for post
    const user = await Auth.currentAuthenticatedUser();

    if (user !== undefined) {
      // var postUrl = `${API}/posts/${postId}/likes`;
      
      //https://coycrts589.execute-api.us-east-2.amazonaws.com/prod/post/like
      var postUrl = API.core + "/post/like"; 
      var msg = {
        post_id: postId,
        user_id: user?.username,
        action:1
      };

      //alert(JSON.stringify(msg));
      
      
      try
      {

      var result = await Axios.post(postUrl, JSON.stringify(msg))

      // .then(
      //   (response) => {
      //     console.log(response);
      //     return true;
      //   },
      //   (error) => {
      //     console.log("here");
      //     console.log(error);
      //     return false;
      //   }
      // );

      alert(JSON.stringify(result))
      return result;
      }
      catch(ex){
        alert(ex);
        return ex;
      }
    }
  };

  const updateCommentForPost = async (comment: PostComment, postId: string) => {
    //check if the user is authenticated
    //write code to update Comment for post
    //const user = await getSignedInUser();

    alert(JSON.stringify(comment));

    const user = await Auth.currentAuthenticatedUser();

    if (user !== undefined) {
      comment.by = user?.username;
      console.log(JSON.stringify(comment));

      var postUrl = `${API}/posts/${postId}/comments`;
      console.log(postUrl);

      var result = await Axios.post(postUrl,
        JSON.stringify({
          data: comment,
        })
      )
      
      // .then(
      //   (response) => {
      //     console.log(response);
      //     return true;
      //   },
      //   (error) => {
      //     console.log(error);
      //     return false;
      //   }
      // );

      alert(result);
      return result;
    }

    //make a call to save this
    //user this comments to do sentimental analysis of
  };
  
  
  const saveNewPost = async(postText:any,postImage:any) => {

    const user = await Auth.currentAuthenticatedUser();

    if (user !== undefined) {
      
      var postUrl = API.core + "/post/create"; 
      var msg = {
      "user_id": user?.username,
      "text": postText,
      "tags": ["random"],
      "mediaBase64encodedStr": ("data:image/png;base64," + postImage)
      }
      
      // alert(JSON.stringify(msg));
      
      try
      {
        var result = await Axios.post(postUrl, JSON.stringify(msg))
        return result;
      }
      catch(ex){
        //alert(ex);
        return ex;
      }
    }
  }

  const getAllCommentsForPost = async (postId: string, reload: true) => {
    //write code to get comments for a post
    return [
      {
        Id: "c-101",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        by: "user101",
      },
      {
        Id: "c-102",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        by: "user102",
      },
    ];

    // const user = await Auth.currentAuthenticatedUser();

    // if (user !== undefined) {

    //     var postUrl = `${API}/posts/${postId}/comments`;
    //     console.log(postUrl);

    //     var result = await Axios.post(postUrl, {}).then((response) => {
    //         console.log(response);
    //         return true;
    //     }, (error) => {
    //         console.log(error);
    //         return false;
    //     });

    //     return result;
    // }
  };

  return {
    saveNewPost,
    getNewPosts,
    getPosts,
    posts,
    getPostsByUserId,
    getPostsBySearchKey,
    updateLikeStatusForPost,
    updateCommentForPost,
    getAllCommentsForPost,
    getPostsDetails,
  };
}
