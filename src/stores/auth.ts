import { atom } from "nanostores";
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "@utils/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { UserType } from "@types";
const functions = getFunctions();

const auth: Auth = getAuth(app);
export const $auth = atom<User | null>(null);
export const $user = atom<UserType | null>(null);
onAuthStateChanged(auth, (user) => {
  $auth.set(user);
});

export function fetchUser() {
  const getUserById = httpsCallable(functions, "getUserById");
  getUserById({ id: $auth.value.uid }).then((result) => {
    const user: UserType = result.data;
    console.log("fetchUser_:21", result.data);
    $user.set(user);
  });
}

export function logOut() {
  return auth.signOut();
}

export default $auth;
