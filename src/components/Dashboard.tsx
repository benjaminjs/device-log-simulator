import {
  Row,
  Col,
  Text,
  Container,
  Grid,
  Button,
  Input,
} from "@nextui-org/react";

import { LogTable } from "./LogTable";
import { useCopyToClipboard } from "usehooks-ts";

const curlCreateLogsCommand = `curl -v -XPOST -H "Content-type: application/json" -d '[{"robot": "flying-pig","deviceGeneration": "1-1","startTime": "2022-11-02T15:41:14.227Z","endTime": "2022-11-02T15:51:14.227Z","lat": 30.2132223412,"lng": -102.123432434}]' 'https://shield-logging.onrender.com/logs'`;

const curlQueryLogsCommand = `curl -XGET 'https://shield-logging.onrender.com/logs?limit=100&from=2022-11-01T01:07:46.116Z&to2022-11-03T03:07:46.116Z&minDuration=10000&deviceGeneration=1-1'`;

export const Dashboard = () => {
  const [value, copy] = useCopyToClipboard();

  return (
    <Container fluid style={{ overflow: "auto" }}>
      <Row gap={1}>
        <Col>
          <Text
            h5
            css={{
              color: "$accents7",
              tt: "uppercase",
              mb: 0,
            }}
          >
            Query Logs
          </Text>
        </Col>
      </Row>
      <Grid.Container gap={2}>
        <Grid xs={11} sm={9}>
          <code
            style={{
              width: "100%",
              overflow: "hidden",
              wordWrap: "break-word",
              height: 40,
              padding: 10,
              paddingLeft: 15,
              lineHeight: "25px",
              fontSize: 15,
            }}
          >
            {curlQueryLogsCommand}
          </code>
        </Grid>

        <Grid xs={1} sm={3} justify="center">
          <Button
            auto
            bordered
            color="gradient"
            style={{ width: "100%" }}
            onPress={() => copy(curlQueryLogsCommand)}
          >
            COPY
          </Button>
        </Grid>
      </Grid.Container>
      <Row gap={1}>
        <Col>
          <Text
            h5
            css={{
              color: "$accents7",
              tt: "uppercase",
              mb: 0,
            }}
          >
            Create Logs
          </Text>
        </Col>
      </Row>
      <Grid.Container gap={2}>
        <Grid xs={11} sm={9}>
          <code
            style={{
              width: "100%",
              overflow: "hidden",
              wordWrap: "break-word",
              height: 40,
              padding: 10,
              paddingLeft: 15,
              lineHeight: "25px",
              fontSize: 15,
            }}
          >
            {curlCreateLogsCommand}
          </code>
        </Grid>

        <Grid xs={1} sm={3} justify="center">
          <Button
            auto
            bordered
            color="gradient"
            style={{ width: "100%" }}
            onPress={() => copy(curlCreateLogsCommand)}
          >
            COPY
          </Button>
        </Grid>
      </Grid.Container>

      <LogTable />
    </Container>
  );
};
