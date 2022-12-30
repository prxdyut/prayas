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
  const [feeData, setFeeData] = useState({ installments: [] });
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState({ _formattedData: [] });
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchFeeData = async () => {
    if (user) {
      const docRef = doc(db, "fees-data", user.phoneNumber);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFeeData(docSnap.data());
        setLoading(false);
      } else {
        alert("No Data for User!");
      }
    }
  };

  const fetchAttendanceData = async () => {
    const docRef = doc(db, "attendance-data", date);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAttendanceData(docSnap.data());
      setLoading(false);
    } else {
      alert("No Data available!");
      
      setAttendanceData({ _formattedData: [] });
    }
  };

  useEffect(() => {
    fetchFeeData();
  }, [user]);
  return (
    <React.Fragment>
      <ProfileWidget />
      <Spacer y={1} />
      <FeesWidget data={feeData} />
      <Spacer y={1} />
      <AttendanceWidget data={attendanceData._formattedData}>
        <Input
          width="186px"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          contentRight={
        <Button auto onClick={() => fetchAttendanceData()}>
          Find
        </Button>}
        />
      </AttendanceWidget>
    </React.Fragment>
  );
}
