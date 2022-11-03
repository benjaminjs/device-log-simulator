import React, { useEffect } from "react";
import { formatDistanceToNow, format } from "date-fns";

import { Col, Grid, Input, Row, Table, Text } from "@nextui-org/react";
import { DeviceLogResponse, LogStore } from "../states/logs";

type ColumnKeys = ["robot", "startTime", "duration"];

export const LogTable = () => {
  const [minDuration, setMinDuration] = React.useState("0");
  const [deviceGeneration, setDeviceGeneration] = React.useState("");
  const lastQueryTime = LogStore((store) => store.lastQueryTime);

  const [fromDate, setFromDate] = React.useState("1990-01-01T00:00");
  const [toDate, setToDate] = React.useState("2023-01-01T00:00");

  const logs = LogStore((store) => store.logs);
  const getRecentLogs = LogStore((store) => store.getRecentLogs);

  useEffect(() => {
    getRecentLogs({
      minDuration,
      deviceGeneration,
      from: fromDate,
      to: toDate,
    });
  }, [minDuration, deviceGeneration, fromDate, toDate]);

  const columns = [
    {
      key: "robot",
      label: "NAME",
    },
    {
      key: "startTime",
      label: "TAKEOFF",
    },
    {
      key: "duration",
      label: "DURATION",
    },
  ];

  const renderCell = (
    key: ColumnKeys[number],
    value: any,
    item: DeviceLogResponse
  ) => {
    switch (key) {
      case "robot":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {value}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {item.deviceGeneration}
              </Text>
            </Row>
          </Col>
        );
      case "startTime":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {format(new Date(value), "MM/dd/yyyy hh:mm a")}
          </Text>
        );
      case "duration":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {value}
          </Text>
        );
      default:
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {value}
          </Text>
        );
    }
  };

  return (
    <>
      <Row gap={1}>
        <Col>
          <Text
            h3
            css={{
              textGradient: "45deg, $blue600 -50%, $pink600 50%",
              mt: 20,
              mb: 0,
            }}
            weight="bold"
          >
            View Logs
          </Text>
        </Col>
      </Row>
      <Grid.Container gap={2}>
        <Grid xs={6} xl={3}>
          <Input
            width="100%"
            value={deviceGeneration}
            onChange={(e) => setDeviceGeneration(e.target.value)}
            labelLeft="Generation"
            aria-label="Device Generation"
            placeholder=""
          />
        </Grid>
        <Grid xs={6} xl={3}>
          <Input
            width="100%"
            value={minDuration}
            onChange={(e) => setMinDuration(e.target.value)}
            labelLeft="Min Duration"
            aria-label="Minimum Duration"
            placeholder="0"
            type="number"
          />
        </Grid>
        <Grid xs={12} lg={6} xl={3}>
          <Input
            width="100%"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            labelLeft="From"
            placeholder=""
            aria-label="From Date"
            type="datetime-local"
          />
        </Grid>
        <Grid xs={12} lg={6} xl={3}>
          <Input
            width="100%"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            labelLeft="To"
            placeholder="0"
            aria-label="To Date"
            type="datetime-local"
          />
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
            First 100 records
          </Text>
        </Col>
      </Row>
      <Row gap={1}>
        <Col>
          <Text
            h5
            css={{
              color: "$accents4",
              mb: 0,
              fs: "0.8rem",
            }}
          >
            {lastQueryTime ? `${formatDistanceToNow(lastQueryTime)} ago` : ""}
          </Text>
        </Col>
      </Row>
      <Row style={{ height: 600, overflow: "auto" }}>
        <Col>
          <Table
            aria-label="Example table with dynamic content"
            compact
            sticked
            style={{
              minWidth: "100%",
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={logs}>
              {(item) => (
                <Table.Row key={item.id}>
                  {(columnKey: string | number) => {
                    // typescript is a pain sometimes.
                    const value = item[columnKey as ColumnKeys[number]];
                    return (
                      <Table.Cell>
                        {renderCell(
                          columnKey as ColumnKeys[number],
                          value,
                          item
                        )}
                      </Table.Cell>
                    );
                  }}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Col>
      </Row>
    </>
  );
};
