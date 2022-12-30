import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import InitializeFirebase from "../../utils/firebase";
import { getFirestore } from "firebase/firestore";

import {
  Container,
  Button,
  Input,
  Spacer,
  Card,
  Text,
  Grid,
} from "@nextui-org/react";
const db = getFirestore(InitializeFirebase());
import FeesWidget from "../../components/feeWidget";

export default function Home() {
  const [data, setData] = useState({ installments: [] });
  const [userData, setUserData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gotUser, setGotUser] = useState(false);
  const [input, setInput] = useState({
    rno: null,
    name: null,
    pno: null,
    std: null,
  });

  const phoneNumberWithCC = "+91" + phoneNumber;

  const fetchUser = async () => {
    const docRef = doc(db, "users", phoneNumberWithCC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
      setLoading(false);
      setGotUser(true);

      alert("Got User!");
    } else {
      alert("No User!");
      setGotUser(false);
    }
  };

  const add = async () => {
    await setDoc(doc(db, "users", phoneNumberWithCC), userData);
    setUserData({});

    alert("Updated Data Successfully");
  };

  const addNew = async () => {
    let setname = prompt("Please Enter the Name For New User");
    let setpno = prompt("Please Enter the Phone Number For New User");
    let setrno = prompt("Please Enter the Roll Number For New User");
    let setstd = prompt("Please Enter the Standard For New User");
    await setDoc(doc(db, "users", "+91" + setpno), {
      name: setname,
      rno: parseInt(setrno, 10),
      pno: setpno,
      std: setstd,
    });
    alert(
      "Created a new user with Data \n Name:" +
        setname +
        ", Roll no.:" +
        setrno +
        ", Phone no.:" +
        setpno +
        ", Standard:" +
        setstd
    );
  };
  // const =
  return (
    <>
      <Spacer y={2.5} />
      <Text h1>Manage Accounts</Text>
      <Spacer y={2} />
      <div>
        <Input
          type="tel"
          labelPlaceholder="Registered Mobile Number"
          css={{ minWidth: 320 }}
          contentRight={
            <>
              <Button auto onClick={() => fetchUser()}>
                Search
              </Button>
              <Spacer x={0.5} />
              <Button auto onClick={() => addNew()}>
                Create New
              </Button>
            </>
          }
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <Spacer y={1} />
      {/* {gotUser ? (
        <Card>
          <Card.Body>
            <Grid.Container gap={2} justify="center">
              <Grid xs>
                <Text b>Type: </Text>
                <Text>{userData.type}</Text>
              </Grid>
              <Grid xs>
                <Text b>Name: </Text>
                <Text>{userData.name}</Text>
              </Grid>
              <Grid xs={12}>
                <Button onClick={fetchFeeData}>Load</Button>
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      ) : null} */}
      <Spacer y={1} />
      {gotUser ? (
        <Card>
          <Card.Body>
            <Grid.Container gap={2} justify="center">
              <Grid xs={16}>
                <Input
                  type="number"
                  placeholder="Roll No:."
                  label="Roll No:."
                  value={userData.rno}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      rno: parseInt(e.target.value, 10),
                    })
                  }
                />
              </Grid>
              <Grid xs={16}>
                <Input
                  type="text"
                  placeholder="Name"
                  label="Name:"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </Grid>
              <Grid xs={16}>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  label="Phone Number:"
                  value={userData.pno}
                  onChange={(e) =>
                    setUserData({ ...userData, pno: e.target.value })
                  }
                />
              </Grid>
              <Grid xs={16}>
                <Input
                  type="number"
                  placeholder="Std:."
                  label="Std:."
                  value={userData.std}
                  onChange={(e) =>
                    setUserData({ ...userData, std: e.target.value })
                  }
                />
              </Grid>
              <Grid xs={12}>
                <Button onClick={add}>Update Data</Button>{" "}
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      ) : null}
      <Spacer y={1} />
    </>
  );
}
