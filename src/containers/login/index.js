import React, { useEffect, useState } from "react";
import "firebase/compat/auth";
import SigninWidget from "../../components/signinWidget";
// import CheckSignInState from "../functions/checkSigninState";
import { useRouter } from "next/router";

import { Modal, Button, Text, Input, Row, Checkbox, Spacer } from "@nextui-org/react";
function SignInContainer() {
    const [login, setLogin] = useState(false);
    return (
    <>
     <Modal
     blur
        closeButton
        aria-labelledby="modal-title"
        open={!login}
        css={{m:16}}
      >
        <Modal.Body>
          <Button auto>
            Register
          </Button>
          <Button auto  onClick={() => setLogin(true)}>
            Login
          </Button>
        </Modal.Body>
      </Modal>
    <SigninWidget />
    </>);
}

export default SignInContainer;