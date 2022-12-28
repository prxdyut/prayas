import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import InitializeFirebase from "../utils/firebase";
InitializeFirebase();
import { Switch, Spacer, Radio, Grid, Button } from "@nextui-org/react";
import { useRouter } from 'next/router'
import Link from 'next/link'
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        size: "invisible",
        badge: "bottomleft",
      },
      defaultCountry: "IN",
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default function SigninWidget() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); 
  }, []);

  return (
    <React.Fragment>
      <div className='firebase_box' style={{display : isSignedIn ? 'none' : 'block' }}>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
      <div style={{display : isSignedIn ? 'block' : 'none', width: '100%' }}>
        <Grid.Container gap={2}>
          <Grid xs justify='center'>
            <Link href='./student'>
            <Button >
              Student
            </Button>
            </Link>
          </Grid>
          <Grid xs justify='center'>
            <Link href='./teacher'>
            <Button >
              Teacher
            </Button></Link>
          </Grid>
          <Grid xs justify='center'>
            <Link href='./admin'>
            <Button >
              Admin
            </Button></Link>
          </Grid>
        </Grid.Container>
        </div>
    </React.Fragment>
  );
}