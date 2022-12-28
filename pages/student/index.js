import Head from "next/head";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import StudentContainer from "../../src/containers/student/index";
import { Container, Button, Spacer } from "@nextui-org/react";
import LoginContainer from "../../src/containers/login/index";
import InitializeFirebase from "../../src/utils/firebase";
InitializeFirebase();
import { getAuth } from "firebase/auth";
import LoginPage from "../index";
import { useRouter } from "next/router";
import SigninWidget from "../../src/components/signinWidget";
import LoginModal from "../../src/components/needsLoginModal";

export default function Home() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container css={{ mt: 16 }}>
          {isSignedIn ? <StudentContainer /> : <LoginModal />}
          <Spacer y={1} />
          <Button
            color="error"
            auto
            light
            onClick={() => firebase.auth().signOut()}
          >
            Sign-out
          </Button>
          <Spacer y={1} />
        </Container>
      </main>
    </>
  );
}
