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
    unformattedDate: null,
    date: {},
    amount: null,
    via: null,
    by: null,
  });

  const phoneNumberWithCC = "+91" + phoneNumber;

  const fetchFeeData = async () => {
    const docRef = doc(db, "fees-data", phoneNumberWithCC);
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
      
      alert("Got User!");
      fetchFeeData()
    } else {
      alert("No User!");
      setGotUser(false);
    }
  };

  const finalData = {
    installments: [...data.installments, input],
    total: data.total,
  };
  
  const add = async () => {
    await setDoc(doc(db, "fees-data", phoneNumberWithCC), finalData);
  setInput({
    unformattedDate: null,
    date: {},
    amount: null,
    via: null,
    by: null,
  });
  
  alert('Added Data ')
  fetchUser()
  }; 
  
  const addNew = async () => {
    
    let setTotal = prompt('Please Enter the New Total Fees For User', 10000)
    await setDoc(doc(db, "fees-data", phoneNumberWithCC), {
    installments: [],
    total: parseInt(setTotal ,10)
  });
  alert('Created a new datasheet')
  fetchFeeData()
  };
// const = 
  return (
    <>
      <Spacer y={2.5} />
      <Text h1>Fee info Loader</Text>
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
            </Button></>
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
                <Button onClick={fetchFeeData}>Load</Button>
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      ) : null}
      <Spacer y={1} />
      {gotUser ? (
        <div>
          <FeesWidget data={data} />
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
                  labelPlaceholder='Date:'
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
              <Grid xs={16}>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={input.amount}
                  onChange={(e) =>
                    setInput({ ...input, amount: parseInt(e.target.value, 10) })
                  }
                />
              </Grid>
              <Grid xs={16}>
                <Input
                  type="text"
                  placeholder="Via"
                  value={input.via}
                  onChange={(e) => setInput({ ...input, via: e.target.value })}
                />
              </Grid>
              <Grid xs={16}>
                <Input
                  type="text"
                  placeholder="By"
                  value={input.by}
                  onChange={(e) => setInput({ ...input, by: e.target.value })}
                />
              </Grid>

              <Grid xs={12}>
                <Button
                  onClick={add}
                  disabled={
                    !(
                      input.unformattedDate != null &&
                      input.amount != null &&
                      input.via != null &&
                      input.by != null
                    )
                  }
                >
                  Add Data
                </Button>{" "}
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      ) : null}
      <Spacer y={1} />
    </>
  );
}
