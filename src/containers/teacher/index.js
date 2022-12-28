import React, { useState, useEffect } from "react";
import PayWidget from "../../components/payWidget";
import AttendanceWidget from "../../components/attendanceWidget";
import ProfileWidget from "../../components/profileWidget";
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
import { getAuth } from "firebase/auth";
const db = getFirestore(InitializeFirebase());

export default function StudentContainer() {
  const [data, setData] = useState({ pays: [] });
  const [loading, setLoading] = useState(true);
    const auth = getAuth();
  const user = auth.currentUser;

const fetchPayData = async () => {
  if(user){
    const docRef = doc(db, "pay-data", user.phoneNumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
      setLoading(false);
    } else {
      alert("No Data for User!");
    }}
  };

  useEffect(() => {
    fetchPayData();
  }, [user]);
  
  return (
    <React.Fragment>
      <ProfileWidget />
      <Spacer y={1} />
      <PayWidget data={data} />
      <Spacer y={1} />
      <AttendanceWidget />
    </React.Fragment>
  );
}
