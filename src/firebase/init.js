// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBviJjwZ90a8Ro9XOd8nTtbTXTPIRcBPA0",
  authDomain: "esp32-fingerprint.firebaseapp.com",
  databaseURL: "https://esp32-fingerprint-default-rtdb.firebaseio.com",
  projectId: "esp32-fingerprint",
  storageBucket: "esp32-fingerprint.appspot.com",
  messagingSenderId: "460865096032",
  appId: "1:460865096032:web:e4541a07af16ddfd69b605",
  measurementId: "G-K7WXMZ01K0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { database }
