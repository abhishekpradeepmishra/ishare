import React from 'react';
import { useState, useEffect } from "react";
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItemSliding, IonItemOptions, IonItemOption, IonItem, IonLabel
} from '@ionic/react';

import useWebSocket, { ReadyState } from 'react-use-websocket';

// var WebSocketClient = require('websocket').client;
  

// import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
// const { PushNotifications } = Plugins;

interface Notification {
  id: string,
  title: any,
  body: any
}

const Alerts: React.FC = () => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  let ws = new WebSocket('wss://381qa8qge5.execute-api.us-east-2.amazonaws.com/Prod')
  
  // useEffect(() => {
  //       // websocket onopen event listener
  //       ws.onopen = () => {
  //           console.log("connected websocket main component");

  //         // this.setState({ ws: ws });

  //         //   that.timeout = 250; // reset timer to 250 on open of websocket connection 
  //         // // clearTimeout(connectInterval); // clear Interval on on open of websocket connection
          
  //         ws.send("Hello server!");
  //       };
        
  //       ws.onmessage = function(event) {
  //         console.log("WebSocket message received:", event);
  //       };
                
       

  //       // websocket onclose event listener
  //       ws.onclose = e => {
  //           // console.log(
  //           //     `Socket is closed. Reconnect will be attempted in ${Math.min(
  //           //         10000 / 1000,
  //           //         (that.timeout + that.timeout) / 1000
  //           //     )} second.`,
  //           //     e.reason
  //           // );

  //           // that.timeout = that.timeout + that.timeout; //increment retry interval
  //           // connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
  //       };

  //       // websocket onerror event listener
  //       ws.onerror = err => {
  //           // console.error(
  //           //     "Socket encountered error: ",
  //           //     err.message,
  //           //     "Closing socket"
  //           // );

  //           console.log("WebSocket message received:", err);
  //           //ws.close();
  //       };
  //   }, []);
  
  
  ws.onopen = () => {
            console.log("connected websocket main component");

           // this.setState({ ws: ws });

          //   that.timeout = 250; // reset timer to 250 on open of websocket connection 
          // // clearTimeout(connectInterval); // clear Interval on on open of websocket connection
          
           ws.send("Hello server!");
        };
        
        ws.onmessage = function(event) {
          console.log("WebSocket message received:", event);
          
          let message = JSON.parse(event.data);
          
          //"{\"username\":\"u958d6e4fa83c427bb69afa21c12f1db7\",\"action\":\"follow\",\"entitytype\":\"user\",\"entity\":\"u139d26d12b4a4b89aa842c726f0eb673\",\"timestamp\":\"1638514293\"}"
          
          notifications.push({
            id: "kasjhdkasjhdk",
            title: "someone followed u",
            body: "someone followed u",
          })
          
          setNotifications(notifications);
        };
                
       

        // websocket onclose event listener
        ws.onclose = e => {
            // console.log(
            //     `Socket is closed. Reconnect will be attempted in ${Math.min(
            //         10000 / 1000,
            //         (that.timeout + that.timeout) / 1000
            //     )} second.`,
            //     e.reason
            // );

            // that.timeout = that.timeout + that.timeout; //increment retry interval
            // connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            // console.error(
            //     "Socket encountered error: ",
            //     err.message,
            //     "Closing socket"
            // );

            console.log("WebSocket message received:", err);
            //ws.close();
        };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>messages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonList>
          {/* Sliding item with text options on both sides */}
          <IonItemSliding>
            {/* <IonItemOptions side="start">
              <IonItemOption color="primary" onClick={() => console.log('favorite clicked')}>Favorite</IonItemOption>
              <IonItemOption color="danger" onClick={() => console.log('share clicked')}>Share</IonItemOption>
            </IonItemOptions> */}

            <IonItem>
              <div>
                <IonLabel>A new video has been uploaded, you might like it</IonLabel>
                <IonLabel>3 min ago</IonLabel>
              </div>
            </IonItem>

            <IonItemOptions side="end">
              <IonItemOption color="primary" onClick={() => console.log('unread clicked')}>Delete</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem>
              <div>
                <IonLabel>Someone liked your video, click to see who</IonLabel>
                <IonLabel>13 min ago</IonLabel>
              </div>
            </IonItem>

            <IonItemOptions side="end">
              <IonItemOption color="primary" onClick={() => console.log('unread clicked')}>Unread</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          {
            notifications.map((notification, index) => (

              <IonItemSliding>
                <IonItem>
                  <div>
                    <IonLabel>{notification.title}</IonLabel>
                    <IonLabel>{notification.body}</IonLabel>
                    <IonLabel>13 min ago</IonLabel>
                  </div>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption color="primary" onClick={() => console.log('unread clicked')}>Unread</IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
              ))
          }


        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Alerts;
