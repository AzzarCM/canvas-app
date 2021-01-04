import { types } from "../types/types"
import { facebookAuthProvider, firebase, googleAuthProvider } from "../firebase/firebase-config"

export const startLoginEmailPassword = (email, password)=>{
    return (dispatch) =>{
        setTimeout(() => {
            dispatch(login(123, 'Pedro'));
        }, 3500);
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



export const login = (uid, displayName) =>{
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}