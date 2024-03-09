// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// import { getStorage, connectStorageEmulator } from "firebase/storage";
import { firebaseConfig } from "../firebaseAPI.ts";

const app = initializeApp(firebaseConfig);

const host = "127.0.0.1";
export const functions = getFunctions(getApp());
export const auth = getAuth();
export const db = getFirestore();

// const storage = getStorage();
if (location.hostname === "localhost") {
  connectFunctionsEmulator(functions, host, 5001);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, host, 8080);
  // connectStorageEmulator(storage, host, 9199);
}

export const analytics = getAnalytics(app);

export default app;
