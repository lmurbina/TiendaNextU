
import { auth } from './firebase'

export const doCreateUser = (email, pass) => 
  auth.createUserWithEmailAndPassword(email, pass)

export const doSignIn = (email, pass) =>
  auth.signInWithEmailAndPassword(email, pass)

export const doSignOut = () => auth.signOut()