// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6ME9_y2UPQabDz0fsQascofqqTPF18So",
  authDomain: "minecraftdata-d68e9.firebaseapp.com",
  databaseURL: "https://minecraftdata-d68e9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "minecraftdata-d68e9",
  storageBucket: "minecraftdata-d68e9.firebasestorage.app",
  messagingSenderId: "569776307884",
  appId: "1:569776307884:web:be7f3865f239cb3a92e909",
  measurementId: "G-WFN7F1Y70L"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);