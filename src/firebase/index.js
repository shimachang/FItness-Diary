import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";
import { firebaseConfig } from "./config";
import { GoogleAuthProvider } from "firebase/auth";

firebase.initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
            console.log(res.user);
        })
        .catch((error) => {
            console.log(error.message);
        });
};

export const logOut = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("logged out");
            document.location.reload();
        });
};
// export const getDocs = firebase.firestore.getDoc();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const firebaseTimeStamp = firebase.firestore.FieldValue.serverTimestamp();
