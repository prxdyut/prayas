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
import PayWidget from "../../components/payWidget";

export default function Home() {
  const [data, setData] = useState({ pays: [] });
  const [userData, setUserData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gotUser, setGotUser] = useState(false);
  const [input, setInput] = useState({
    unformattedDate: null,
    date: {},
    amount: null,
    via: null,
    for: null,
  });

  const phoneNumberWithCC = "+91" + phoneNumber;

  const fetchPayData = async () => {
    const docRef = doc(db, "pay-data", phoneNumberWithCC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
      setLoading(false);
    } else {
      alert("No Data for User!");
    }
  };

  const fetchUser = async () => {
    const docRef = doc(db, "users", phoneNumberWithCC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
      setLoading(false);
      setGotUser(true);
    } else {
      alert("No User!");
      setGotUser(false);
    }
  };

  const finalData = {
    pays: [...data.pays, input],
  };
  const add = async () => {
    await setDoc(doc(db, "pay-data", phoneNumberWithCC), finalData);
    setInput({
    unformattedDate: null,
    date: {},
    amount: null,
    via: null,
    for: null,
    })
  };
    
  const addNew = async () => {
    await setDoc(doc(db, "fees-data", phoneNumberWithCC), {
    installments: [],
  });
  alert(setTotal)
  };

  return (
    <>
      <Spacer y={2.5} />
      <Text h1>Pay info Loader</Text>
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
              Create
            </Button>
            </>
          }
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <Spacer y={1} />
      {gotUser ? (
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
                {/* <Spacer y={0.5} /> */}
                <Button onClick={fetchPayData}>Load</Button>
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      ) : null}
      <Spacer y={1} />
      {gotUser ? (
        <div>
          <PayWidget data={data} />
        </div>
      ) : null}
      <Spacer y={1} />
      {gotUser ? (
        <Card>
          <Card.Body>
            <Grid.Container gap={2} justify="center">
              <Grid xs>
                <Input
                  type="date"
                  placeholder="Date"
                  value={input.unformattedDate}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      date: Timestamp.fromDate(new Date(e.target.value)),
                      unformattedDate: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid xs>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={input.amount}
                  onChange={(e) =>
                    setInput({ ...input, amount: parseInt(e.target.value, 10) })
                  }
                />
              </Grid>
              <Grid xs>
                <Input
                  type="text"
                  placeholder="Via"
                  value={input.via}
                  onChange={(e) => setInput({ ...input, via: e.target.value })}
                />
              </Grid>
              <Grid xs>
                <Input
                  type="text"
                  placeholder="For"
                  value={input.for}
                  onChange={(e) => setInput({ ...input, for: e.target.value })}
                />
              </Grid>
              <Grid xs={12}>
                <Button onClick={add} disabled={!((input.unformattedDate != null) && (input.amount != null) && (input.via != null) && (input.for != null))}>Add Data</Button>{" "}
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      ) : null}<Spacer y={1} />
    </>
  );
}
