import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';


// user logOut section
export const logOutHandler = () => {
    return firebase.auth().signOut().then(function() {
        const loggedOutUser = {
            email:'',
            displayName:'',
            isLoggedIn: false
        }
        console.log("Sign-out successful");
        return (loggedOutUser)
        
      }).catch(function(error) {
        // An error happened.
      });
 }


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }

    const googleSingIn = () => {
        // google signIn
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function (result) {
            const user = result.user;
            const { displayName, email } = user;
            const signedInUser = {
                name: displayName,
                email: email,
                isLoggedIn: true
            }
            setLoggedInUser(signedInUser);
            storeAuthToken();
            
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage); 
        });
    }
    
        // faceBook signIn
        const fbSignIn = () => {
            var fbProvider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(fbProvider).then(function(result) {
                const { displayName, email} = result.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    isLoggedIn: true
                }
                setLoggedInUser(signedInUser);
                storeAuthToken();
                
                
              }).catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
              });
        }
        // auth token
        const storeAuthToken = () => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function(idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            //    console.log(idToken);
              }).catch(function(error) {
                // Handle error
              });
        }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Login Here</h1>
            <Button onClick={googleSingIn} variant="contained" color="primary">
            <FontAwesomeIcon icon={faGoogle} /> Sign in</Button>
            <br/>
            <br/>
            <Button onClick={fbSignIn} variant="contained" color="primary"><FontAwesomeIcon icon={faFacebook} />  Sign in</Button>
        </div>
    );
};

export default Login;