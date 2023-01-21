import { withAuthenticator } from '@aws-amplify/ui-react'
import Amplify, { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';
import { useConfiguration } from './hooks/useConfiguration'
import {
  IonApp,
  IonBackButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  images, camera, square, home, pin, wifi, wine, warning, walk,
  cameraOutline, homeOutline,
  share,
  person,
  shareOutline,
  people,
  personOutline,
  peopleOutline,
  alarmOutline,
  alertCircleOutline,
  settingsOutline,
  notificationsOutline,
  gitNetworkOutline,
  optionsOutline,
  searchCircle,
  searchCircleOutline,
  searchOutline,
  pulseOutline,
  addOutline
} from 'ionicons/icons';

import Home from './pages/Home';
import Alerts from './pages/Alerts';
import UserProfile from './pages/Settings';
import Comments from './pages/Comments';
import Network from './pages/Network';
import Login from './pages/Login';
import Search from './pages/Search';
import Settings from './pages/Settings';
import UserInfo from './pages/User';
import { useAuth } from './hooks/useAuth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './theme/custom.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';
import AddPost from './pages/AddPost';


Amplify.configure({
  Auth: {
    region: useConfiguration().AWSRegion,
    userPoolId: useConfiguration().Auth.userPoolId,
    userPoolWebClientId: useConfiguration().Auth.userPoolWebClientId,
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  }
});

// You can get the current config object
const currentConfig = Auth.configure();

const App: React.FC = () => {

  // const [user, setUser] = useState<User>();
  const { verifyUser, getSignedInUser } = useAuth();

  // if (user === undefined) {
  //   return <Login setUser={setUser} />;
  // }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs className="ion-tab-custom">
          <IonRouterOutlet>
            <Route path="/home" component={Home} />
            {/* <Route path="/login" component={Login} exact={true} /> */}
            <Route path="/UserProfile" component={UserProfile} />
            <Route path="/addpost" component={AddPost} />
            <Route path="/Alerts" component={Alerts} />
            <Route path="/Search" component={Search} />
            <Route path="/settings" component={Settings} />
            <Route path="/user/userdetails/:user" component={UserInfo} />
            <Route path="/posts/:postid/comments" component={Comments} />
            <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Home" href="/Home">
              <IonIcon icon={homeOutline} />
            </IonTabButton>
            <IonTabButton tab="Search" href="/Search">
              <IonIcon icon={searchOutline}></IonIcon>
            </IonTabButton>
            <IonTabButton tab="AddPost" href="/addpost">
              <IonIcon icon={addOutline}></IonIcon>
            </IonTabButton>
            <IonTabButton tab="Settings" href="/settings">
              <IonIcon icon={settingsOutline}></IonIcon>
            </IonTabButton>
            <IonTabButton tab="Alerts" href="/Alerts">
              <IonIcon icon={notificationsOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default withAuthenticator(App);
// export default App;
