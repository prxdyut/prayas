import { Table, Text, Grid, Divider, Card } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import "firebase/compat/auth";
import { doc, getDoc } from "firebase/firestore";
import InitializeFirebase from "../utils/firebase";
import { getFirestore } from "firebase/firestore";

import { Container, Button } from "@nextui-org/react";
const db = getFirestore(InitializeFirebase());

import { getAuth } from "firebase/auth";

export default function FeeWidget({data}) {
  const columns = [
    {
      key: "date",
      label: "  DATE  ",
    },
    {
      key: "amount",
      label: "  AMOUNT  ",
    },
    {
      key: "via",
      label: "  VIA  ",
    },
    {
      key: "by",
      label: "  BY  ",
    },
  ];

  const modifiedData = [];
  
  if (data) {
    data.installments.map((item, index) => {
      modifiedData.push({ ...item, date: new Date(item.date.seconds * 1000).toUTCString(), key: index });
    });
  }


  return (
    <React.Fragment>
      <Text h4>Fee Payment History</Text>
      <Grid.Container gap={2} justify="center">
        <Grid
          xs="auto"
          css={{
            py: 0,
          }}
        >
          {data.installments.length == 0 ? 
      <Text h5>No Fee Data Available!</Text> : <Table
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
            <Table.Body items={modifiedData}>
              {(item) => (
                <Table.Row key={item.key}>
                  {(columnkey) => <Table.Cell>{item[columnkey]}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>
          </Table>}
          
        </Grid>
        <Grid xs={12} sm={4}>
          <Table
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>
                SUMMARY &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </Table.Column>
              <Table.Column></Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row key="1">
                <Table.Cell>Paid</Table.Cell>
                <Table.Cell>Rs. {
data.installments.reduce((a,v) =>  a = a + v.amount , 0 )}</Table.Cell>
              </Table.Row>
              <Table.Row key="2">
                <Table.Cell>Un Paid</Table.Cell>
                <Table.Cell>Rs. { data.total -
data.installments.reduce((a,v) =>  a = a + v.amount , 0 ) }</Table.Cell>
              </Table.Row>
              <Table.Row key="3">
                <Table.Cell>Total</Table.Cell>
                <Table.Cell>Rs. {data.total}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid>
      </Grid.Container>
    </React.Fragment>
  );
}
