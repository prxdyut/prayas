import { Table, Text, Input, Spacer } from "@nextui-org/react";
import React from "react";
import { getAuth } from "firebase/auth";

export default function AttendanceWidget({children, data}) {
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
  
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <React.Fragment>
      <Text h4>Attendance History</Text>
{children}

<Spacer y={1} />
      {
data.length != 0 ? (data.find((o) => o.rno == user.rno) ? <Text b h3>Timestamps: {(data.find((o) => o.userId == user.phoneNumber).timestamps).join(', ')}</Text> : <Text h3>Nothing found! </Text>) : false
}
    </React.Fragment>
  );
  }

