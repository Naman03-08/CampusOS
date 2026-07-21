import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: "AIzaSyAb6FmKQc0ncQG_0HmENX5ZTZI5I6uUdqI",
  authDomain: "campusos01.firebaseapp.com",
  projectId: "campusos01",
  storageBucket: "campusos01.firebasestorage.app",
  messagingSenderId: "635929031441",
  appId: "1:635929031441:web:bf5f51f9ff6ac0460f12b0",
  measurementId: "G-P9HY0FFQ53"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, auth, db, analytics, googleProvider };
