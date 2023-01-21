import { useState, useEffect } from "react";
import { amazonSignInButton } from "aws-amplify";

export interface User {
    name: string,
    username: string,
    email: string,
    phonenumber: string,
    token: string
}


//create a singleton class to store signed in user information
class Auth {

    static singletonInstance: Auth;
    _user: User = { name: "", username: "", email: "", phonenumber: "", token: "" };

    static getInstance() {
        if (Auth.singletonInstance === undefined) {
            Auth.singletonInstance = new Auth()
        }

        return this.singletonInstance;
    }

    getUser() {
        return this._user;
    }

    setUser(id: User) {
        this._user = id;
    }
}


export function useAuth() {
    //const [user, setUser] = useState<User>();

    const verifyUser = (username: string, password: string) => {
        //call server api to verify user and mark the user as logged in

        console.log(username, password);

        var userTemp =
        {
            name: "XXXXX XXX",
            username: "xxxx",
            email: "xxx@XXXX.com",
            phonenumber: "00000000",
            token: "kjahjkhio123892jjnasjkdy89172893721oiemahdio721e"
        }

        Auth.getInstance()?.setUser(userTemp);

        //setUser(userTemp);

        return userTemp;
    }

    const getSignedInUser = async () => {
        return Auth.getInstance()?.getUser();
    }

    return {
        verifyUser, getSignedInUser
    }
}

export default useAuth;