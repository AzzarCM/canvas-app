import { types } from "../types/types"
import { facebookAuthProvider, firebase, googleAuthProvider } from "../firebase/firebase-config"
import { finisLoading, startLoading } from "./ui"
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password)=>{
    return (dispatch) =>{
        
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user})=>{
                console.log(`(no esta el idToken en esta opcion) UID: ${user.uid}`);
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
            .then(userCred => {
                console.log(userCred);
            })
    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then(({user, credential}) =>{
                console.log(`UID: ${user.uid} idToken: ${credential.idToken}`);
                dispatch(
                    login(user.uid, user.displayName)
                )
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
                console.log(`(no esta el idToken en esta opcion) UID: ${user.uid}`);
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
        dispatch(logout())
    }
}

export const logout = () =>({
    type: types.logout
})