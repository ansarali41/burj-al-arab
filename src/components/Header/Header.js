import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import header from '../../images/header.png';
import logo from '../../images/icons/logo.png';
import { UserContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
   // user logOut section
 const logOutHandler = () => {
     firebase.auth().signOut().then(function() {
        const loggedOutUser = {
            email:'',
            name:'',
            isLoggedIn: false
        }
        console.log("Sign-out successful");
        setLoggedInUser (loggedOutUser)
        
      }).catch(function(error) {
        // An error happened.
      });
 }
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})` }} className="header">
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt=""/>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    {
                        loggedInUser.isLoggedIn ? <li>
                            <Link onClick={logOutHandler} to="/login">Logout</Link>
                            </li>:  <li>
                            <Link to="/login">Login</Link>
                            </li> 
                    }
                    
                    <li>
                        <Link className="btn-book" to="/book">Book</Link>
                    </li>
                    <li>
                        <Link to="/home">{loggedInUser.name}</Link>
                    </li>
                </ul>
            </nav>
            <div className="title-container">
                <h1>Burj Al Arab</h1>
                <h2>A global icon of Arabian luxury</h2>
            </div>
        </div>
    );
};

export default Header;