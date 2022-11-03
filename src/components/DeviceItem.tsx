import { DeviceStore, Device } from "../states/devices";
import { Row, Col, Tooltip, Text, Grid, Card } from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { DeleteIcon } from "./DeleteIcon";
import { useInterval } from "usehooks-ts";
import { LogStore } from "../states/logs";

export const DeviceItem = ({ device }: { device: Device }) => {
  const removeDevice = DeviceStore((store) => store.removeDevice);
  const sendLogs = LogStore((store) => store.sendLogs);

  useInterval(() => {
    sendLogs(device);
  }, 200);

  return (
    <Row key={device.robot} css={{ mb: 10 }}>
      <Card>
        <Card.Body css={{ py: 12, pl: 20 }}>
          <Grid.Container gap={0}>
            <Grid xs={11}>
              <Col>
                <Row>
                  <Text b size={14} css={{ tt: "capitalize" }}>
                    {device.robot}
                  </Text>
                  <Text
                    b
                    size={14}
                    css={{ tt: "capitalize", color: "$accents7", ml: 5 }}
                  >
                    {device.deviceGeneration}
                  </Text>
                </Row>
                <Row>
                  <Text
                    b
                    size={14}
                    css={{ tt: "capitalize", color: "$pink500" }}
                  >
                    logs sent: {device.logCount}
                  </Text>
                </Row>
              </Col>
            </Grid>
            <Grid xs={1}>
              <Col css={{ d: "flex", alignItems: "right" }}>
                <Tooltip
                  content="Delete Device"
                  color="error"
                  onClick={() => removeDevice(device.robot)}
                >
                  <IconButton css={{ float: "right" }}>
                    <DeleteIcon size={20} fill="#F4256D" />
                  </IconButton>
                </Tooltip>
              </Col>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Row>
  );
};
