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

export function fetchUser(userId: string) {
  const getUserById = httpsCallable(functions, "getUserById");
  getUserById({ id: userId }).then((result) => {
    const user: UserType = result.data;
    $user.set(user);
  });
}

export function logOut() {
  return auth.signOut();
}

export default $auth;
