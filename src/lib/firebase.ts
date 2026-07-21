import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
const googleProvider = new GoogleAuthProvider();

// User provided explicit Firebase credentials as fallback
const userProvidedConfig = {
  apiKey: "AIzaSyAb6FmKQc0ncQG_0HmENX5ZTZI5I6uUdqI",
  authDomain: "campusos01.firebaseapp.com",
  projectId: "campusos01",
  storageBucket: "campusos01.firebasestorage.app",
  messagingSenderId: "635929031441",
  appId: "1:635929031441:web:bf5f51f9ff6ac0460f12b0",
  measurementId: "G-P9HY0FFQ53"
};

try {
  // @ts-ignore
  const globConfig = import.meta.glob('../firebase-applet-config.json', { eager: true });
  const configKeys = Object.keys(globConfig);
  let activeConfig: any = null;
  let firestoreDbId: string | undefined = undefined;

  if (configKeys.length > 0) {
    activeConfig = (globConfig[configKeys[0]] as any).default || globConfig[configKeys[0]];
    firestoreDbId = activeConfig.firestoreDatabaseId;
  } else {
    activeConfig = userProvidedConfig;
  }

  if (activeConfig) {
    if (!getApps().length) {
      app = initializeApp(activeConfig);
    } else {
      app = getApp();
    }
    auth = getAuth(app);
    db = firestoreDbId ? getFirestore(app, firestoreDbId) : getFirestore(app);
    console.log("Firebase initialized successfully with project:", activeConfig.projectId);
  }
} catch (e) {
  console.warn("Firebase initialization warning:", e);
}

export { app, auth, db, googleProvider };
