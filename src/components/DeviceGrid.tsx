import { DeviceStore } from "../states/devices";
import {
  Row,
  Col,
  Tooltip,
  Text,
  Container,
  Grid,
  Card,
} from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { DeviceItem } from "./DeviceItem";
import { logsPerTick, LogStore } from "../states/logs";

export const Devices = () => {
  const deviceIds = DeviceStore((store) => store.deviceIds);
  const devices = DeviceStore((store) => store.devices);
  const addDevice = DeviceStore((store) => store.addDevice);
  const totalLogs = LogStore((store) => store.totalLogs);

  return (
    <Container fluid>
      <Grid.Container gap={2} css={{ px: 30, pb: 0 }}>
        <Grid xs={11}>
          <Col>
            <Row>
              <Text
                h3
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                Devices {deviceIds.length ? `(${deviceIds.length})` : null}
              </Text>
            </Row>
          </Col>
        </Grid>
        <Grid xs={1}>
          <Col css={{ d: "flex", alignItems: "right" }}>
            {deviceIds.length < 15 ? (
              <Tooltip
                content="Add Device"
                color="primary"
                placement="bottom"
                css={{ float: "right" }}
                onClick={() => addDevice()}
              >
                <IconButton>
                  <Text h4>+</Text>
                </IconButton>
              </Tooltip>
            ) : null}
          </Col>
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2}>
        <Grid xs={12} css={{ pt: 0 }}>
          <Container fluid gap={0} style={{ height: 350, overflow: "audo" }}>
            {deviceIds.length > 0 ? (
              deviceIds.map((id) => (
                <DeviceItem key={id} device={devices[id]} />
              ))
            ) : (
              <Row css={{ mb: 10 }}>
                <Card>
                  <Card.Body css={{ py: 12, pl: 20 }}>
                    <Grid.Container gap={0}>
                      <Grid xs={12}>
                        <Col>
                          <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                              No devices found
                            </Text>
                          </Row>
                        </Col>
                      </Grid>
                    </Grid.Container>
                  </Card.Body>
                </Card>
              </Row>
            )}
          </Container>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2} css={{ px: 30, pb: 0 }}>
        <Grid xs={11}>
          <Col>
            <Row>
              <Text
                h3
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                ~{deviceIds.length * logsPerTick * 5} logs per second
              </Text>
            </Row>
            <Row>
              <Text
                h3
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                {totalLogs} logs sent this session
              </Text>
            </Row>
          </Col>
        </Grid>
      </Grid.Container>
    </Container>
  );
};
