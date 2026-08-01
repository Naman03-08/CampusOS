import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, Firestore, setLogLevel } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
import rawFirebaseConfig from '../../firebase-applet-config.json';

export const firebaseConfig = rawFirebaseConfig;

// Silence non-fatal internal debug warnings (e.g. BloomFilterError) from Firestore SDK
try {
  setLogLevel('error');
} catch {
  // Ignore if unsupported
}

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);

if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn("Firebase persistence error:", err);
  });
}

let db: Firestore;
try {
  const dbId = (firebaseConfig as any)?.firestoreDatabaseId;
  db = (dbId && dbId !== '(default)' && dbId !== '') 
    ? getFirestore(app, dbId) 
    : getFirestore(app);
} catch (e) {
  console.warn("Firestore custom database init failed, falling back to default:", e);
  try {
    db = getFirestore(app);
  } catch (err) {
    console.error("Firestore default database init failed:", err);
    db = null as any;
  }
}
const googleProvider = new GoogleAuthProvider();

let analytics: Analytics | null = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, auth, db, analytics, googleProvider };
