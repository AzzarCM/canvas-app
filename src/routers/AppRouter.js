import React,{useEffect, useState} from 'react'
import { AuthRouter } from "./AuthRouter"
import firebase from "firebase/app";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import { PrincipalRouter } from './PrincipalRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { fillItems } from '../actions/cart';
import { API_HOST } from '../constants/URLS'
import { useLoading, BallTriangle } from '@agney/react-loading';


export const AppRouter = () => {
    
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { containerProps, indicatorEl } = useLoading({
        loading: checking,
        indicator: <BallTriangle width="50" />,
      });

    const lastPath = localStorage.getItem('lastPath') || '/';
    const dispatch = useDispatch();
    
    useEffect(() => {
        getImages();
    }, []) 
    
    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user)=>{
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                firebase.auth().currentUser.getIdToken(true).then(function(idToken){
                    localStorage.setItem("idToken", idToken);
                })
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    const getImages = async () =>{
        const url = `${API_HOST}/paintings`;
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
                materials: img.materials,
                auxid: img.id,
            }
        })
        dispatch( fillItems(imagenes));
     }

    if(checking){
        return(
            <section style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            }} {...containerProps}>
                {indicatorEl}
            </section>
        )
    }

    return (
       <Router>
           <div>
               <Switch>
                   <Route
                        path="/auth"
                        component={ (props) => (
                            (isLoggedIn) 
                            ? (<Redirect to={lastPath}/>)
                            : (<AuthRouter/>)
                        )}
                   />
                   <Route
                        path="/"
                        component={ PrincipalRouter }
                   />

                   <Redirect to="/"/>
               </Switch>

           </div>
       </Router>
    )
}
