import React from "react";
import { db } from "../firebase";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class SavedList extends React.Component {
  constructor(props) {
    super(props);
    const commonOptions = {
      fill: true,
      lineTension: 0.3,
      backgroundColor: "rgba(225, 204,230, .3)",
      borderColor: "rgb(205, 130, 158)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    };
    this.state = {
      deviceData: [],
      dataLine1: {
        labels: [],
        datasets: [
          {
            label: "ioT temp",
            ...commonOptions,
            data: [],
          },
        ],
      },
      dataLine2: {
        labels: [],
        datasets: [
          {
            label: "ioT battery",
            ...commonOptions,
            data: [],
          },
        ],
      },
    };
  }

  componentDidMount() {
    db.collection("ioTDevice").onSnapshot((snapshot) => {
      if (snapshot.size) {
        db.collection("ioTDevice")
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());
            console.log("data", data);
            console.log(data);
            this.setState({ deviceData: data });
            const batteryData = data.map((device, i) => device.battery);
            const time = data.map((device, i) =>
              // battery: device.temperature,
              moment(device.date).format("LLL")
            );
            const temperatureData = data.map(
              (device, i) =>
                // battery: device.temperature,
                device.temperature
            );
            console.log("batteryData", batteryData);
            this.setState({
              dataLine1: {
                ...this.state.dataLine1,
                labels: time,
                datasets: [
                  {
                    ...this.state.dataLine1.datasets[0],
                    data: temperatureData,
                  },
                ],
              },
              dataLine2: {
                ...this.state.dataLine2,
                labels: time,
                datasets: [
                  { ...this.state.dataLine2.datasets[0], data: batteryData },
                ],
              },
            });
          });
      } else {
        console.log("nothing");
      }
    });
  }

  render() {
    const { deviceData, dataLine1, dataLine2 } = this.state;
    return (
      <Container>
        <Row className="show-grid">
          <Col md={2}></Col>
          <Col md={6}>
            <h5> ioT device data </h5>
            <Table striped bordered hover variant="dark" r>
              <thead>
                <tr>
                  <th>#</th>
                  <th> Time </th>
                  <th>Device Temperature</th>
                  <th>Device Battery</th>
                </tr>
              </thead>
              {deviceData.map((device, i) => (
                <tr>
                  <td>{i}</td>
                  <td>{moment(device.date).format("LLL")}</td>
                  <td>{device.temperature} F</td>
                  <td>{device.battery} %</td>
                </tr>
              ))}
            </Table>
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
          <Col>
            <MDBContainer>
              <h3 className="mt-5">Temperature Chart</h3>
              <Line
                data={this.state.dataLine1}
                options={{ responsive: true }}
              />
            </MDBContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <MDBContainer>
              <h3 className="mt-5">Battery Chart</h3>
              <Line
                data={this.state.dataLine2}
                options={{ responsive: true }}
              />
            </MDBContainer>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedList;
