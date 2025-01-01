import { initializeApp } from "firebase/app";
import {
     createUserWithEmailAndPassword,
     getAuth,
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import {
     addDoc,
     collection,
     getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDC-jrqHyJQ8m6ULstBGKouU4K-cJO7Kow",
  authDomain: "netflix-clone-42ecb.firebaseapp.com",
  projectId: "netflix-clone-42ecb",
  storageBucket: "netflix-clone-42ecb.firebasestorage.app",
  messagingSenderId: "218612302805",
  appId: "1:218612302805:web:cef2f3ec5c233f5f04b35c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password)=> {
    try{
     const res = await createUserWithEmailAndPassword(auth, email, password);
     const user = res.user;
     await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
     });
    }catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};