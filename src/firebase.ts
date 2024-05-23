
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDnWrIDS4bRgP_jbfXQk63Gjghi4Pa7f_w",
  authDomain: "integrify-fullstack-demo.firebaseapp.com",
  projectId: "integrify-fullstack-demo",
  storageBucket: "integrify-fullstack-demo.appspot.com",
  messagingSenderId: "676944013166",
  appId: "1:676944013166:web:3a074412cfec6da557837f",
  measurementId: "G-6KCJHJEPCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
