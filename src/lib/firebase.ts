import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
const googleProvider = new GoogleAuthProvider();

try {
  // Try importing configuration if provisioned
  // @ts-ignore
  const firebaseConfig = import.meta.glob('../firebase-applet-config.json', { eager: true });
  const configKeys = Object.keys(firebaseConfig);
  
  if (configKeys.length > 0) {
    const config = (firebaseConfig[configKeys[0]] as any).default || firebaseConfig[configKeys[0]];
    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApp();
    }
    auth = getAuth(app);
    db = getFirestore(app, config.firestoreDatabaseId);
    console.log("Firebase initialized successfully with config.");
  } else {
    console.warn("Firebase applet config not found. Running in Local Storage Fallback Mode.");
  }
} catch (e) {
  console.warn("Firebase initialization warning:", e);
}

export { app, auth, db, googleProvider };
