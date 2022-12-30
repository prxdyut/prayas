import React, {useState, useEffect} from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  Timestamp,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import InitializeFirebase from "../utils/firebase";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(InitializeFirebase());

export default function App({forType}) {
  const [userData, setUserData] = useState({type: null});
  const [loading, setLoading] = useState(true);
  
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchUserData = async () => {
    if (user) {
      const docRef = doc(db, "users", user.phoneNumber);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setLoading(false);
      } else {
        alert("No Data for User!");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);
  
  
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [accessDeny, setAccessDeny] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
      
  if(userData.type == forType){
    setAccessDeny(false)
  }else{
    setAccessDeny(true)
  }
  
    return () => unregisterAuthObserver();
  }, []);

  return (
    <div>
      {JSON.stringify(userData.type)}
      <Modal blur aria-labelledby="modal-title" open={accessDeny}>
        <Modal.Body>
          <Text id="modal-title" h4>
            You need to be a {forType} to enter this page
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Link href="/">
            <Button auto>Sign in</Button>
          </Link>
        </Modal.Footer>
      </Modal>
      <Modal blur aria-labelledby="modal-title" open={!isSignedIn}>
        <Modal.Body>
          <Text id="modal-title" h4>
            You need to signin to enter this page
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Link href="/">
            <Button auto>Sign in</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
