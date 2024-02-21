import { atom } from "nanostores";
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "@utils/firebase";

const auth: Auth = getAuth(app);
const $auth = atom<User | null>(null);
onAuthStateChanged(auth, (user) => {
  $auth.set(user);
});

export default $auth;
