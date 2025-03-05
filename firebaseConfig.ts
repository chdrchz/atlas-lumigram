// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnIM7JdxDGb6LeiwzFbOFyAvOsUMAciL0",
  authDomain: "lumigram-ecf59.firebaseapp.com",
  projectId: "lumigram-ecf59",
  storageBucket: "lumigram-ecf59.firebasestorage.app",
  messagingSenderId: "770236813927",
  appId: "1:770236813927:web:c4d23551c300c7afd57ac2",
  measurementId: "G-ZRPQFZ1DFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const storage = getStorage(app);