import React, { useState, useEffect } from "react";
import FeesWidget from "../../components/feeWidget";
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

const db = getFirestore(InitializeFirebase());

import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

export default function StudentContainer() {
  const [data, setData] = useState({ installments: [] });
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchFeeData = async () => {
    if (user) {
      const docRef = doc(db, "fees-data", user.phoneNumber);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
        setLoading(false);
      } else {
        alert("No Data for User!");
      }
    }
  };

  useEffect(() => {
    fetchFeeData();
  }, [user]);

  return (
    <React.Fragment>
      <ProfileWidget />
      <Spacer y={1} />
      <FeesWidget data={data} />
      <Spacer y={1} />
      <AttendanceWidget />
    </React.Fragment>
  );
}
