import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import Link from "next/link";

import { getAuth } from "firebase/auth";

export default function App() {
  return (
    <div>
      <Modal closeButton blur aria-labelledby="modal-title" open={true}>
        <Modal.Body>
          <Text id="modal-title" h4>
            You need to signin to enter this page
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Link href="/">
            <Button auto>Sign in</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
