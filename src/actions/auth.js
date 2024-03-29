import { types } from "../types/types"
import { facebookAuthProvider, firebase, googleAuthProvider } from "../firebase/firebase-config"
import { finisLoading, startLoading } from "./ui"
import Swal from 'sweetalert2'
import { emptyCart } from "./cart"

export const startLoginEmailPassword = (email, password)=>{
    return (dispatch) =>{
        
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user})=>{
                console.log(`UID: ${user.uid}`);
                dispatch(
                    login(user.uid, user.displayName)
                );

                dispatch(finisLoading());
            })
            .catch( e =>{
                console.log(e);
                dispatch(finisLoading());
                Swal.fire('Error', e.message, 'error');
            })
    }
}

export const startFacebookLogin = () =>{
    return (dispatch) =>{
        firebase.auth().signInWithPopup( facebookAuthProvider )
            .then(({user, credential}) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e =>{
                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then(({user, credential}) =>{
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e =>{
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })
    }
}

export const startRegisterWithEmailPasswordName = 
(
    email,
    password,
    name
) => {
    return ( dispatch ) =>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({user}) =>{
                await user.updateProfile({displayName: name});
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e =>{
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })
    }
}



export const login = (uid, displayName) =>{
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () =>{
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(emptyCart());
    }
}

export const logout = () =>({
    type: types.logout
})