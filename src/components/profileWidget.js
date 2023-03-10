import React, { useState, useEffect } from "react";
import "firebase/compat/auth";
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
import InitializeFirebase from "../utils/firebase";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";

import {
  Table,
  Loading,
  Text,
  Grid,
  Divider,
  Button,
  Popover,
  Row,
  Container,
  Input,
  Spacer,
  Card,
} from "@nextui-org/react";

const db = getFirestore(InitializeFirebase());

import { getAuth } from "firebase/auth";

export default function ProfileWidget() {
  const [userData, setUserData] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState({ _formattedData: [] });
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

if(!userData){
  
  return (
    <React.Fragment>
      <Card variant="bordered" css={{ width: "100%", p: 16 }}>
<Loading type="points-opacity"  />
      </Card>
    </React.Fragment>
  );
}

  return (
    <React.Fragment>
      <Card variant="bordered" css={{ width: "100%", p: 16 }}>
        <Card.Header>
          <Text h1>hey, {userData.name}</Text>
        </Card.Header>
        <Card.Body css={{ py: "$10" }}>
          <Row>
            <Text b>Type: &nbsp;</Text>
            <Text>{userData.type}</Text>
          </Row>
          <Row>
            <Text b>Name: &nbsp;</Text>
            <Text>{userData.name}</Text>
          </Row>
          <Row>
            <Text b>Std.: &nbsp;</Text>
            <Text>{userData.std}</Text>
          </Row>
          <Row>
            <Text b>Roll No.: &nbsp;</Text>
            <Text>{userData.rno}</Text>
          </Row>
          <Row>
            <Text b>Admission Date.: &nbsp;</Text>
            <Text>{userData.addDate}</Text>
          </Row>
          <Row>
            <Text b>Phone: &nbsp;</Text>
            <Text>+91 {userData.pno}</Text>
          </Row>
          <Row>
            <Text b>Email: &nbsp;</Text>
            <Text>{userData.email}</Text>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button
            size="sm"
            color="error"
            auto
            flat
            onClick={() => firebase.auth().signOut()}
            css={{ position: "fixed", top: "16px", right: "16px" }}
          >
            Sign-out
          </Button>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}
