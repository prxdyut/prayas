import Head from "next/head";
import TeacherContainer from "../../src/containers/teacher/index";
import { Container } from "@nextui-org/react";
import LoginModal from "../../src/components/needsLoginModal";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container css={{mt: 16}}>
          <TeacherContainer />
          <LoginModal forType='teacher'  />
        </Container>
      </main>
    </>
  );
}
