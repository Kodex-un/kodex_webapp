import { atom } from "nanostores";
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "@utils/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { SettingsType, TokenType, UserType } from "@types";
const functions = getFunctions();

const auth: Auth = getAuth(app);
export const $auth = atom<User | null>(null);
export const $user = atom<UserType | null>(null);
export const $token = atom<TokenType | null>(null);
onAuthStateChanged(auth, (user) => {
  $auth.set(user);
});

export function saveTokenSettings(
  tokenId: string,
  settings: { [key: string]: SettingsType },
) {
  console.log("saveTokenSettings_saveTokenSettings:20", tokenId, settings);
  const setTokenSettings = httpsCallable(functions, "setTokenSettings");
  return setTokenSettings({ tokenId, settings }).then((response) => {
    console.log("saveTokenSettings_:22", response);
    $token.set(response.data as TokenType);
  });
}

export function fetchUser(userId: string) {
  const getUserById = httpsCallable(functions, "getUserById");
  const getUserToken = httpsCallable(functions, "getUserToken");
  getUserById({ id: userId })
    .then(async (result) => {
      const user = result.data as UserType;

      // TODO:Marov - the amount of tokens might be vary
      if (user && Array.isArray(user.tokens) && user.tokens[0]) {
        const tokenData = await getUserToken({ tokenId: user.tokens[0] });

        if (tokenData) {
          $token.set(tokenData.data as TokenType);
        }
      }
      $user.set(user);
    })
    .catch((error) => console.log("fetchUser_:45", error));
}

export function logOut() {
  return auth.signOut();
}

export default $auth;
