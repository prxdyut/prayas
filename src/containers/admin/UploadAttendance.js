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
import * as xlsx from "xlsx";
import {
  Container,
  Table,
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
  const [data, setData] = useState([]);
  const [date, setDate] = useState();

  const columns = [
    {
      key: "userId",
      label: "PHONE NUMBER",
    },
    {
      key: "timestamps",
      label: "TIMESTAMPS",
    },
  ];

  const add = async () => {
    if (date && _formattedData) {
      await setDoc(doc(db, "attendance-data", date), { _formattedData });
      alert("Added Data ");
      setData([]);
      setDate(null);
    } else {
      !date ? alert("Plz enter date") : null;
    }
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  var dataArray = data;
  var _IDandTimestampDataArray = [];
  var _formattedData = [];

  if (data) {
    dataArray.splice(0, 2);
    for (var i = 0; i < dataArray.length; i++) {
      if ((dataArray[i].__rowNum__ + 1) % 3 == 0) {
        _IDandTimestampDataArray.push(dataArray[i]["List of Logs"]);
      }
      if ((dataArray[i].__rowNum__ + 2) % 3 == 0) {
        _IDandTimestampDataArray.push(dataArray[i].__EMPTY_1);
      }
    }

    for (var i = 0; i < _IDandTimestampDataArray.length; i++) {
      if (i % 2 == 0) {
        _formattedData.push({
          key: i,
          userId: _IDandTimestampDataArray[i],
          timestamps: _IDandTimestampDataArray[i + 1].split("\n"),
        });
      }
    }
  }
  console.log(_formattedData);

  return (
    <>
      <Spacer y={2.5} />
      <Text h1>Upload Attendance</Text>
      <Spacer y={2} />

      <Input
        type="date"
        label="Select Date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <Spacer y={1} />
      <div>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
          style={{ display: "none" }}
        />{data.length != 0 ? (
          <>
            <Table
              aria-label="Example table with dynamic content"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
              </Table.Header>
              <Table.Body items={_formattedData}>
                {(item) => (
                  <Table.Row key={item.key}>
                    {(columnKey) => (
                      <Table.Cell>
                        {typeof item[columnKey] == "string"
                          ? item[columnKey]
                          : item[columnKey].join(", ")}
                      </Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
            <Spacer y={1} />
            <Button
            
              auto
              onClick={add}
              disabled={_formattedData.length == 0 ? true : false}
            >
              Upload
            </Button>{" "}
          </>
        ) : (
          <Button
            auto
            onClick={() => document.getElementById("upload").click()}
          >
            Select File
          </Button>
        )}
        <Spacer y={.2} />
{data.length != 0 && _formattedData.length == 0 ? 'File format is invalid' : false}
      </div>
    </>
  );
}
