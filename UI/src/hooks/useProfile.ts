import { Auth } from 'aws-amplify'
import { resolve } from 'dns';
import React from 'react';
import { useState, useEffect } from "react";

import { useConfiguration } from "./useConfiguration";
import Axios from "axios";

export interface UserInfo {
    FirstName: string,
    LastName: string,
    Email: string,
    Phone: string,
    Pic: string,
    UserName: string
}

export interface Network{
    followers:string,
    follows:string,
    posts:string
}

//https://www.digitalocean.com/community/tutorials/react-axios-react
//import useConfiguation from './useConfiguration'

export function useProfile() {
    const { API } = useConfiguration();
    
    let userinfo = {
        FirstName: "Not set",
        LastName: "Not set",
        Email: "dummy@dummy.com",
        Phone: "000000000",
        Pic: "https://videorepository-abhmish.s3-ap-southeast-1.amazonaws.com/profilepics/profile.png",
        UserName:"NotSet"
    };

    // const [userprofile, setUserProfile] = useState<UserInfo>(userinfo);
    // useEffect(() => {
    //         Auth.currentUserInfo().then((cognitoUser) => {
    //             setUserProfile({
    //                 FirstName: "Not set",
    //                 LastName: "Not set",
    //                 Email: cognitoUser.email,
    //                 Phone: cognitoUser.phone,
    //                 Pic: "https://videorepository-abhmish.s3-ap-southeast-1.amazonaws.com/profilepics/profile.png"
    //             })
    //         })

    //     }, [userprofile]);

    function getUserInfo() {
        //return userprofile;

        return Auth.currentUserInfo().then((cognitoUser) => {

            if (cognitoUser !== null || cognitoUser === undefined)
            {    
                return {
                    FirstName: "Not set",
                    LastName: "Not set",
                    Email: cognitoUser.attributes.email,
                    UserName: cognitoUser.username,
                    Phone: cognitoUser.attributes.phone_number,
                    Pic: "https://videorepository-abhmish.s3-ap-southeast-1.amazonaws.com/profilepics/profile.png"
                };
            }
        })
    }
    
    
    
    function setFollows(user:string,user2:string){
        
    }


    async function  getUserNetwork(user:string) {
       
            let response = await Axios.get(
              API.recommendationmanagement + "/user/" + user
            ).then((response: any) => {
              return response;
            });
        
            return response?.data;
    }
    
    
    return {
        getUserInfo,setFollows,getUserNetwork
    };
}