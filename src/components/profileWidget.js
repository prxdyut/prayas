import {
  Table,
  Text,
  Grid,
  Divider,
  Card,
  Button,
  Popover,
  Row,
  Spacer,
} from "@nextui-org/react";
import React from "react";

export default function ProfileWidget() {
  return (
    <React.Fragment>
      <Popover>
        <Popover.Trigger>
          <div style={{ width: "fit-content" }}>
            <Text h2>hey, Pradyut Das</Text>
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <Card css={{ mw: "330px" }}>
            <Card.Header>
              <Text b>Details</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Row>
                <Text b>Type: &nbsp;</Text>
                <Text>Student</Text>
              </Row>
              <Row>
                <Text b>Name: &nbsp;</Text>
                <Text>Pradyut ProdipKumar Das</Text>
              </Row>
              <Row>
                <Text b>Std.: &nbsp;</Text>
                <Text>10th</Text>
              </Row>
              <Row>
                <Text b>Batch: &nbsp;</Text>
                <Text>Morning</Text>
              </Row>
              <Row>
                <Text b>Phone: &nbsp;</Text>
                <Text>+91 93232 32961</Text>
              </Row>
              <Row>
                <Text b>Email: &nbsp;</Text>
                <Text>daspradyut516@gmail.com</Text>
              </Row>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Button size="sm" light auto>
                  Close
                </Button>
                <Spacer x={0.2} />
                <Button size="sm" auto>
                  Request Edit
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Popover.Content>
      </Popover>
    </React.Fragment>
  );
}
