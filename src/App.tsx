import { Devices } from "./components/DeviceGrid";
import { Container, Grid } from "@nextui-org/react";
import { Dashboard } from "./components/Dashboard";

const App = () => (
  <Container fluid gap={0} style={{ width: "100%" }}>
    <Grid.Container gap={0}>
      <Grid xs={12} sm={5} md={4}>
        <Devices />
      </Grid>
      <Grid xs={12} sm={7} md={8} style={{ maxHeight: "100vh" }}>
        <Dashboard />
      </Grid>
    </Grid.Container>
  </Container>
);

export default App;
