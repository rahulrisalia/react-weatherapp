import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import Weatherapp from "./components/Weatherapp";
function App() {
  return (
    <>
      <Container fluid>
        <Row className="border justify-content-center main-container">
          <Col xs={10} sm={9} md={8} lg={9} className=" border main my-4">
            <Weatherapp />
          </Col>
        </Row>
        <h1>design by rahul</h1>
      </Container>
    </>
  );
}
export default App;
