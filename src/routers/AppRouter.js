import React,{useEffect, useState} from 'react'
import { AuthRouter } from "./AuthRouter"
import firebase from "firebase/app";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { PrincipalRouter } from './PrincipalRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from "./PublicRoute"
import {getAllPaintings} from '../helpers/loadPaintings'
import { fillItems } from '../actions/cart';


export const AppRouter = () => {

    const dispatch = useDispatch();
    
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [paintings, setPaintings] = useState([]);


    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user)=>{
            if(user?.uid){
                getImages();
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
        setPaintings(imagenes);
        dispatch( fillItems(paintings));
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
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter }
                   />
                   <PrivateRoute
                        
                        path="/"
                        isAuthenticated={isLoggedIn}
                        component={ PrincipalRouter }
                   />

                   <Redirect to="/auth/login"/>
               </Switch>

           </div>
       </Router>
    )
}
