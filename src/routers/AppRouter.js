import React,{useEffect, useState} from 'react'
import { AuthRouter } from "./AuthRouter"
import firebase from "firebase/app";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { PrincipalRouter } from './PrincipalRouter';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from "./PublicRoute"
import { fillItems } from '../actions/cart';
import validator from 'validator'

export const AppRouter = () => {
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    
    useEffect(() => {
        getImages();
    }, []) 
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user)=>{
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    const getImages = async () =>{
        const url = "https://canvas-api-rest.herokuapp.com/api/paintings";
        const resp = await fetch(url)
        const {paintings} = await resp.json();
        const imagenes = paintings.map( img =>{
            return {
                id: img.id,
                name: img.name,
                description: img.description,
                stock: img.stock,
                active: img.active,
                measurements: img.measurements,
                price: img.price,
                image_url: img.image_url,
            }
        })
        dispatch( fillItems(imagenes));
     }

    if(checking){
        return(
            <h1>Loading...</h1>
        )
    }

    return (
       <Router>
           <div>
               <Switch>
                   <PublicRoute
                        path="/auth"
                        isAuthenticated= { isLoggedIn }
                        component={ AuthRouter }
                   />
                   <PrivateRoute
                        
                        path="/"
                        isAuthenticated = { isLoggedIn }
                        component={ PrincipalRouter }
                   />

                   <Redirect to="/auth/login"/>
               </Switch>

           </div>
       </Router>
    )
}
