import Head from "next/head";
import StudentContainer from "../../src/containers/student/index";
import { Container } from "@nextui-org/react";
import * as xlsx from "xlsx";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(undefined);
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  var array = data;
  var data1 = [];
  if (data) {
    array.splice(0, 2);
    for (var i = 0; i < array.length; i++) {
      if (array[i].__rowNum__ % 3 == 0) {
        console.log(" is 3", array[i].__rowNum__);
      } else {
        console.log(" is not 3", array[i]);
        data1.push(array[i]);
      }
    }
  }
  console.log(data1);
  console.log(array);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form>
          <label htmlFor="upload">Upload File</label>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
          />
        </form>
        {JSON.stringify(data)}
        {console.log(data)}
        {/* {console.log(array.join(", "))} */}
      </main>
    </>
  );
}
