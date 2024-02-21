import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
